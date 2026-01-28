# 🚀 TypeMaster - Quick Start Guide

## Installation (5 minutes)

```bash
# 1. Navigate to project directory
cd typing-practice-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:5173
```

## ✅ What You Get

### Complete Features
✓ Practice Mode with real-time WPM/accuracy tracking
✓ Falling Words Game with 3 speed levels
✓ Progress tracking with charts and analytics
✓ 30+ practice texts (easy/medium/hard)
✓ Background music player
✓ Guest mode + login system
✓ Full localStorage persistence
✓ Responsive mobile-friendly design

### Ready-to-Use Pages
- **Home** - Hero section with feature cards
- **Practice** - Main typing practice with timer
- **Game** - Falling words mini-game
- **Progress** - Analytics dashboard with charts
- **About** - Project information and links

## 🎯 First Use

1. **Start app** → `npm run dev`
2. **Click "Continue as Guest"** (or login with any email/password)
3. **Go to Practice** → Click Start
4. **Type the displayed text**
5. **View results** when timer ends
6. **Check Progress** tab to see your stats

## ⚙️ Customization Points

### Change Colors
Edit `src/index.css` - CSS variables at the top

### Add Texts
Edit `src/data/textContent.ts` - add to textDatabase array

### Change Music
Edit `src/components/AudioPlayer.tsx` - update audioSources array

### Update Social Links
Edit `src/components/Footer.tsx` - update URLs in socialLinks

### Change Portfolio Link
Update `https://aizaz-ali-afridi-dev.vercel.app/` in:
- `src/components/Footer.tsx`
- `src/pages/About.tsx`

## 📱 Test All Features

1. ✅ Practice → Start → Type → See results
2. ✅ Game → Start → Type falling words
3. ✅ Progress → View charts and history
4. ✅ Settings → Change timer, difficulty, speed
5. ✅ Audio → Click music icon → Toggle play/pause

## 🏗️ Build for Production

```bash
npm run build
# Output in dist/ folder
```

Deploy `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## 🆘 Common Issues

**Port 5173 busy?**
Vite will auto-use next port (5174, etc)

**Dependencies error?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Blank screen?**
Check browser console for errors

## 📊 File Structure Overview

```
src/
├── components/     → Navbar, Footer, Modals, etc.
├── pages/         → Home, Practice, Game, Progress, About
├── context/       → AuthContext, SettingsContext
├── data/          → Practice texts database
├── App.tsx        → Main app with routing
└── main.tsx       → Entry point
```

## 💡 Pro Tips

- Practice mode auto-changes text every 5 lines
- Game mode gets harder as you progress
- Progress charts show last 10 sessions
- All data persists in localStorage
- Works offline after first load

---

**Need Help?** Check the full README.md for detailed documentation.

Made with ❤️ by Aizaz Ali Afridi
