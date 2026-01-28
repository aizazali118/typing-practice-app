# 🚀 TypeMaster - Professional Typing Practice App

A modern, feature-rich typing practice application built with React, TypeScript, Tailwind CSS, and Framer Motion. Master your typing skills with interactive practice sessions, engaging games, and comprehensive analytics.

![TypeMaster](https://img.shields.io/badge/TypeMaster-v1.0.0-purple)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

### 🎯 Practice Mode
- **Real-time character highlighting** - See correct (green) and incorrect (red) characters as you type
- **Live statistics** - Track WPM and accuracy in real-time
- **Customizable timer** - Choose from 10 seconds to 10 minutes
- **Auto text rotation** - New text every 5 lines typed
- **Multiple difficulty levels** - Easy, Medium, and Hard texts
- **30+ practice texts** - Varied content across all difficulty levels

### 🎮 Game Mode
- **Falling words challenge** - Type words before they hit the bottom
- **Speed options** - Slow, Medium, and Fast difficulty
- **High score tracking** - Beat your personal best
- **Smooth animations** - Powered by Framer Motion
- **Score calculation** - Points based on word length

### 📊 Progress Tracking
- **Comprehensive analytics** - Detailed session statistics
- **Interactive charts** - WPM and accuracy visualizations using Recharts
- **Improvement tracking** - Compare recent vs previous sessions
- **Session history** - Complete list of all practice sessions
- **Best scores** - Track your best WPM and accuracy

### 🎵 Additional Features
- **Background music** - Toggle-able audio with volume control
- **Guest mode** - Use without login
- **Login system** - Optional authentication for profile tracking
- **Settings panel** - Customize all app preferences
- **Responsive design** - Works on desktop, tablet, and mobile
- **Dark theme** - Modern glass morphism UI
- **Data persistence** - All progress saved in localStorage

## 🛠️ Tech Stack

- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4** - Styling
- **Framer Motion 10** - Animations
- **Recharts 2.10** - Charts and visualizations
- **React Icons 4.12** - Icon library

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd typing-practice-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist` folder.

## 📁 Project Structure

```
typing-practice-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Settings.tsx
│   │   ├── AuthModal.tsx
│   │   ├── AudioPlayer.tsx
│   │   └── ResultsModal.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Practice.tsx
│   │   ├── GameMode.tsx
│   │   ├── Progress.tsx
│   │   └── About.tsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── SettingsContext.tsx
│   ├── data/               # Data and content
│   │   └── textContent.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎮 How to Use

### Practice Mode
1. Navigate to **Practice** from the navbar
2. Select your timer duration and difficulty in **Settings**
3. Click **Start** to begin
4. Type the displayed text
5. View results when time expires
6. Check your progress in the **Progress** tab

### Game Mode
1. Navigate to **Game** from the navbar
2. Set your preferred speed in **Settings** (Slow/Medium/Fast)
3. Click **Start** to begin
4. Type falling words before they reach the bottom
5. Game ends after 10 misses

### Tracking Progress
1. Navigate to **Progress** to view:
   - Total sessions
   - Best and average WPM
   - Best and average accuracy
   - Interactive charts
   - Complete session history
   - Recent improvement metrics

## ⚙️ Configuration

### Settings Options
- **Timer Duration**: 10s, 20s, 30s, 1m, 2m, 3m, 5m, 10m
- **Text Difficulty**: Easy, Medium, Hard
- **Game Speed**: Slow, Medium, Fast
- **Background Music**: Enable/Disable with volume control
- **Login Requirement**: Toggle authentication requirement

### Customization

#### Adding More Practice Texts
Edit `src/data/textContent.ts` and add new entries to the `textDatabase` array:

```typescript
{
  id: 33,
  text: "Your practice text here...",
  difficulty: 'medium'
}
```

#### Changing Music Tracks
Edit `src/components/AudioPlayer.tsx` and update the `audioSources` array with your music file URLs.

#### Updating Social Links
Edit `src/components/Footer.tsx` and update the URLs in the `socialLinks` array.

## 🎨 Features Highlights

### WPM Calculation
```typescript
WPM = (correct characters / 5) / minutes
```

### Accuracy Calculation
```typescript
Accuracy = (correct / (correct + incorrect)) * 100
```

### Character Highlighting
- ✅ Green: Correctly typed
- ❌ Red: Incorrectly typed
- 📍 Purple underline: Current position

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clean build
rm -rf dist
npm run build
```

## 📝 Notes

- **Data Persistence**: All progress is stored in localStorage
- **Browser Compatibility**: Works best on modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Support**: Fully responsive, but best experience on desktop
- **Audio Files**: Sample URLs provided - replace with your own music files
- **Authentication**: Demo mode - any email/password will work

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Developer

**Aizaz Ali Afridi**
- Portfolio: [https://aizaz-ali-afridi-dev.vercel.app/](https://aizaz-ali-afridi-dev.vercel.app/)
- GitHub: [Update with your GitHub]
- LinkedIn: [Update with your LinkedIn]

## 🙏 Acknowledgments

- Built with modern React best practices
- UI inspired by modern web design trends
- Font: Orbitron (display), Space Mono (body)
- Icons from React Icons

---

Made with ❤️ using React + TypeScript + Tailwind CSS + Framer Motion
