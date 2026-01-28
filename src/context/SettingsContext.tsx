import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TimerDuration = 10 | 20 | 30 | 60 | 120 | 180 | 300 | 600;
export type TextDifficulty = 'easy' | 'medium' | 'hard';
export type GameSpeed = 'slow' | 'medium' | 'fast';

interface SettingsContextType {
  timerDuration: TimerDuration;
  setTimerDuration: (duration: TimerDuration) => void;
  textDifficulty: TextDifficulty;
  setTextDifficulty: (difficulty: TextDifficulty) => void;
  gameSpeed: GameSpeed;
  setGameSpeed: (speed: GameSpeed) => void;
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  loginRequired: boolean;
  setLoginRequired: (required: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [timerDuration, setTimerDuration] = useState<TimerDuration>(60);
  const [textDifficulty, setTextDifficulty] = useState<TextDifficulty>('medium');
  const [gameSpeed, setGameSpeed] = useState<GameSpeed>('medium');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [loginRequired, setLoginRequired] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTimerDuration(settings.timerDuration || 60);
      setTextDifficulty(settings.textDifficulty || 'medium');
      setGameSpeed(settings.gameSpeed || 'medium');
      setMusicEnabled(settings.musicEnabled || false);
      setMusicVolume(settings.musicVolume || 0.5);
      setLoginRequired(settings.loginRequired || false);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      timerDuration,
      textDifficulty,
      gameSpeed,
      musicEnabled,
      musicVolume,
      loginRequired
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [timerDuration, textDifficulty, gameSpeed, musicEnabled, musicVolume, loginRequired]);

  return (
    <SettingsContext.Provider
      value={{
        timerDuration,
        setTimerDuration,
        textDifficulty,
        setTextDifficulty,
        gameSpeed,
        setGameSpeed,
        musicEnabled,
        setMusicEnabled,
        musicVolume,
        setMusicVolume,
        loginRequired,
        setLoginRequired
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
