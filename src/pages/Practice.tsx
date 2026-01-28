import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaRedo, FaClock } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { getRandomText, TextContent } from '../data/textContent';
import ResultsModal from '../components/ResultsModal';

interface SessionResult {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  duration: number;
}

export default function Practice() {
  const { timerDuration, textDifficulty } = useSettings();
  const { user } = useAuth();
  
  const [currentText, setCurrentText] = useState<TextContent | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [linesTyped, setLinesTyped] = useState(0);
  const [lastTextId, setLastTextId] = useState<number | undefined>(undefined);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Initialize text on mount or when difficulty changes
  useEffect(() => {
    const text = getRandomText(textDifficulty);
    setCurrentText(text);
    setLastTextId(text.id);
  }, [textDifficulty]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handle typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive || !currentText) return;

    const input = e.target.value;
    setUserInput(input);

    // Calculate correct and incorrect characters
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === currentText.text[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    setCorrectChars(correct);
    setIncorrectChars(incorrect);

    // Check if 5 lines have been typed
    const lines = input.split('\n').length - 1;
    if (lines > linesTyped && lines % 5 === 0) {
      // Change text after every 5 lines
      const newText = getRandomText(textDifficulty, lastTextId);
      setCurrentText(newText);
      setLastTextId(newText.id);
      setLinesTyped(lines);
    }
  };

  // Start practice session
  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(timerDuration);
    setUserInput('');
    setCorrectChars(0);
    setIncorrectChars(0);
    setLinesTyped(0);
    inputRef.current?.focus();
  };

  // Restart practice session
  const handleRestart = () => {
    setIsActive(false);
    setTimeLeft(timerDuration);
    setUserInput('');
    setCorrectChars(0);
    setIncorrectChars(0);
    setLinesTyped(0);
    setShowResults(false);
    
    const newText = getRandomText(textDifficulty);
    setCurrentText(newText);
    setLastTextId(newText.id);
  };

  // Handle time end
  const handleTimeEnd = () => {
    setIsActive(false);
    
    const totalChars = correctChars + incorrectChars;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    const minutes = timerDuration / 60;
    const wpm = Math.round((correctChars / 5) / minutes);

    const result: SessionResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      wpm,
      accuracy: Math.round(accuracy * 10) / 10,
      correctChars,
      incorrectChars,
      totalChars,
      duration: timerDuration
    };

    setSessionResult(result);
    saveResult(result);
    setShowResults(true);

    // Auto-reset after showing results
    setTimeout(() => {
      handleRestart();
    }, 5000);
  };

  // Save result to localStorage
  const saveResult = (result: SessionResult) => {
    const storageKey = user ? `results_${user.email}` : 'results_guest';
    const existingResults = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedResults = [...existingResults, result];
    localStorage.setItem(storageKey, JSON.stringify(updatedResults));
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render text with highlighting
  const renderText = () => {
    if (!currentText) return null;

    return currentText.text.split('').map((char, index) => {
      let className = '';
      
      if (index < userInput.length) {
        className = userInput[index] === char ? 'char-correct' : 'char-incorrect';
      } else if (index === userInput.length) {
        className = 'char-current';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center gradient-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Practice Mode
        </motion.h1>

        {/* Timer and Controls */}
        <motion.div
          className="glass rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <FaClock className="text-3xl text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Time Remaining</p>
                <p className="text-3xl font-bold text-white">{formatTime(timeLeft)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-center px-4">
                <p className="text-sm text-gray-400">WPM</p>
                <p className="text-2xl font-bold text-green-400">
                  {isActive ? Math.round((correctChars / 5) / ((timerDuration - timeLeft) / 60 || 1)) : 0}
                </p>
              </div>
              <div className="text-center px-4 border-l border-white/20">
                <p className="text-sm text-gray-400">Accuracy</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {correctChars + incorrectChars > 0
                    ? Math.round((correctChars / (correctChars + incorrectChars)) * 100)
                    : 0}%
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleStart}
                disabled={isActive}
                className={`btn-primary flex items-center space-x-2 ${
                  isActive ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={!isActive ? { scale: 1.05 } : {}}
                whileTap={!isActive ? { scale: 0.95 } : {}}
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
          </div>
        </motion.div>

        {/* Typing Area */}
        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            ref={textContainerRef}
            className="typing-text mb-6 p-6 bg-black/30 rounded-lg max-h-96 overflow-y-auto"
          >
            {renderText()}
          </div>

          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            disabled={!isActive}
            className="w-full h-32 p-4 bg-white/10 border-2 border-purple-500/50 rounded-lg focus:outline-none focus:border-purple-500 text-white text-lg resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={isActive ? "Start typing..." : "Click Start to begin"}
          />

          <div className="mt-4 flex justify-between text-sm text-gray-400">
            <span>Difficulty: <span className="text-purple-400 capitalize">{textDifficulty}</span></span>
            <span>Duration: <span className="text-pink-400">{timerDuration < 60 ? `${timerDuration}s` : `${timerDuration / 60}m`}</span></span>
          </div>
        </motion.div>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && sessionResult && (
          <ResultsModal
            result={sessionResult}
            onClose={() => setShowResults(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
