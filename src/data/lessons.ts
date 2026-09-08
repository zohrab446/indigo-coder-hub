export type LessonLanguage = "html" | "css" | "javascript" | "java" | "python" | "cpp";

export type LessonCheck = {
  /** includes: kod içinde metin ara | regex: desen ara | output: çalıştırma çıktısında ara */
  type: "includes" | "regex" | "output";
  value: string;
  label: string;
};

export type Lesson = {
  id: string;
  level: number;
  language: LessonLanguage;
  title: string;
  description: string;
  explanation: string;
  example: string;
  hints: [string, string, string];
  challenge: string;
  starterCode: string;
  checks: LessonCheck[];
};

export const LANGUAGE_META: Record<
  LessonLanguage,
  { label: string; monaco: string; colorVar: string; runnable: boolean }
> = {
  html: { label: "HTML", monaco: "html", colorVar: "lang-html", runnable: true },
  css: { label: "CSS", monaco: "css", colorVar: "lang-css", runnable: true },
  javascript: { label: "JavaScript", monaco: "javascript", colorVar: "lang-js", runnable: true },
  java: { label: "Java", monaco: "java", colorVar: "lang-java", runnable: false },
  python: { label: "Python", monaco: "python", colorVar: "lang-python", runnable: false },
  cpp: { label: "C++", monaco: "cpp", colorVar: "lang-cpp", runnable: false },
};

export const CATEGORIES: { title: string; from: number; to: number; language: LessonLanguage }[] = [
  { title: "HTML Temelleri", from: 1, to: 5, language: "html" },
  { title: "CSS ve Stil", from: 6, to: 10, language: "css" },
  { title: "JavaScript Temelleri", from: 11, to: 15, language: "javascript" },
  { title: "JavaScript İleri Seviye", from: 16, to: 20, language: "javascript" },
  { title: "Java Temelleri", from: 21, to: 25, language: "java" },
  { title: "Python Temelleri", from: 26, to: 30, language: "python" },
  { title: "C++ Temelleri", from: 31, to: 35, language: "cpp" },
];

