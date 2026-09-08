import type { Lesson, LessonCheck } from "@/data/lessons";

export type RunResult = {
  logs: string[];
  error: string | null;
  previewHtml: string | null;
};

export type CheckResult = { label: string; passed: boolean };

const DOM_SCAFFOLD = `
  <h1 id="title" class="item">Merhaba</h1>
  <p class="item">CodeQuest</p>
  <div class="box item">Kutu</div>
  <button id="btn">Tıkla</button>
  <ul><li class="item">Bir</li></ul>
`;

const CSS_DEMO = `
  <h1>CodeQuest</h1>
  <p>CSS kurallarını burada canlı görüyorsun.</p>
  <div class="row">
    <div class="card kart hero box">Kart 1</div>
    <div class="card kart banner box">Kart 2</div>
  </div>
`;

function escapeForScript(code: string) {
  return code.replace(/<\/script>/gi, "<\\/script>");
}

/** Kodu izole bir iframe içinde çalıştırır ve console çıktısını toplar. */
export async function runJavaScript(code: string): Promise<RunResult> {
  if (typeof document === "undefined") return { logs: [], error: null, previewHtml: null };

  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";

  const srcdoc = `<!DOCTYPE html><html><body>${DOM_SCAFFOLD}
<script>
  window.__logs = [];
  window.__error = null;
  const fmt = (v) => {
    try {
      if (typeof v === "string") return v;
      return JSON.stringify(v);
    } catch (e) { return String(v); }
  };
  console.log = (...args) => window.__logs.push(args.map(fmt).join(" "));
  console.info = console.log;
  console.warn = console.log;
  console.error = (...args) => window.__logs.push(args.map(fmt).join(" "));
  try {
${escapeForScript(code)}
  } catch (err) {
    window.__error = (err && err.message) ? err.message : String(err);
  }
<\/script></body></html>`;

  return new Promise<RunResult>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      let logs: string[] = [];
      let error: string | null = null;
      try {
        const w = iframe.contentWindow as (Window & { __logs?: string[]; __error?: string | null }) | null;
        logs = w?.__logs ?? [];
        error = w?.__error ?? null;
      } catch {
        error = "Kod çalıştırılamadı.";
      }
      const result = { logs: [...logs], error, previewHtml: null };
      iframe.remove();
      resolve(result);
    };

    iframe.onload = () => window.setTimeout(finish, 30);
    document.body.appendChild(iframe);
    iframe.srcdoc = srcdoc;
    window.setTimeout(finish, 3000);
  });
}

export async function runCode(lesson: Lesson, code: string): Promise<RunResult> {
  if (lesson.language === "javascript") return runJavaScript(code);
  if (lesson.language === "html") {
    return { logs: ["HTML önizlemesi hazır."], error: null, previewHtml: code };
  }
  if (lesson.language === "css") {
    return {
      logs: ["CSS önizlemesi hazır."],
      error: null,
      previewHtml: `<!DOCTYPE html><html><head><style>body{font-family:system-ui;padding:16px}${code}</style></head><body>${CSS_DEMO}</body></html>`,
    };
  }
  return {
    logs: [
      `${lesson.language.toUpperCase()} kodu tarayıcıda derlenmez.`,
      "Kodun yapısı ve gerekli anahtar kelimeler kontrol edilecek. Göndermeye hazırsan “Gönder”e bas.",
    ],
    error: null,
    previewHtml: null,
  };
}

function checkOne(check: LessonCheck, code: string, logs: string[]): boolean {
  if (check.type === "includes") {
    return code.toLowerCase().includes(check.value.toLowerCase());
  }
  if (check.type === "regex") {
    try {
      return new RegExp(check.value, "i").test(code);
    } catch {
      return false;
    }
  }
  return logs.some((line) => line.toLowerCase().includes(check.value.toLowerCase()));
}

export async function gradeSubmission(
  lesson: Lesson,
  code: string,
): Promise<{ results: CheckResult[]; passed: boolean; run: RunResult }> {
  const needsRun = lesson.checks.some((c) => c.type === "output");
  const run = needsRun ? await runJavaScript(code) : await runCode(lesson, code);
  const results = lesson.checks.map((c) => ({ label: c.label, passed: checkOne(c, code, run.logs) }));
  const passed = results.every((r) => r.passed) && !run.error;
  return { results, passed, run };
}
