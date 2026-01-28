import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Practice from './pages/Practice';
import GameMode from './pages/GameMode';
import Progress from './pages/Progress';
import About from './pages/About';
import Settings from './components/Settings';
import AuthModal from './components/AuthModal';
import AudioPlayer from './components/AudioPlayer';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

export type Page = 'home' | 'practice' | 'game' | 'progress' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'practice':
        return <Practice />;
      case 'game':
        return <GameMode />;
      case 'progress':
        return <Progress />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <SettingsProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
          {/* Background effects */}
          <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar 
              currentPage={currentPage} 
              onNavigate={setCurrentPage}
              onOpenSettings={() => setShowSettings(true)}
              onOpenAuth={() => setShowAuth(true)}
            />
            
            <main className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            <Footer />
          </div>

          {/* Audio Player */}
          <AudioPlayer />

          {/* Settings Modal */}
          <AnimatePresence>
            {showSettings && (
              <Settings onClose={() => setShowSettings(false)} />
            )}
          </AnimatePresence>

          {/* Auth Modal */}
          <AnimatePresence>
            {showAuth && (
              <AuthModal onClose={() => setShowAuth(false)} />
            )}
          </AnimatePresence>
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
