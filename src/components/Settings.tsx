import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { useSettings, TimerDuration, TextDifficulty, GameSpeed } from '../context/SettingsContext';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const {
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
  } = useSettings();

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const timerOptions: { value: TimerDuration; label: string }[] = [
    { value: 10, label: '10 seconds' },
    { value: 20, label: '20 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 120, label: '2 minutes' },
    { value: 180, label: '3 minutes' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      await addCustomMusic(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload music');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold gradient-text">Settings</h2>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes className="text-xl" />
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Timer Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Timer Duration (Practice Mode)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timerOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setTimerDuration(option.value)}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    timerDuration === option.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Text Difficulty */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Practice Text Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as TextDifficulty[]).map((diff) => (
                <motion.button
                  key={diff}
                  onClick={() => setTextDifficulty(diff)}
                  className={`py-2 px-4 rounded-lg font-medium capitalize transition-all ${
                    textDifficulty === diff
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {diff}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Game Speed */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Game Mode Speed
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['slow', 'medium', 'fast'] as GameSpeed[]).map((speed) => (
                <motion.button
                  key={speed}
                  onClick={() => setGameSpeed(speed)}
                  className={`py-2 px-4 rounded-lg font-medium capitalize transition-all ${
                    gameSpeed === speed
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {speed}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Music Controls */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Background Music
            </label>
            <div className="flex items-center space-x-4 mb-3">
              <motion.button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className={`py-2 px-6 rounded-lg font-medium transition-all ${
                  musicEnabled
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {musicEnabled ? 'Enabled' : 'Disabled'}
              </motion.button>
            </div>
            
            {musicEnabled && (
              <div>
                <label className="block text-xs text-gray-400 mb-2">
                  Volume: {Math.round(musicVolume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #a78bfa 0%, #ec4899 ${musicVolume * 100}%, rgba(255,255,255,0.2) ${musicVolume * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
            )}
          </div>

          {/* Music Library Management */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Music Library ({customMusic.length} custom)
            </label>
            
            <motion.button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="mb-4 py-2 px-4 rounded-lg font-medium transition-all bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="inline mr-2" />
              Add Music from Device
            </motion.button>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />

            {uploadError && (
              <div className="mb-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {uploadError}
              </div>
            )}

            {customMusic.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 mb-2">Your music files:</p>
                {customMusic.map((music) => (
                  <motion.div
                    key={music.id}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{music.name}</p>
                      <p className="text-xs text-gray-500">
                        Added {new Date(music.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => removeCustomMusic(music.id)}
                      className="ml-2 p-2 hover:bg-red-500/20 rounded-lg transition-all text-red-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Remove"
                    >
                      <FaTrash className="text-sm" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              Upload MP3, WAV, or other audio formats. Max 10MB per file.
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Authentication
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="loginRequired"
                checked={loginRequired}
                onChange={(e) => setLoginRequired(e.target.checked)}
                className="w-5 h-5 rounded bg-white/20 border-2 border-purple-500 checked:bg-purple-500 cursor-pointer"
              />
              <label htmlFor="loginRequired" className="text-gray-300 cursor-pointer">
                Require login to use app
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              When disabled, users can continue as guest without authentication
            </p>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={onClose}
          className="mt-8 w-full btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save Settings
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
