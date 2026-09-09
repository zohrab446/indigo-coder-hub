# CodeQuest: Learn & Play

Adı "CodeQuest" olan, Duolingo tarzında oyunlaştırılmış bir yazılım öğrenme web uygulaması yap. 

## ÖZELLİKLER:

### 1. AUTHENTICATION
- Google OAuth ile login (Firebase kullan)
- İlk sign in'de custom avatar seçimi
  - 4 şekil seçenek: ⭐ ● ■ ▲
  - 8 renk seçenek: İndigo, Pink, Mavi, Turuncu, Yeşil, Mor, Kırmızı, Sarı
  - Username set etme (max 20 karakter)
- Session persist (localStorage)

### 2. RENK PALETI (Duolingo'nun yeşili yerine)
- Ana Renk: #6366F1 (İndigo)
- Accent: #EC4899 (Pembe)
- Background: #F8FAFC (Açık mavi-gri)
- Success: #10B981 (Yeşil)
- Error: #EF4444 (Kırmızı)
- Text: #1F2937 (Dark gray)

### 3. DASHBOARD
Giriş yaptıktan sonra dashboard göster:
- Üst: Welcome card "Merhaba, [İsim]!"
- Current Level (büyük, renkli gösterim) + Sonraki seviyeye % progress bar
- Streak counter (kaç gün ard arda 🔥)
- Toplam coins göstergesi (💰)
- Leaderboard top 3 (sağ tarafta)
- "Devam Et" butonu (en son dersi devam ettirmek için)
- Lesson grid: Tamamlanan/Tamamlanmayan dersler görsel olarak

### 4. LEVEL/LESSON SYSTEM
Dersler kategorili:
- Level 1-5: HTML Temelleri (<!DOCTYPE>, tags, structure)
- Level 6-10: CSS ve Styling (colors, fonts, layout)
- Level 11-15: JavaScript Basics (variables, loops, functions)
- Level 16-20: JavaScript Advanced (DOM, events)
- Level 21-25: Java Temelleri
- Level 26-30: Python Temelleri  
- Level 31-35: C++ Temelleri

Her level tamamlandığında:
- 🎉 Confetti animation
- +100 XP kazanılır (başlangıç, level arttıkça artsın)
- +50 coins kazanılır
- Level auto increment
- Sonraki level unlock olur
- "Next Challenge" butonu

### 5. LESSON/CHALLENGE SCREEN
Layout: 50% left (explanation) | 50% right (code editor)

SOL PANEL:
- Lesson başlığı (H2)
- 📝 Açıklama paragrafı
- 💡 Kod örneği (syntax highlighting)
- 3 tane hint button (?) - her biri tıklandığında ipucu göster
- ✅ Challenge description (ne yapacağını anla)

SAĞ PANEL:
- @monaco-editor/react ile code editor
- Syntax highlighting (language seçili)
- Theme toggle (Light/Dark)
- Font size +/- 
- "Kodu Çalıştır" button (Run)
- "Gönder" button (Submit)
- Output/Test Results panel (altında)

Kullanıcı submit yaptığında:
- Backend'e gönder (code execution için)
- Test cases against expected output
- ✅ Pass → XP + coins, sonraki level unlock, celebration
- ❌ Fail → Error message göster, try again button

### 6. AI CHAT BOT
Sağ alt corner'da floating chat bubble (💬 icon):
- Expandable sidebar (sağdan açılır)
- Mesaj gönder/receive
- Typing indicator
- User avatar + AI avatar
- Chat history (session içinde)

Sistem prompt:
"Yazılım öğrenme asistanısın. Türkçe ve İngilizce konuş. Direkt cevap verme, ipucu ver ve soruyla soruna cevap ver. Öğrenciyi düşünmeye teşvik et. Motive et, cesaretlendir."

Örnek interactions:
- User: "Bu kod niye çalışmıyor?"
  Bot: "Hata mesajı ne? Hangi satırda problem görüyorsun?" (yönlendirme)
  
- User: "Döngü (loop) nedir?"
  Bot: "Aynı kodu tekrar tekrar çalıştırmak istersen hangi yapı kullanırsın? Düşün..." (explanation)

### 7. LEADERBOARD
Ayrı sayfa:
- Weekly / All-Time toggle
- Top 50 players
- Kullanıcının rankı (kaçıncı olduğu)
- Her user'ın: avatar, username, level, XP
- "Share" button (score share etmek için)