export const LESSONS: Lesson[] = [
  {
    id: "html-1",
    level: 1,
    language: "html",
    title: "Merhabalar, HTML!",
    description: "Bir web sayfasının iskeletini kur.",
    explanation:
      "HTML (HyperText Markup Language) web sayfalarının iskeletini oluşturur. Her sayfa <!DOCTYPE html> ile başlar, <html> etiketiyle sarılır; <head> içinde sayfa bilgileri, <body> içinde ise ekranda görünen her şey bulunur.",
    example: `<!DOCTYPE html>
<html lang="tr">
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello!</h1>
  </body>
</html>`,
    hints: [
      "Sayfa her zaman <!DOCTYPE html> satırıyla başlar.",
      "<title> etiketi <head> içinde durur ve sekmede görünür.",
      "<h1> en büyük başlıktır ve <body> içinde yazılır.",
    ],
    challenge:
      'Başlığı (title) "Benim İlk Sayfam" olan ve body içinde <h1> ile "Merhaba Dünya!" yazan bir HTML sayfası yaz.',
    starterCode: `<!DOCTYPE html>
<html lang="tr">
  <head>
    <title></title>
  </head>
  <body>

  </body>
</html>`,
    checks: [
      { type: "includes", value: "<!doctype html", label: "<!DOCTYPE html> var" },
      { type: "regex", value: "<title>\\s*Benim İlk Sayfam\\s*</title>", label: "Başlık doğru" },
      { type: "regex", value: "<h1>\\s*Merhaba Dünya!\\s*</h1>", label: "h1 içinde Merhaba Dünya!" },
    ],
  },
  {
    id: "html-2",
    level: 2,
    language: "html",
    title: "Başlıklar ve Paragraflar",
    description: "Metni h1-h6 ve p ile düzenle.",
    explanation:
      "Başlıklar <h1>'den <h6>'ya kadar gider; <h1> en önemli, <h6> en küçüktür. Normal metinler <p> (paragraph) etiketiyle yazılır. <strong> kalın, <em> italik vurgu verir.",
    example: `<h1>Blog</h1>
<h2>First post</h2>
<p>This is a <strong>very</strong> short post.</p>`,
    hints: [
      "Sayfada tek bir <h1> olması iyi bir alışkanlıktır.",
      "<h2> alt başlık için kullanılır.",
      "Paragraf açıp kapatmayı unutma: <p>...</p>",
    ],
    challenge:
      'Bir <h1> başlık, bir <h2> alt başlık ve içinde <strong> kullanılan bir <p> paragraf yaz.',
    starterCode: `<h1></h1>
<h2></h2>
<p></p>`,
    checks: [
      { type: "regex", value: "<h1>[^<]+</h1>", label: "Dolu bir h1 var" },
      { type: "regex", value: "<h2>[^<]+</h2>", label: "Dolu bir h2 var" },
      { type: "regex", value: "<p>[\\s\\S]*<strong>[^<]+</strong>[\\s\\S]*</p>", label: "Paragraf içinde strong var" },
    ],
  },
  {
    id: "html-3",
    level: 3,
    language: "html",
    title: "Bağlantılar ve Görseller",
    description: "a ve img etiketlerini öğren.",
    explanation:
      "<a href=\"...\"> bir bağlantı oluşturur. <img src=\"...\" alt=\"...\"> ise görsel ekler. alt metni görsel yüklenmezse gösterilir ve erişilebilirlik için zorunludur.",
    example: `<a href="https://lovable.dev">Visit site</a>
<img src="cat.png" alt="A sleeping cat" />`,
    hints: [
      "Bağlantı adresi href özelliğine yazılır.",
      "<img> kapanış etiketi istemez.",
      "Her görselde alt metni bulunmalı.",
    ],
    challenge: "Bir dış siteye giden bağlantı ve alt metni olan bir görsel ekle.",
    starterCode: `<a href=""></a>
<img src="" alt="" />`,
    checks: [
      { type: "regex", value: '<a\\s+href="https?://[^"]+"[^>]*>[^<]+</a>', label: "Çalışan bir bağlantı var" },
      { type: "regex", value: '<img[^>]+src="[^"]+"', label: "Görselin src değeri var" },
      { type: "regex", value: '<img[^>]+alt="[^"]+"', label: "Görselin alt metni var" },
    ],
  },
  {
    id: "html-4",
    level: 4,
    language: "html",
    title: "Listeler",
    description: "Sıralı ve sırasız listeler oluştur.",
    explanation:
      "<ul> sırasız (madde işaretli), <ol> sıralı (numaralı) liste yapar. Her iki listenin elemanları <li> ile yazılır.",
    example: `<ul>
  <li>Coffee</li>
  <li>Tea</li>
</ul>
<ol>
  <li>Wake up</li>
  <li>Code</li>
</ol>`,
    hints: [
      "Madde işaretli liste için <ul> kullan.",
      "Numaralı liste için <ol> kullan.",
      "Her madde <li> içine yazılır.",
    ],
    challenge: "En az 3 maddelik bir <ul> ve en az 2 maddelik bir <ol> listesi yaz.",
    starterCode: `<ul>

</ul>
<ol>

</ol>`,
    checks: [
      { type: "regex", value: "<ul>[\\s\\S]*(<li>[^<]+</li>[\\s\\S]*){3}</ul>", label: "ul içinde 3 madde var" },
      { type: "regex", value: "<ol>[\\s\\S]*(<li>[^<]+</li>[\\s\\S]*){2}</ol>", label: "ol içinde 2 madde var" },
    ],
  },
  {
    id: "html-5",
    level: 5,
    language: "html",
    title: "Formlar ve Tablolar",
    description: "Kullanıcıdan veri al, veriyi tabloya diz.",
    explanation:
      "<form> içinde <label> ve <input> ile veri toplanır; <button> formu gönderir. Tablolar <table>, satırlar <tr>, hücreler <td>, başlık hücreleri <th> ile yazılır.",
    example: `<form>
  <label for="name">Name</label>
  <input id="name" type="text" />
  <button type="submit">Send</button>
</form>
<table>
  <tr><th>City</th></tr>
  <tr><td>Istanbul</td></tr>
</table>`,
    hints: [
      "label etiketinin for değeri, input'un id değeriyle aynı olmalı.",
      "Buton için <button type=\"submit\"> kullan.",
      "Tablonun her satırı <tr> ile başlar.",
    ],
    challenge: "İçinde label + input + button olan bir form ve en az 2 satırlı bir tablo yaz.",
    starterCode: `<form>

</form>
<table>

</table>`,
    checks: [
      { type: "regex", value: "<label[^>]*>[^<]+</label>", label: "Etiketli bir label var" },
      { type: "regex", value: "<input[^>]*>", label: "Bir input var" },
      { type: "regex", value: "<button[^>]*>[^<]+</button>", label: "Bir buton var" },
      { type: "regex", value: "<table>[\\s\\S]*(<tr>[\\s\\S]*){2}</table>", label: "Tabloda 2 satır var" },
    ],
  },
  {
    id: "css-6",
    level: 6,
    language: "css",
    title: "CSS'e Giriş",
    description: "Seçiciler ve ilk stil kuralın.",
    explanation:
      "CSS kuralı seçici + süslü parantez içinde özelliklerden oluşur. Etiket adıyla (p), sınıfla (.card) veya id ile (#header) seçim yapılır. Her satır noktalı virgülle biter.",
    example: `body {
  color: #1f2937;
}

.card {
  background: #6366f1;
}`,
    hints: [
      "Sınıf seçicisi noktayla başlar: .kutu",
      "id seçicisi diyez ile başlar: #baslik",
      "Her özellikten sonra noktalı virgül koy.",
    ],
    challenge:
      "body için bir color kuralı, .kart adlı bir sınıf için background kuralı yaz.",
    starterCode: `body {

}

.kart {

}`,
    checks: [
      { type: "regex", value: "body\\s*\\{[^}]*color\\s*:", label: "body için color var" },
      { type: "regex", value: "\\.kart\\s*\\{[^}]*background", label: ".kart için background var" },
    ],
  },
  {
    id: "css-7",
    level: 7,
    language: "css",
    title: "Renkler ve Arka Planlar",
    description: "hex, rgb ve gradient kullan.",
    explanation:
      "Renkler hex (#6366f1), rgb(99,102,241) veya isimle (indigo) yazılabilir. background-color düz renk verir; linear-gradient ile iki renk arasında geçiş yapılır.",
    example: `.hero {
  background-color: #ec4899;
  color: rgb(255, 255, 255);
}

.banner {
  background-image: linear-gradient(90deg, #6366f1, #ec4899);
}`,
    hints: [
      "Hex renkler # ile başlar ve 6 karakterdir.",
      "rgb() üç sayı alır: kırmızı, yeşil, mavi.",
      "Gradient için linear-gradient() fonksiyonunu kullan.",
    ],
    challenge:
      ".hero sınıfına hex bir background-color, .banner sınıfına linear-gradient ver.",
    starterCode: `.hero {

}

.banner {

}`,
    checks: [
      { type: "regex", value: "\\.hero\\s*\\{[^}]*background-color\\s*:\\s*#[0-9a-fA-F]{3,6}", label: "hero hex rengi aldı" },
      { type: "regex", value: "linear-gradient\\(", label: "Gradient kullanıldı" },
    ],
  },
  {
    id: "css-8",
    level: 8,
    language: "css",
    title: "Yazı Tipleri",
    description: "font-family, font-size, font-weight.",
    explanation:
      "font-family yazı tipini, font-size boyutu, font-weight kalınlığı belirler. text-align metni hizalar, line-height satır aralığını ayarlar.",
    example: `h1 {
  font-family: "Outfit", sans-serif;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}`,
    hints: [
      "Birden çok yazı tipi yaz, ilki yoksa ikincisi kullanılır.",
      "font-size için px veya rem kullanabilirsin.",
      "Kalınlık için font-weight: 700 dene.",
    ],
    challenge:
      "h1 için font-family, font-size ve font-weight; p için line-height kuralı yaz.",
    starterCode: `h1 {

}

p {

}`,
    checks: [
      { type: "regex", value: "h1\\s*\\{[^}]*font-family\\s*:", label: "h1 font-family aldı" },
      { type: "regex", value: "h1\\s*\\{[^}]*font-size\\s*:", label: "h1 font-size aldı" },
      { type: "regex", value: "h1\\s*\\{[^}]*font-weight\\s*:", label: "h1 font-weight aldı" },
      { type: "regex", value: "p\\s*\\{[^}]*line-height\\s*:", label: "p line-height aldı" },
    ],
  },
  {
    id: "css-9",
    level: 9,
    language: "css",
    title: "Box Model",
    description: "padding, margin, border ve radius.",
    explanation:
      "Her element bir kutudur: içerik, padding (iç boşluk), border (kenarlık) ve margin (dış boşluk). border-radius köşeleri yuvarlatır.",
    example: `.card {
  padding: 16px;
  margin: 24px;
  border: 2px solid #6366f1;
  border-radius: 12px;
}`,
    hints: [
      "padding içeriyi, margin dışarıyı iter.",
      "border için kalınlık + stil + renk yazılır.",
      "border-radius büyüdükçe köşeler yuvarlaklaşır.",
    ],
    challenge: ".card sınıfına padding, margin, border ve border-radius ver.",
    starterCode: `.card {

}`,
    checks: [
      { type: "regex", value: "padding\\s*:", label: "padding var" },
      { type: "regex", value: "margin\\s*:", label: "margin var" },
      { type: "regex", value: "border\\s*:", label: "border var" },
      { type: "regex", value: "border-radius\\s*:", label: "border-radius var" },
    ],
  },
  {
    id: "css-10",
    level: 10,
    language: "css",
    title: "Flexbox ile Yerleşim",
    description: "Elemanları yan yana ve hizalı diz.",
    explanation:
      "display: flex kapsayıcıyı esnek bir satıra çevirir. justify-content yatay, align-items dikey hizalamayı ayarlar. gap elemanlar arasına boşluk koyar.",
    example: `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,
    hints: [
      "Önce kapsayıcıya display: flex ver.",
      "Ortalamak için justify-content: center dene.",
      "Dikey hizalama align-items ile yapılır.",
    ],
    challenge:
      ".row sınıfına display: flex, justify-content, align-items ve gap kuralları yaz.",
    starterCode: `.row {

}`,
    checks: [
      { type: "regex", value: "display\\s*:\\s*flex", label: "display: flex var" },
      { type: "regex", value: "justify-content\\s*:", label: "justify-content var" },
      { type: "regex", value: "align-items\\s*:", label: "align-items var" },
      { type: "regex", value: "gap\\s*:", label: "gap var" },
    ],
  },
  {
    id: "js-11",
    level: 11,
    language: "javascript",
    title: "Değişkenler",
    description: "let, const ve console.log.",
    explanation:
      "let değeri değişebilen, const değişmeyen değişken tanımlar. console.log() ile değerleri ekrana yazdırırsın. Metinler tırnak içinde, sayılar tırnaksız yazılır.",
    example: `const name = "Ada";
let age = 12;
console.log(name, age);`,
    hints: [
      "Değişmeyecek değerler için const kullan.",
      "console.log içine birden fazla değer virgülle verilebilir.",
      'Metni yazarken tırnak koymayı unutma: "Ada"',
    ],
    challenge:
      'name adında bir const ("CodeQuest" olsun) ve score adında let (100) tanımla, ikisini console.log ile yazdır.',
    starterCode: `// Değişkenlerini burada tanımla
`,
    checks: [
      { type: "regex", value: "const\\s+name\\s*=", label: "name const olarak tanımlı" },
      { type: "regex", value: "let\\s+score\\s*=", label: "score let olarak tanımlı" },
      { type: "output", value: "CodeQuest", label: "Çıktıda CodeQuest var" },
      { type: "output", value: "100", label: "Çıktıda 100 var" },
    ],
  },
  {
    id: "js-12",
    level: 12,
    language: "javascript",
    title: "Koşullar",
    description: "if / else ile karar ver.",
    explanation:
      "if bir koşul doğruysa kod bloğunu çalıştırır, else ise değilse çalışır. Karşılaştırmalarda === (eşit), > , < , >= operatörleri kullanılır.",
    example: `const score = 80;
if (score >= 50) {
  console.log("Passed");
} else {
  console.log("Failed");
}`,
    hints: [
      "Eşitlik kontrolünde === kullan, = atama yapar.",
      "Koşul parantez içinde yazılır.",
      "else bloğu koşul sağlanmazsa çalışır.",
    ],
    challenge:
      'score = 45 olsun. 50 ve üzeriyse "Geçti", değilse "Kaldı" yazdır.',
    starterCode: `const score = 45;
`,
    checks: [
      { type: "regex", value: "if\\s*\\(", label: "if kullanıldı" },
      { type: "includes", value: "else", label: "else kullanıldı" },
      { type: "output", value: "Kaldı", label: 'Çıktı "Kaldı"' },
    ],
  },
  {
    id: "js-13",
    level: 13,
    language: "javascript",
    title: "Döngüler",
    description: "for döngüsüyle tekrar et.",
    explanation:
      "Aynı işi tekrar tekrar yapmak için döngü kullanılır. for döngüsü başlangıç, koşul ve artış adımından oluşur: for (let i = 1; i <= 5; i++).",
    example: `for (let i = 1; i <= 3; i++) {
  console.log(i);
}`,
    hints: [
      "i++ her turda i değerini bir artırır.",
      "Koşul yanlış olduğunda döngü biter.",
      "1'den 5'e kadar saymak için i <= 5 yaz.",
    ],
    challenge: "1'den 5'e kadar olan sayıları for döngüsüyle yazdır.",
    starterCode: `// for döngünü yaz
`,
    checks: [
      { type: "regex", value: "for\\s*\\(", label: "for döngüsü var" },
      { type: "output", value: "1", label: "1 yazdırıldı" },
      { type: "output", value: "3", label: "3 yazdırıldı" },
      { type: "output", value: "5", label: "5 yazdırıldı" },
    ],
  },
  {
    id: "js-14",
    level: 14,
    language: "javascript",
    title: "Fonksiyonlar",
    description: "Kodu yeniden kullanılabilir hale getir.",
    explanation:
      "Fonksiyon, isim verdiğin bir kod paketidir. Parametre alır, return ile sonuç döndürür. Böylece aynı kodu tekrar yazmadan çağırabilirsin.",
    example: `function double(n) {
  return n * 2;
}
console.log(double(4));`,
    hints: [
      "function anahtar kelimesiyle başla.",
      "Parametreler parantez içinde yazılır.",
      "Sonucu döndürmek için return kullan.",
    ],
    challenge:
      "İki sayıyı toplayan topla(a, b) fonksiyonu yaz ve topla(3, 4) sonucunu yazdır.",
    starterCode: `function topla(a, b) {

}
`,
    checks: [
      { type: "regex", value: "function\\s+topla\\s*\\(", label: "topla fonksiyonu tanımlı" },
      { type: "includes", value: "return", label: "return kullanıldı" },
      { type: "output", value: "7", label: "Çıktı 7" },
    ],
  },
  {
    id: "js-15",
    level: 15,
    language: "javascript",
    title: "Diziler",
    description: "Liste tut, ekle, uzunluğunu bul.",
    explanation:
      "Dizi (array) birden çok değeri tek değişkende tutar: köşeli parantez içinde virgülle. push() sona eleman ekler, length uzunluğu verir, indeksler 0'dan başlar.",
    example: `const langs = ["html", "css"];
langs.push("js");
console.log(langs.length);
console.log(langs[0]);`,
    hints: [
      "Dizi köşeli parantezle yazılır: []",
      "Eleman eklemek için push() kullan.",
      "İlk elemanın indeksi 0'dır.",
    ],
    challenge:
      'diller adında ["html", "css"] dizisi oluştur, "js" ekle ve dizinin uzunluğunu yazdır.',
    starterCode: `const diller = [];
`,
    checks: [
      { type: "regex", value: "const\\s+diller\\s*=\\s*\\[", label: "diller dizisi var" },
      { type: "includes", value: "push", label: "push kullanıldı" },
      { type: "output", value: "3", label: "Uzunluk 3 yazdırıldı" },
    ],
  },
  {
    id: "js-16",
    level: 16,
    language: "javascript",
    title: "Nesneler",
    description: "Anahtar-değer çiftleriyle veri modelle.",
    explanation:
      "Nesne (object) süslü parantez içinde anahtar: değer çiftlerinden oluşur. Değerlere nokta ile erişilir: user.name. Nesneler bir varlığın özelliklerini bir arada tutar.",
    example: `const user = { name: "Ada", level: 3 };
console.log(user.name);
user.level = 4;`,
    hints: [
      "Nesne süslü parantezle yazılır: {}",
      "Anahtar ile değer arasında iki nokta olur.",
      "Değere erişmek için nesne.anahtar yaz.",
    ],
    challenge:
      'kullanici adında name ve level özellikleri olan bir nesne oluştur, level değerini 5 yap ve level değerini yazdır.',
    starterCode: `const kullanici = {

};
`,
    checks: [
      { type: "regex", value: "const\\s+kullanici\\s*=\\s*\\{", label: "kullanici nesnesi var" },
      { type: "regex", value: "kullanici\\.level", label: "level özelliğine erişildi" },
      { type: "output", value: "5", label: "Çıktı 5" },
    ],
  },
  {
    id: "js-17",
    level: 17,
    language: "javascript",
    title: "DOM'a Erişim",
    description: "Sayfadaki elemanları seç.",
    explanation:
      "DOM, sayfanın JavaScript'teki temsilidir. document.querySelector() CSS seçicisiyle ilk eşleşen elemanı, querySelectorAll() hepsini getirir. getElementById ise id ile arar.",
    example: `const title = document.querySelector("h1");
const items = document.querySelectorAll(".item");
console.log(items.length);`,
    hints: [
      "querySelector CSS seçicisi alır: \"#id\" veya \".sinif\"",
      "Birden çok eleman için querySelectorAll kullan.",
      "Seçtiğin elemanı bir değişkende sakla.",
    ],
    challenge:
      'document.querySelector ile bir h1, querySelectorAll ile ".item" elemanlarını seç ve kaç tane olduğunu yazdır.',
    starterCode: `// Elemanları seç
`,
    checks: [
      { type: "includes", value: "queryselector(", label: "querySelector kullanıldı" },
      { type: "includes", value: "queryselectorall(", label: "querySelectorAll kullanıldı" },
      { type: "includes", value: "length", label: "length ile sayıldı" },
    ],
  },
  {
    id: "js-18",
    level: 18,
    language: "javascript",
    title: "DOM'u Değiştirme",
    description: "İçerik ve stil güncelle.",
    explanation:
      "Seçtiğin elemanın textContent değeriyle yazısını, style ile görünümünü, classList ile sınıflarını değiştirebilirsin. Bu sayede sayfa canlı canlı güncellenir.",
    example: `const box = document.querySelector(".box");
box.textContent = "Updated!";
box.style.color = "#6366f1";
box.classList.add("active");`,
    hints: [
      "Yazıyı değiştirmek için textContent kullan.",
      "Renk için element.style.color yaz.",
      "Sınıf eklemek için classList.add kullan.",
    ],
    challenge:
      'Bir elemanı seç; textContent değerini "Merhaba!" yap, style ile rengini değiştir ve classList.add ile bir sınıf ekle.',
    starterCode: `const el = document.querySelector("h1");
`,
    checks: [
      { type: "includes", value: "textcontent", label: "textContent kullanıldı" },
      { type: "includes", value: ".style.", label: "style ile stil verildi" },
      { type: "includes", value: "classlist.add", label: "classList.add kullanıldı" },
    ],
  },
  {
    id: "js-19",
    level: 19,
    language: "javascript",
    title: "Olaylar (Events)",
    description: "Tıklamaya tepki ver.",
    explanation:
      "addEventListener bir olay olduğunda çalışacak fonksiyonu bağlar. En sık kullanılan olay \"click\"tir. Fonksiyon, olay gerçekleşene kadar beklemede kalır.",
    example: `const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  console.log("Clicked!");
});`,
    hints: [
      "addEventListener iki şey alır: olay adı ve fonksiyon.",
      'Tıklama olayının adı "click".',
      "Ok fonksiyonu şöyle yazılır: () => { }",
    ],
    challenge:
      'Bir butona "click" olayı bağla ve tıklanınca console.log ile "Tıklandı" yazdır.',
    starterCode: `const btn = document.querySelector("button");
