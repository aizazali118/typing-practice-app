import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMusic, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';

export default function AudioPlayer() {
  const { musicEnabled, musicVolume } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio sources (using public domain/royalty-free URLs as placeholders)
  // Replace these with your own music files
  const audioSources = [
    // Placeholder - replace with actual music file URLs
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioSources[currentTrack]);
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
  }, [currentTrack]);

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
    setCurrentTrack((prev) => (prev + 1) % audioSources.length);
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

                <span className="text-xs text-gray-400 ml-2">
                  Track {currentTrack + 1}/{audioSources.length}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
