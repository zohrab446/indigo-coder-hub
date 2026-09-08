import type { Lesson } from "../types";

const HTML_BASE = (body: string) => `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n${body}\n    <script src="script.js"></script>\n  </body>\n</html>`;

const STYLE_CSS = `body {\n  font-family: sans-serif;\n  background: #f8fafc;\n  color: #1e293b;\n  padding: 16px;\n}`;

export const JS_A: Lesson[] = [
  {
    id: "js-71",
    level: 71,
    language: "javascript",
    title: "JavaScript'e ilk adım",
    description: "script.js dosyasını HTML'e bağla ve konsola yaz.",
    explanation:
      "JavaScript kodunu bir HTML sayfasına bağlamak için `<script>` etiketi kullanılır. `src` özelliği hangi dosyanın çalıştırılacağını belirtir.\n`console.log()` fonksiyonu, tarayıcının geliştirici konsoluna metin yazdırır. Kod yazarken en çok kullanacağın araçlardan biri budur.",
    example: `console.log("Merhaba");\nconsole.log(42);`,
    hints: [
      "`</body>` etiketinden önce bir `<script>` etiketi ekle.",
      "Etiketin `src` özelliğine \"script.js\" yaz.",
      `<script src="script.js"></script> ve script.js içine console.log("Hello, CodeQuest!");`,
    ],
    challenge: "index.html'in body sonuna script.js'i bağla ve script.js içinde console.log(\"Hello, CodeQuest!\") çalıştır.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>CodeQuest</h1>\n    <!-- TODO: script.js'i buraya bağla -->\n  </body>\n</html>`,
      },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: console.log ile "Hello, CodeQuest!" yaz` },
    ],
    checks: [
      { type: "regex", file: "index.html", value: "<script[^>]+src=[\"']script\\.js[\"']", label: "script.js HTML'e bağlandı" },
      { type: "output", value: "Hello, CodeQuest!", label: "Konsolda 'Hello, CodeQuest!' yazıyor" },
    ],
  },
  {
    id: "js-72",
    level: 72,
    language: "javascript",
    title: "let ve const",
    description: "Değişken tanımlamayı öğren.",
    explanation:
      "`let` ile değeri sonra değişebilecek bir değişken tanımlarsın. `const` ile tanımlanan değişkenin değeri asla değişmez.\nİkisi de bir kez tanımlanır, ardından kullanılır.",
    example: `let age = 15;\nconst name = "Ali";\nage = 16;\nconsole.log(name, age);`,
    hints: [
      "Bir `let` değişkeni ve bir `const` değişkeni tanımla.",
      "İkisini de console.log ile yazdır.",
      `let score = 10; const title = "Oyuncu"; console.log(title, score);`,
    ],
    challenge: "let score = 10 ve const title = \"Oyuncu\" tanımla, ikisini de console.log ile yazdır.",
    files: [
      HTML_FILE(""),
      STYLE_FILE(),
      { name: "script.js", content: `// TODO: score (let) ve title (const) tanımla, console.log ile yazdır` },
    ],
    checks: [
      { type: "regex", value: "let\\s+score", label: "let score tanımlandı" },
      { type: "regex", value: "const\\s+title", label: "const title tanımlandı" },
      { type: "output", value: "Oyuncu", label: "Çıktıda 'Oyuncu' yazıyor" },
    ],
  },
];