`,
    checks: [
      { type: "includes", value: "addeventlistener", label: "addEventListener kullanıldı" },
      { type: "includes", value: '"click"', label: "click olayı bağlandı" },
      { type: "includes", value: "console.log", label: "console.log yazıldı" },
    ],
  },
  {
    id: "js-20",
    level: 20,
    language: "javascript",
    title: "Dizi Metotları",
    description: "map ve filter ile veri dönüştür.",
    explanation:
      "map her elemanı dönüştürüp yeni dizi üretir; filter koşula uyan elemanları seçer. Bu metotlar orijinal diziyi bozmaz, yeni dizi döndürür.",
    example: `const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
const evens = nums.filter((n) => n % 2 === 0);
console.log(doubled, evens);`,
    hints: [
      "map her eleman için bir değer döndürmelidir.",
      "filter true/false döndüren bir koşul bekler.",
      "Çift sayı kontrolü: n % 2 === 0",
    ],
    challenge:
      "sayilar = [1,2,3,4,5] dizisini map ile 2 ile çarp, filter ile çift olanları seç ve ikisini yazdır.",
    starterCode: `const sayilar = [1, 2, 3, 4, 5];
`,
    checks: [
      { type: "includes", value: ".map(", label: "map kullanıldı" },
      { type: "includes", value: ".filter(", label: "filter kullanıldı" },
      { type: "output", value: "10", label: "Çıktıda 10 var" },
    ],
  },
  {
    id: "java-21",
    level: 21,
    language: "java",
    title: "Java'ya Merhaba",
    description: "İlk Java sınıfın ve main metodu.",
    explanation:
      "Java'da her kod bir sınıf (class) içinde yaşar. Program main metodundan başlar. Ekrana yazdırmak için System.out.println() kullanılır ve satırlar noktalı virgülle biter.",
    example: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}`,
    hints: [
      "Sınıf adı Main olsun: public class Main",
      "main metodu public static void olarak yazılır.",
      "Yazdırmak için System.out.println kullan.",
    ],
    challenge:
      'Main adında bir sınıf yaz, main metodu içinde "Merhaba Java!" yazdır.',
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    checks: [
      { type: "regex", value: "class\\s+Main", label: "Main sınıfı var" },
      { type: "includes", value: "public static void main", label: "main metodu var" },
      { type: "regex", value: 'System\\.out\\.println\\("Merhaba Java!"\\)', label: "Doğru mesaj yazdırıldı" },
    ],
  },
  {
    id: "java-22",
    level: 22,
    language: "java",
    title: "Değişkenler ve Tipler",
    description: "int, String, double, boolean.",
    explanation:
      "Java tip belirtir: int tam sayı, double ondalık, String metin, boolean doğru/yanlış tutar. Değişken tanımlarken tipini yazmak zorunludur.",
    example: `int age = 12;
double score = 9.5;
String name = "Ada";
boolean active = true;`,
    hints: [
      "String büyük S ile yazılır.",
      "Ondalık sayılar için double kullan.",
      "boolean değerleri true veya false olur.",
    ],
    challenge:
      "int, double, String ve boolean tipinde birer değişken tanımla ve String olanı yazdır.",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    checks: [
      { type: "regex", value: "int\\s+\\w+\\s*=", label: "int değişken var" },
      { type: "regex", value: "double\\s+\\w+\\s*=", label: "double değişken var" },
      { type: "regex", value: "String\\s+\\w+\\s*=", label: "String değişken var" },
      { type: "regex", value: "boolean\\s+\\w+\\s*=", label: "boolean değişken var" },
      { type: "includes", value: "system.out.println", label: "Yazdırma yapıldı" },
    ],
  },
  {
    id: "java-23",
    level: 23,
    language: "java",
    title: "Koşullar",
    description: "if / else if / else.",
    explanation:
      "Java'da koşullar if (koşul) { } biçiminde yazılır. Birden fazla durum için else if, geri kalan tüm durumlar için else kullanılır.",
    example: `int score = 70;
if (score >= 85) {
  System.out.println("A");
} else if (score >= 60) {
  System.out.println("B");
} else {
  System.out.println("C");
}`,
    hints: [
      "Koşul parantez, gövde süslü parantez içindedir.",
      "İkinci durum için else if kullan.",
      "Son durum else olur.",
    ],
    challenge: "Bir int değişkene göre if / else if / else ile üç farklı mesaj yazdır.",
    starterCode: `public class Main {
  public static void main(String[] args) {
    int puan = 70;

  }
}`,
    checks: [
      { type: "regex", value: "if\\s*\\(", label: "if var" },
      { type: "regex", value: "else\\s+if\\s*\\(", label: "else if var" },
      { type: "regex", value: "else\\s*\\{", label: "else var" },
      { type: "includes", value: "system.out.println", label: "Mesaj yazdırıldı" },
    ],
  },
  {
    id: "java-24",
    level: 24,
    language: "java",
    title: "Döngüler",
    description: "for ve while.",
    explanation:
      "for döngüsü belirli sayıda tekrar için, while döngüsü koşul doğru olduğu sürece çalışmak için kullanılır. Sayaç değişkeni genelde i olarak adlandırılır.",
    example: `for (int i = 1; i <= 3; i++) {
  System.out.println(i);
}

int n = 0;
while (n < 2) {
  n++;
}`,
    hints: [
      "for içinde sayaç tipi de yazılır: int i = 1",
      "while sadece koşul alır.",
      "Sonsuz döngüden kaçınmak için sayacı artır.",
    ],
    challenge: "1'den 5'e kadar sayan bir for döngüsü ve en az bir while döngüsü yaz.",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    checks: [
      { type: "regex", value: "for\\s*\\(\\s*int\\s+\\w+\\s*=", label: "for döngüsü var" },
      { type: "regex", value: "while\\s*\\(", label: "while döngüsü var" },
      { type: "includes", value: "system.out.println", label: "Yazdırma yapıldı" },
    ],
  },
  {
    id: "java-25",
    level: 25,
    language: "java",
    title: "Metotlar",
    description: "Parametre alan ve değer döndüren metotlar.",
    explanation:
      "Metot, dönüş tipi + isim + parametrelerle tanımlanır. Değer döndürmüyorsa void, döndürüyorsa dönüş tipi (int, String...) yazılır ve return kullanılır.",
    example: `public class Main {
  static int add(int a, int b) {
    return a + b;
  }

  public static void main(String[] args) {
    System.out.println(add(2, 3));
  }
}`,
    hints: [
      "Metot main dışında, sınıf içinde tanımlanır.",
      "static yazmak main içinden çağırmayı kolaylaştırır.",
      "Sonucu return ile döndür.",
    ],
    challenge:
      "İki int toplayan static int topla(int a, int b) metodu yaz ve main içinde sonucu yazdır.",
    starterCode: `public class Main {

  public static void main(String[] args) {

  }
}`,
    checks: [
      { type: "regex", value: "int\\s+topla\\s*\\(\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", label: "topla metodu doğru tanımlı" },
      { type: "includes", value: "return", label: "return kullanıldı" },
      { type: "regex", value: "topla\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)", label: "Metot çağrıldı" },
    ],
  },
  {
    id: "py-26",
    level: 26,
    language: "python",
    title: "Python'a Merhaba",
    description: "print ile ilk çıktın.",
    explanation:
      "Python sade bir dildir: süslü parantez yoktur, bloklar girinti (indent) ile belirlenir. Ekrana yazdırmak için print() kullanılır ve satır sonuna noktalı virgül gerekmez.",
    example: `print("Hello, Python!")`,
    hints: [
      "print bir fonksiyondur, parantez ister.",
      "Metni tırnak içine al.",
      "Satır sonunda noktalı virgül yok.",
    ],
    challenge: 'print ile "Merhaba Python!" yazdır.',
    starterCode: `# Kodunu buraya yaz
`,
    checks: [
      { type: "regex", value: 'print\\(\\s*["\']Merhaba Python!["\']\\s*\\)', label: "Doğru mesaj yazdırıldı" },
    ],
  },
  {
    id: "py-27",
    level: 27,
    language: "python",
    title: "Değişkenler ve f-string",
    description: "Değer sakla, metne yerleştir.",
    explanation:
      "Python'da değişken tanımlamak için tip yazmazsın: ad = değer yeter. f-string ile değişkenleri metnin içine gömebilirsin: f\"Merhaba {ad}\".",
    example: `name = "Ada"
level = 3
print(f"{name} is at level {level}")`,
    hints: [
      "Değişken tanımı: ad = \"Ada\"",
      "f-string tırnaktan önce f harfiyle başlar.",
      "Değişkeni süslü parantez içine yaz: {ad}",
    ],
    challenge:
      "ad ve seviye adında iki değişken tanımla, f-string ile ikisini içeren bir cümle yazdır.",
    starterCode: `ad = ""
seviye = 1
`,
    checks: [
      { type: "regex", value: "ad\\s*=", label: "ad değişkeni var" },
      { type: "regex", value: "seviye\\s*=", label: "seviye değişkeni var" },
      { type: "regex", value: "print\\(\\s*f", label: "f-string ile yazdırıldı" },
      { type: "regex", value: "\\{ad\\}", label: "ad metne gömüldü" },
    ],
  },
  {
    id: "py-28",
    level: 28,
    language: "python",
    title: "Koşullar",
    description: "if / elif / else ve girinti.",
    explanation:
      "Python'da koşul satırı iki nokta ile biter ve gövde girintili yazılır. Birden çok durum için elif, kalan durumlar için else kullanılır.",
    example: `score = 70
if score >= 85:
    print("A")
elif score >= 60:
    print("B")
else:
    print("C")`,
    hints: [
      "Koşul satırının sonunda iki nokta (:) olmalı.",
      "Gövde 4 boşluk girintili yazılır.",
      "İkinci durum için elif kullan.",
    ],
    challenge: "puan değişkenine göre if / elif / else ile üç farklı mesaj yazdır.",
    starterCode: `puan = 70
`,
    checks: [
      { type: "regex", value: "if\\s+.+:", label: "if var" },
      { type: "regex", value: "elif\\s+.+:", label: "elif var" },
      { type: "regex", value: "else\\s*:", label: "else var" },
      { type: "includes", value: "print(", label: "Mesaj yazdırıldı" },
    ],
  },
  {
    id: "py-29",
    level: 29,
    language: "python",
    title: "Döngüler",
    description: "for ve range ile tekrar.",
    explanation:
      "for i in range(1, 6): 1'den 5'e kadar döner (üst sınır dahil değildir). while ise koşul doğru olduğu sürece tekrarlar.",
    example: `for i in range(1, 4):
    print(i)`,
    hints: [
      "range(1, 6) 1,2,3,4,5 üretir.",
      "Döngü satırı iki nokta ile biter.",
      "Gövdeyi girintili yaz.",
    ],
    challenge: "for ve range kullanarak 1'den 5'e kadar sayıları yazdır.",
    starterCode: `# Döngünü yaz
`,
    checks: [
      { type: "regex", value: "for\\s+\\w+\\s+in\\s+range\\(", label: "for + range kullanıldı" },
      { type: "includes", value: "print(", label: "Yazdırma var" },
      { type: "regex", value: "range\\(\\s*1\\s*,\\s*6\\s*\\)", label: "1'den 5'e kadar sayıldı" },
    ],
  },
  {
    id: "py-30",
    level: 30,
    language: "python",
    title: "Fonksiyonlar ve Listeler",
    description: "def ile fonksiyon, [] ile liste.",
    explanation:
      "def anahtar kelimesi fonksiyon tanımlar, return sonuç döndürür. Liste köşeli parantezle oluşturulur; append() eleman ekler, len() uzunluğu verir.",
    example: `def topla(a, b):
    return a + b

diller = ["python"]
diller.append("js")
print(topla(2, 3), len(diller))`,
    hints: [
      "Fonksiyon tanımı def ile başlar ve iki nokta ile biter.",
      "Listeye eleman eklemek için append kullan.",
      "Uzunluk için len(liste) yaz.",
    ],
    challenge:
      "topla(a, b) fonksiyonu yaz, bir liste oluştur, append ile eleman ekle ve toplam ile liste uzunluğunu yazdır.",
    starterCode: `def topla(a, b):
    pass
`,
    checks: [
      { type: "regex", value: "def\\s+topla\\s*\\(\\s*a\\s*,\\s*b\\s*\\)\\s*:", label: "topla fonksiyonu tanımlı" },
      { type: "includes", value: "return", label: "return kullanıldı" },
      { type: "includes", value: ".append(", label: "append kullanıldı" },
      { type: "includes", value: "len(", label: "len kullanıldı" },
    ],
  },
  {
    id: "cpp-31",
    level: 31,
    language: "cpp",
    title: "C++'a Merhaba",
    description: "include, main ve cout.",
    explanation:
      "C++ programı #include <iostream> ile başlar ve int main() fonksiyonundan çalışır. Ekrana yazmak için std::cout << kullanılır; std::endl satır atlatır.",
    example: `#include <iostream>

int main() {
  std::cout << "Hello, C++!" << std::endl;
  return 0;
}`,
    hints: [
      "iostream kütüphanesini eklemeyi unutma.",
      "Yazdırma için std::cout << kullan.",
      "main sonunda return 0; yaz.",
    ],
    challenge: '#include <iostream> ekle, main içinde "Merhaba C++!" yazdır ve return 0 yap.',
    starterCode: `#include <iostream>

int main() {

  return 0;
}`,
    checks: [
      { type: "includes", value: "#include <iostream>", label: "iostream eklendi" },
      { type: "regex", value: "int\\s+main\\s*\\(", label: "main fonksiyonu var" },
      { type: "regex", value: 'cout\\s*<<\\s*"Merhaba C\\+\\+!"', label: "Doğru mesaj yazdırıldı" },
    ],
  },
  {
    id: "cpp-32",
    level: 32,
    language: "cpp",
    title: "Değişkenler ve Tipler",
    description: "int, double, string, bool.",
    explanation:
      "C++ tipli bir dildir: int tam sayı, double ondalık, std::string metin, bool doğru/yanlış tutar. string kullanmak için <string> eklenir.",
    example: `#include <iostream>
#include <string>

int main() {
  int age = 12;
  double score = 9.5;
  std::string name = "Ada";
  bool active = true;
  std::cout << name << std::endl;
  return 0;
}`,
    hints: [
      "std::string için <string> eklemeyi unutma.",
      "Ondalık için double kullan.",
      "bool değerleri true/false alır.",
    ],
    challenge: "int, double, string ve bool birer değişken tanımla ve string olanı cout ile yazdır.",
    starterCode: `#include <iostream>
#include <string>

int main() {

  return 0;
}`,
    checks: [
      { type: "regex", value: "int\\s+\\w+\\s*=", label: "int değişken var" },
      { type: "regex", value: "double\\s+\\w+\\s*=", label: "double değişken var" },
      { type: "regex", value: "string\\s+\\w+\\s*=", label: "string değişken var" },
      { type: "regex", value: "bool\\s+\\w+\\s*=", label: "bool değişken var" },
      { type: "includes", value: "cout", label: "cout ile yazdırıldı" },
    ],
  },
  {
    id: "cpp-33",
    level: 33,
    language: "cpp",
    title: "Koşullar",
    description: "if / else if / else.",
    explanation:
      "C++ koşulları Java'ya çok benzer: if (koşul) { } ve gerekirse else if / else. Karşılaştırmada == kullanılır.",
    example: `int score = 70;
if (score >= 85) {
  std::cout << "A";
} else if (score >= 60) {
  std::cout << "B";
} else {
  std::cout << "C";
}`,
    hints: [
      "Eşitlik için == kullan.",
      "İkinci durum else if olur.",
      "Her bloğu süslü parantezle yaz.",
    ],
    challenge: "Bir int değişkene göre if / else if / else ile üç farklı çıktı yazdır.",
    starterCode: `#include <iostream>

int main() {
  int puan = 70;

  return 0;
}`,
    checks: [
      { type: "regex", value: "if\\s*\\(", label: "if var" },
      { type: "regex", value: "else\\s+if\\s*\\(", label: "else if var" },
      { type: "regex", value: "else\\s*\\{", label: "else var" },
      { type: "includes", value: "cout", label: "cout kullanıldı" },
    ],
  },
  {
    id: "cpp-34",
    level: 34,
    language: "cpp",
    title: "Döngüler",
    description: "for ve while ile tekrar.",
    explanation:
      "for (int i = 1; i <= 5; i++) belirli sayıda tekrar eder; while (koşul) koşul doğru oldukça çalışır. Her turda sayacı güncellemeyi unutmamak gerekir.",
    example: `for (int i = 1; i <= 3; i++) {
  std::cout << i << " ";
}`,
    hints: [
      "for içinde sayaç tipini de yaz: int i = 1",
      "while sadece koşul alır.",
      "Sayacı artırmayı unutma, yoksa sonsuz döner.",
    ],
    challenge: "1'den 5'e kadar sayan bir for döngüsü ve bir while döngüsü yaz.",
    starterCode: `#include <iostream>

int main() {

  return 0;
}`,
    checks: [
      { type: "regex", value: "for\\s*\\(\\s*int\\s+\\w+\\s*=", label: "for döngüsü var" },
      { type: "regex", value: "while\\s*\\(", label: "while döngüsü var" },
      { type: "includes", value: "cout", label: "cout kullanıldı" },
    ],
  },
  {
    id: "cpp-35",
    level: 35,
    language: "cpp",
    title: "Fonksiyonlar",
    description: "Kendi fonksiyonunu yaz ve çağır.",
    explanation:
      "C++ fonksiyonu dönüş tipi + isim + parametrelerle tanımlanır ve main'den önce yazılır. Değer döndürmek için return kullanılır.",
    example: `#include <iostream>

int topla(int a, int b) {
  return a + b;
}

int main() {
  std::cout << topla(2, 3) << std::endl;
  return 0;
}`,
    hints: [
      "Fonksiyonu main'den önce tanımla.",
      "Dönüş tipini başa yaz: int topla(...)",
      "Sonucu return ile döndür.",
    ],
    challenge:
      "int topla(int a, int b) fonksiyonu yaz ve main içinde sonucunu cout ile yazdır.",
    starterCode: `#include <iostream>

int main() {

  return 0;
}`,
    checks: [
      { type: "regex", value: "int\\s+topla\\s*\\(\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", label: "topla fonksiyonu tanımlı" },
      { type: "includes", value: "return", label: "return kullanıldı" },
      { type: "regex", value: "topla\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)", label: "Fonksiyon çağrıldı" },
    ],
  },
];

export const MAX_LEVEL = LESSONS.length;

export function getLesson(level: number): Lesson | undefined {
  return LESSONS.find((l) => l.level === level);
}

export function categoryOf(level: number) {
  return CATEGORIES.find((c) => level >= c.from && level <= c.to) ?? CATEGORIES[0];
}

/**
 * Her kategori (dil) bağımsız başlar: istediğin dilin ilk dersi her zaman açıktır.
 * Kategori içinde ilerlemek için önceki dersi bitirmek gerekir.
 */
export function isLessonUnlocked(level: number, completed: Set<number> | number[]): boolean {
  const done = completed instanceof Set ? completed : new Set(completed);
  if (done.has(level)) return true;
  const category = categoryOf(level);
  if (!category || level <= category.from) return true;
  return done.has(level - 1);
}
