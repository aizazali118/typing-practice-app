import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaRedo, FaTrophy } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import { getRandomWords } from '../data/textContent';

interface FallingWord {
  id: string;
  word: string;
  x: number;
  y: number;
  speed: number;
}

export default function GameMode() {
  const { gameSpeed } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('gameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Game speed configuration
  const getSpeedConfig = () => {
    switch (gameSpeed) {
      case 'slow':
        return { fallSpeed: 1, spawnInterval: 2000 };
      case 'medium':
        return { fallSpeed: 2, spawnInterval: 1500 };
      case 'fast':
        return { fallSpeed: 3, spawnInterval: 1000 };
      default:
        return { fallSpeed: 2, spawnInterval: 1500 };
    }
  };

  // Spawn new falling words
  const spawnWord = () => {
    const words = getRandomWords(1);
    const newWord: FallingWord = {
      id: Date.now().toString() + Math.random(),
      word: words[0],
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: 0,
      speed: getSpeedConfig().fallSpeed
    };
    setFallingWords(prev => [...prev, newWord]);
  };

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = (currentTime: number) => {
      // Spawn new words at intervals
      if (currentTime - lastSpawnRef.current > getSpeedConfig().spawnInterval) {
        spawnWord();
        lastSpawnRef.current = currentTime;
      }

      // Update word positions
      setFallingWords(prev => {
        const updated = prev.map(word => ({
          ...word,
          y: word.y + word.speed
        }));

        // Remove words that fell off screen and count as misses
        const filtered = updated.filter(word => {
          if (word.y > 100) {
            setMisses(m => m + 1);
            return false;
          }
          return true;
        });

        return filtered;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, gameSpeed]);

  // Check game over condition
  useEffect(() => {
    if (misses >= 10 && isPlaying) {
      handleGameOver();
    }
  }, [misses, isPlaying]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentInput(input);

    // Check if input matches any falling word
    const matchedWord = fallingWords.find(word => 
      word.word.toLowerCase() === input.toLowerCase()
    );

    if (matchedWord) {
      // Remove matched word
      setFallingWords(prev => prev.filter(w => w.id !== matchedWord.id));
      setScore(s => s + matchedWord.word.length * 10);
      setCurrentInput('');
    }
  };

  // Start game
  const handleStart = () => {
    setIsPlaying(true);
    setScore(0);
    setMisses(0);
    setFallingWords([]);
    setCurrentInput('');
    setGameOver(false);
    lastSpawnRef.current = 0;
    inputRef.current?.focus();
  };

  // Restart game
  const handleRestart = () => {
    handleStart();
  };

  // Game over
  const handleGameOver = () => {
    setIsPlaying(false);
    setGameOver(true);
    
    // Update high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('gameHighScore', score.toString());
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center gradient-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Falling Words Game
        </motion.h1>

        {/* Stats Bar */}
        <motion.div
          className="glass rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-3xl font-bold text-green-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">High Score</p>
              <p className="text-3xl font-bold text-yellow-400">{highScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Misses</p>
              <p className="text-3xl font-bold text-red-400">{misses}/10</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Speed</p>
              <p className="text-2xl font-bold text-purple-400 capitalize">{gameSpeed}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-6">
            <motion.button
              onClick={handleStart}
              disabled={isPlaying}
              className={`btn-primary flex items-center space-x-2 ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={!isPlaying ? { scale: 1.05 } : {}}
              whileTap={!isPlaying ? { scale: 0.95 } : {}}
            >
              <FaPlay />
              <span>Start</span>
            </motion.button>

            <motion.button
              onClick={handleRestart}
              className="btn-outline flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo />
              <span>Restart</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Game Area */}
        <motion.div
          ref={containerRef}
          className="glass rounded-2xl p-8 relative overflow-hidden"
          style={{ height: '500px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <FaTrophy className="text-6xl text-yellow-400 mx-auto mb-4" />
                <p className="text-2xl text-gray-300 mb-2">Ready to Play?</p>
                <p className="text-gray-400">Type the falling words before they reach the bottom!</p>
              </div>
            </div>
          )}

          {gameOver && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center glass-strong p-8 rounded-2xl">
                <p className="text-4xl font-bold gradient-text mb-4">Game Over!</p>
                <p className="text-2xl text-white mb-2">Final Score: {score}</p>
                {score > highScore && (
                  <p className="text-lg text-yellow-400 mb-4">🎉 New High Score!</p>
                )}
                <motion.button
                  onClick={handleRestart}
                  className="btn-primary mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Falling Words */}
          <AnimatePresence>
            {fallingWords.map(word => (
              <motion.div
                key={word.id}
                className="absolute text-2xl font-bold text-white"
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                  textShadow: '0 0 10px rgba(167, 139, 250, 0.8)'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg">
                  {word.word}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Input Area */}
        <motion.div
          className="glass rounded-2xl p-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            disabled={!isPlaying}
            className="w-full p-4 bg-white/10 border-2 border-purple-500/50 rounded-lg focus:outline-none focus:border-purple-500 text-white text-xl text-center disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={isPlaying ? "Type the words..." : "Click Start to begin"}
          />
        </motion.div>
      </div>
    </div>
  );
}
