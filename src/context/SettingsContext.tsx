import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TimerDuration = 10 | 20 | 30 | 60 | 120 | 180 | 300 | 600;
export type TextDifficulty = 'easy' | 'medium' | 'hard';
export type GameSpeed = 'slow' | 'medium' | 'fast';

export interface CustomMusic {
  id: string;
  name: string;
  url: string;
  addedAt: number;
}

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
  customMusic: CustomMusic[];
  addCustomMusic: (file: File) => Promise<void>;
  removeCustomMusic: (id: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [timerDuration, setTimerDuration] = useState<TimerDuration>(60);
  const [textDifficulty, setTextDifficulty] = useState<TextDifficulty>('medium');
  const [gameSpeed, setGameSpeed] = useState<GameSpeed>('medium');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [loginRequired, setLoginRequired] = useState(false);
  const [customMusic, setCustomMusic] = useState<CustomMusic[]>([]);

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

    const savedMusic = localStorage.getItem('customMusic');
    if (savedMusic) {
      setCustomMusic(JSON.parse(savedMusic));
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

  // Save custom music to localStorage
  useEffect(() => {
    localStorage.setItem('customMusic', JSON.stringify(customMusic));
  }, [customMusic]);

  const addCustomMusic = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        reject(new Error('Please select an audio file'));
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(new Error('File size must be less than 10MB'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const newMusic: CustomMusic = {
          id: Date.now().toString(),
          name: file.name,
          url,
          addedAt: Date.now()
        };
        setCustomMusic((prev) => [...prev, newMusic]);
        resolve();
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeCustomMusic = (id: string) => {
    setCustomMusic((prev) => prev.filter((music) => music.id !== id));
  };

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
        setLoginRequired,
        customMusic,
        addCustomMusic,
        removeCustomMusic
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