### 8. USER PROFILE
- Custom avatar (gösterim)
- Username + email
- Current level
- Total XP
- Total coins
- Achievements/Badges (tamamlanmış başarılar)
- Streak
- Completed lessons count
- Favorite language
- Settings: Sound on/off, Theme, Language (TR/EN)

### 9. GAMIFICATION

**Badges/Achievements:**
- 🔥 "Week Warrior": 7 gün streak
- 💯 "Century": 100 XP
- 🎓 "HTML Master": Tüm HTML dersler
- 🚀 "Speedrunner": Bir dersi 2 dk'da bitir
- ⭐ "Level 10": 10. seviye ulaş
- 💪 "Consistent Coder": 30 gün active

**Rewards System:**
- Coins → Themes unlock, Avatar customization
- XP → Next level, Badges
- Streak → Bonus multiplier (2x XP after 7 days)

### 10. RESPONSIVE DESIGN
- Desktop: 50/50 side layout
- Tablet: Vertical stack, editor full-width
- Mobile: Tab-based (Explanation tab | Editor tab)

## TECHNICAL STACK:

### Frontend (React + Tailwind)
- @monaco-editor/react (code editor)
- firebase (auth + database)
- zustand (state management)
- lucide-react (icons)
- react-router-dom (navigation)
- react-confetti (celebration animation)

### Backend (Firebase)
- Firebase Authentication (Google OAuth)
- Firestore (database)
- Cloud Functions (code execution / logic)
- Hosting (deploy)

ALTERNATIF: Judge0 API veya Docker container'da code execution

### Database Collections:

**users**
- uid, email, displayName, photoURL
- level, xp, streak, coins, completedLessons
- customAvatar {iconShape, color, nickname}
- createdAt, lastLoginAt

**lessons**
- id, title, description, language (html|css|js|java|python|cpp)
- level, difficulty, xpReward, coinsReward
- content {explanation, example, hints[]}
- challenge {description, starterCode, expectedOutput, testCases[]}

**leaderboard**
- userId, username, level, totalXp, weeklyXp, position, avatar

**chat_history** (optional)
- userId, messages[], timestamp

## API ENDPOINTS:

POST   /auth/google              - Login
GET    /users/:uid               - Get profile
PUT    /users/:uid               - Update profile
GET    /lessons                  - All lessons
GET    /lessons/:id              - Single lesson
POST   /lessons/:id/submit       - Submit code
GET    /leaderboard              - Leaderboard
POST   /chat/message             - Chat with AI

## CONTENT ÖRNEK:

**HTML Level 1: "Merhabalar, HTML!"**
Explanation: HTML (HyperText Markup Language) web sayfalarının iskeletini oluşturur...
Example:
```html


  
    
  
  
    

Merhaba!


  

```
Challenge: Adında "Benim İlk Sayfam" başlığı olan ve body'de 

 ile "Merhaba Dünya!" yazan bir HTML sayfası yaz.
Hints: [" tag'i heading için", " içeride yazı gedir"]

## YAPILACAKLAR SIRASINA GÖRE:

1. Setup: React + Tailwind + Firebase
2. Auth: Google OAuth + Profile creation
3. Dashboard: Home screen layout
4. Lessons: Dersler + grid display
5. Editor: Monaco + basic execution
6. Game Mechanics: XP + Level system
7. Chat Bot: Floating chat + AI
8. Leaderboard: Rankings
9. Gamification: Badges + rewards
10. Polish: Animations, mobile, performance

## ÖNEMLİ NOTLAR:

- Tüm metin TÜRKÇE olsun ama kod örnekleri İngilizce
- Renkler Duolingo yeşili yerine benim verdiğim indigo + pink kullan
- Mobile-first design yap, sonra desktop'a scale et
- Loading states göster (skeleton, spinner)
- Error handling yapılsın (try/catch, user feedback)
- Sound effects toggle yapılabilir
- Dark mode support ekle
- Accessibility: ARIA labels, color contrast
- Infinite loading değil, pagination/scroll yapılabilir
- Real-time leaderboard updates (optional)

Bunu bitirdikten sonra şu özellikleri ekleyebiliriz:
- Friends system
- Challenge other users  
- Live coding sessions
- Video tutorials
- Certificate system
- Mobile app (React Native)\

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://indigo-coder-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8c3ff6a2-b572-4241-b346-4664ed6285d4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
