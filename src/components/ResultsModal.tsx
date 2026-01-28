import { motion } from 'framer-motion';
import { FaTimes, FaTrophy, FaBullseye, FaKeyboard, FaClock } from 'react-icons/fa';

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

interface ResultsModalProps {
  result: SessionResult;
  onClose: () => void;
}

export default function ResultsModal({ result, onClose }: ResultsModalProps) {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const getPerformanceMessage = () => {
    if (result.wpm >= 80) return "🔥 Outstanding!";
    if (result.wpm >= 60) return "⭐ Excellent!";
    if (result.wpm >= 40) return "👍 Good Job!";
    if (result.wpm >= 20) return "💪 Keep Practicing!";
    return "🌱 Great Start!";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-strong rounded-2xl p-8 max-w-2xl w-full"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold gradient-text">Session Complete!</h2>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes className="text-xl" />
          </motion.button>
        </div>

        {/* Performance Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            {getPerformanceMessage()}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <FaTrophy className="text-2xl text-yellow-400" />
              <p className="text-sm text-gray-300">Words Per Minute</p>
            </div>
            <p className="text-4xl font-bold text-white">{result.wpm}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-500/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <FaBullseye className="text-2xl text-cyan-400" />
              <p className="text-sm text-gray-300">Accuracy</p>
            </div>
            <p className="text-4xl font-bold text-white">{result.accuracy}%</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <FaKeyboard className="text-2xl text-green-400" />
              <p className="text-sm text-gray-300">Characters Typed</p>
            </div>
            <p className="text-2xl font-bold text-white">{result.totalChars}</p>
            <p className="text-xs text-gray-400 mt-1">
              {result.correctChars} correct, {result.incorrectChars} errors
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <FaClock className="text-2xl text-orange-400" />
              <p className="text-sm text-gray-300">Duration</p>
            </div>
            <p className="text-2xl font-bold text-white">{formatDuration(result.duration)}</p>
            <p className="text-xs text-gray-400 mt-1">
              CPM: {Math.round((result.correctChars / result.duration) * 60)}
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Accuracy Progress</span>
            <span>{result.accuracy}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${result.accuracy}%` }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="w-full btn-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Resetting automatically in 5 seconds...
        </p>
      </motion.div>
    </motion.div>
  );
}
