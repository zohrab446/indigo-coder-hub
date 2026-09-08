import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  Check,
  Lightbulb,
  Minus,
  Moon,
  Play,
  Plus,
  Send,
  Sun,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { LANGUAGE_META, MAX_LEVEL, getLesson } from "@/data/lessons";
import { gradeSubmission, runCode, type CheckResult, type RunResult } from "@/lib/runner";
import { useCompleteLesson, useProfile, useProgress, type CompletionReward } from "@/hooks/useGameData";
import { BADGES } from "@/lib/gamification";
import { celebrate } from "@/lib/celebrate";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings, playSound } from "@/store/settings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/lesson/$level")({
  head: () => ({
    meta: [
      { title: "Ders — CodeQuest" },
      { name: "description", content: "Açıklamayı oku, kodu yaz, çalıştır ve XP kazan." },
      { property: "og:title", content: "Ders — CodeQuest" },
      { property: "og:description", content: "CodeQuest kodlama görevini çöz ve seviye atla." },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { level } = useParams({ from: "/_authenticated/lesson/$level" });
  const navigate = useNavigate();
  const lesson = getLesson(Number(level));
  const { data: profile } = useProfile();
  const { data: progress = [] } = useProgress();
  const completeLesson = useCompleteLesson();
  const settings = useSettings();

  const [code, setCode] = useState(lesson?.starterCode ?? "");
  const [tab, setTab] = useState<"info" | "editor">("info");
  const [openHints, setOpenHints] = useState<number[]>([]);
  const [run, setRun] = useState<RunResult | null>(null);
  const [checks, setChecks] = useState<CheckResult[] | null>(null);
  const [reward, setReward] = useState<CompletionReward | null>(null);
  const [busy, setBusy] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    setCode(lesson?.starterCode ?? "");
    setOpenHints([]);
    setRun(null);
    setChecks(null);
    setReward(null);
    startedAt.current = Date.now();
  }, [lesson?.id, lesson?.starterCode]);

  const meta = lesson ? LANGUAGE_META[lesson.language] : null;
  const nextLevel = lesson ? Math.min(MAX_LEVEL, lesson.level + 1) : 1;
  const locked = useMemo(() => {
    if (!lesson || !profile) return false;
    return !isLessonUnlocked(lesson.level, progress.map((p) => p.level));
  }, [lesson, profile, progress]);

  if (!lesson || !meta) {
    return (
      <AppShell>
        <div className="card-surface mx-auto max-w-md p-6 text-center">
          <h1 className="text-xl">Bu ders bulunamadı</h1>
          <Button asChild className="mt-4 font-bold">
            <Link to="/dashboard">Panoya dön</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell>
        <Skeleton className="h-[60vh] w-full rounded-2xl" />
      </AppShell>
    );
  }

  if (locked) {
    return (
      <AppShell>
        <div className="card-surface mx-auto max-w-md p-6 text-center">
          <h1 className="text-xl">Bu ders henüz kilitli 🔒</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Önce {lesson.level - 1}. seviyeyi tamamla, sonra buraya dön.
          </p>
          <Button asChild className="mt-4 font-bold">
            <Link to="/lesson/$level" params={{ level: String(profile.level) }}>
              Sıradaki derse git
            </Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  async function handleRun() {
    setBusy(true);
    try {
      const result = await runCode(lesson!, code);
      setRun(result);
      setChecks(null);
      if (result.error) playSound("error");
    } catch {
      toast.error("Kod çalıştırılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit() {
    setBusy(true);
    try {
      const { results, passed, run: runResult } = await gradeSubmission(lesson!, code);
      setRun(runResult);
      setChecks(results);
      if (!passed) {
        playSound("error");
        toast.error("Henüz tam olmadı. Testlere bak ve tekrar dene!");
        return;
      }
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      const earned = await completeLesson.mutateAsync({
        lesson: lesson!,
        code,
        seconds,
        profile: profile!,
        progress,
      });
      setReward(earned);
      playSound("success");
      void celebrate();
    } catch {
      toast.error("Gönderilemedi, tekrar dener misin?");
    } finally {
      setBusy(false);
    }
  }

  const infoPanel = (
    <div className="card-surface space-y-5 p-5">
      <div>
        <span
          className="rounded-lg px-2 py-1 text-xs font-bold text-primary-foreground"
          style={{ backgroundColor: `var(--color-${meta.colorVar})` }}
        >
          {meta.label} · Seviye {lesson.level}
        </span>
        <h2 className="mt-3 text-2xl">{lesson.title}</h2>
      </div>

      <section>
        <h3 className="text-base">📝 Açıklama</h3>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {lesson.explanation}
        </p>
      </section>

      <section>
        <h3 className="text-base">💡 Kod örneği</h3>
        <pre className="code-block mt-2 overflow-x-auto text-xs">
          <code>{lesson.example}</code>
        </pre>
      </section>

      <section>
        <h3 className="text-base">✅ Görev</h3>
        <p className="mt-2 rounded-2xl bg-primary-soft p-4 text-sm font-semibold text-primary">
          {lesson.challenge}
        </p>
      </section>

      <section>
        <h3 className="text-base">İpuçları</h3>
        <div className="mt-2 space-y-2">
          {lesson.hints.map((hint, index) => {
            const open = openHints.includes(index);
            return (
              <div key={index}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="font-bold"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenHints((prev) => (open ? prev.filter((i) => i !== index) : [...prev, index]))
                  }
                >
                  <Lightbulb className="mr-1 h-4 w-4" /> İpucu {index + 1}
                </Button>
                {open && (
                  <p className="mt-2 rounded-xl bg-secondary p-3 text-sm text-muted-foreground">{hint}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );

  const editorPanel = (
    <div className="card-surface flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <span className="text-sm font-bold">{meta.label}</span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Yazı tipini küçült"
            onClick={() => settings.setFontSize(Math.max(11, settings.fontSize - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center text-sm font-bold">{settings.fontSize}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Yazı tipini büyült"
            onClick={() => settings.setFontSize(Math.min(24, settings.fontSize + 1))}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Editör temasını değiştir"
            onClick={() => settings.setEditorTheme(settings.editorTheme === "dark" ? "light" : "dark")}
          >
            {settings.editorTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="h-[46vh] min-h-72">
        <Editor
          height="100%"
          language={meta.monaco}
          value={code}
          theme={settings.editorTheme === "dark" ? "vs-dark" : "light"}
          onChange={(value) => setCode(value ?? "")}
          options={{
            fontSize: settings.fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            tabSize: 2,
            automaticLayout: true,
            fontFamily: "JetBrains Mono, monospace",
          }}
          loading={<Skeleton className="h-full w-full" />}
        />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border p-3">
        <Button variant="secondary" className="font-bold" disabled={busy} onClick={() => void handleRun()}>
          <Play className="mr-1 h-4 w-4" /> Kodu çalıştır
        </Button>
        <Button className="font-bold" disabled={busy} onClick={() => void handleSubmit()}>
          <Send className="mr-1 h-4 w-4" /> Gönder
        </Button>
        <Button variant="ghost" className="font-bold" onClick={() => setCode(lesson.starterCode)}>
          Sıfırla
        </Button>
      </div>

      <div className="border-t border-border p-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Çıktı & testler</h3>
        {run?.previewHtml && (
          <iframe
            title="Önizleme"
            sandbox="allow-scripts"
            srcDoc={run.previewHtml}
            className="mt-2 h-48 w-full rounded-xl border border-border bg-white"
          />
        )}
        {run && !run.previewHtml && (
          <pre className="code-block mt-2 max-h-40 overflow-auto text-xs">
            <code>{run.logs.join("\n") || "(çıktı yok)"}</code>
          </pre>
        )}
        {run?.error && (
          <p className="mt-2 rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
            {run.error}
          </p>
        )}
        {checks && (
          <ul className="mt-3 space-y-1.5">
            {checks.map((check) => (
              <li key={check.label} className="flex items-center gap-2 text-sm">
                {check.passed ? (
                  <Check className="h-4 w-4 shrink-0 text-success" />
                ) : (
                  <X className="h-4 w-4 shrink-0 text-destructive" />
                )}
                <span className={check.passed ? "text-success" : "text-destructive"}>{check.label}</span>
              </li>
            ))}
          </ul>
        )}
        {!run && !checks && (
          <p className="mt-2 text-sm text-muted-foreground">
            Kodunu çalıştır veya doğrudan gönder; sonuçlar burada görünecek.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <AppShell>
      <div className="mb-4 flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="font-bold">
          <Link to="/dashboard">
            <ArrowLeft className="mr-1 h-4 w-4" /> Panoya dön
          </Link>
        </Button>
        <span className="text-sm text-muted-foreground">
          Seviye {lesson.level} / {MAX_LEVEL}
        </span>
      </div>

      <div className="mb-4 inline-flex rounded-xl bg-secondary p-1 lg:hidden" role="tablist">
        {(
          [
            { id: "info", label: "Açıklama" },
            { id: "editor", label: "Editör" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-bold",
              tab === item.id ? "bg-card text-primary shadow-card" : "text-muted-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className={cn(tab === "info" ? "block" : "hidden", "lg:block")}>{infoPanel}</div>
        <div className={cn(tab === "editor" ? "block" : "hidden", "lg:block")}>{editorPanel}</div>
      </div>

      {reward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="card-surface pop-in w-full max-w-md p-6 text-center">
            <p className="text-5xl">🎉</p>
            <h2 className="mt-3 text-2xl">Harika iş!</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {lesson.level}. seviyeyi tamamladın{reward.alreadyCompleted ? " (tekrar)" : ""}.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-primary-soft p-4">
                <p className="font-display text-2xl font-extrabold text-primary">+{reward.xp}</p>
                <p className="text-xs font-bold uppercase text-muted-foreground">XP</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <p className="font-display text-2xl font-extrabold text-coin">+{reward.coins}</p>
                <p className="text-xs font-bold uppercase text-muted-foreground">Coin</p>
              </div>
            </div>
            {reward.multiplier > 1 && !reward.alreadyCompleted && (
              <p className="mt-3 text-sm font-bold text-success">🔥 Seri bonusu: 2x XP!</p>
            )}
            {reward.newBadges.length > 0 && (
              <p className="mt-3 text-sm font-bold text-accent">
                Yeni rozet:{" "}
                {reward.newBadges
                  .map((id) => BADGES.find((b) => b.id === id)?.title ?? id)
                  .join(", ")}
              </p>
            )}
            <div className="mt-6 flex flex-col gap-2">
              <Button
                size="lg"
                className="font-bold"
                onClick={() => {
                  setReward(null);
                  navigate({ to: "/lesson/$level", params: { level: String(nextLevel) } });
                }}
              >
                Sıradaki görev →
              </Button>
              <Button variant="ghost" className="font-bold" onClick={() => setReward(null)}>
                Bu derste kal
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
