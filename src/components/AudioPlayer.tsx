import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMusic, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaPlus } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';

export default function AudioPlayer() {
  const { musicEnabled, musicVolume, customMusic, addCustomMusic } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Audio sources (default + custom)
  const defaultAudioSources = [
    // Placeholder - replace with actual music file URLs
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  ];

  const allAudioSources = [
    ...defaultAudioSources,
    ...customMusic.map((music) => music.url)
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(allAudioSources[currentTrack]);
    audioRef.current.loop = true;
    audioRef.current.volume = musicVolume;

    // Play if music is enabled
    if (musicEnabled) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play blocked - user interaction required
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack, allAudioSources]);

  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      } else if (!musicEnabled && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [musicEnabled]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const changeTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % allAudioSources.length);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      await addCustomMusic(file);
      // Reset file input
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

  if (!musicEnabled) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="glass-strong rounded-full p-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={togglePlay}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
          </motion.button>

          <AnimatePresence>
            {showControls && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <motion.button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-gray-400" />
                  ) : (
                    <FaVolumeUp className="text-purple-400" />
                  )}
                </motion.button>

                <motion.button
                  onClick={changeTrack}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Change Track"
                >
                  <FaMusic className="text-pink-400" />
                </motion.button>

                <motion.button
                  onClick={triggerFileInput}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Add Music"
                  disabled={isUploading}
                >
                  <FaPlus className={isUploading ? 'text-gray-400' : 'text-green-400'} />
                </motion.button>

                <span className="text-xs text-gray-400 ml-2">
                  {allAudioSources.length > 0
                    ? `${currentTrack + 1}/${allAudioSources.length}`
                    : 'No music'}
                </span>

                {uploadError && (
                  <span className="text-xs text-red-400 ml-2">{uploadError}</span>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
