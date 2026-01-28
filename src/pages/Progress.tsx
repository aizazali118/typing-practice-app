import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaTrophy, FaBullseye, FaKeyboard, FaClock, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

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

export default function Progress() {
  const { user } = useAuth();
  const [results, setResults] = useState<SessionResult[]>([]);

  useEffect(() => {
    loadResults();
  }, [user]);

  const loadResults = () => {
    const storageKey = user ? `results_${user.email}` : 'results_guest';
    const savedResults = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setResults(savedResults);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      const storageKey = user ? `results_${user.email}` : 'results_guest';
      localStorage.removeItem(storageKey);
      setResults([]);
    }
  };

  // Calculate stats
  const stats = {
    totalSessions: results.length,
    bestWPM: results.length > 0 ? Math.max(...results.map(r => r.wpm)) : 0,
    avgWPM: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length) : 0,
    bestAccuracy: results.length > 0 ? Math.max(...results.map(r => r.accuracy)) : 0,
    avgAccuracy: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length * 10) / 10 : 0,
    totalCharsTyped: results.reduce((sum, r) => sum + r.totalChars, 0)
  };

  // Prepare chart data (last 10 sessions)
  const chartData = results.slice(-10).map((result, index) => ({
    session: `#${results.length - 9 + index}`,
    WPM: result.wpm,
    Accuracy: result.accuracy,
    date: new Date(result.date).toLocaleDateString()
  }));

  // Improvement calculation
  const getImprovement = () => {
    if (results.length < 2) return { wpm: 0, accuracy: 0 };
    
    const recent = results.slice(-5);
    const older = results.slice(-10, -5);
    
    if (older.length === 0) return { wpm: 0, accuracy: 0 };
    
    const recentAvgWPM = recent.reduce((sum, r) => sum + r.wpm, 0) / recent.length;
    const olderAvgWPM = older.reduce((sum, r) => sum + r.wpm, 0) / older.length;
    
    const recentAvgAcc = recent.reduce((sum, r) => sum + r.accuracy, 0) / recent.length;
    const olderAvgAcc = older.reduce((sum, r) => sum + r.accuracy, 0) / older.length;
    
    return {
      wpm: Math.round(recentAvgWPM - olderAvgWPM),
      accuracy: Math.round((recentAvgAcc - olderAvgAcc) * 10) / 10
    };
  };

  const improvement = getImprovement();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center gradient-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Progress
        </motion.h1>

        {results.length === 0 ? (
          <motion.div
            className="glass-strong rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaKeyboard className="text-6xl text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Practice Sessions Yet</h2>
            <p className="text-gray-400">Complete your first practice session to see your progress here!</p>
          </motion.div>
        ) : (
          <>
            {/* Stats Overview */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaClock className="text-purple-400" />
                  <p className="text-sm text-gray-400">Sessions</p>
                </div>
                <p className="text-3xl font-bold text-white">{stats.totalSessions}</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaTrophy className="text-yellow-400" />
                  <p className="text-sm text-gray-400">Best WPM</p>
                </div>
                <p className="text-3xl font-bold text-white">{stats.bestWPM}</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaKeyboard className="text-green-400" />
                  <p className="text-sm text-gray-400">Avg WPM</p>
                </div>
                <p className="text-3xl font-bold text-white">{stats.avgWPM}</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaBullseye className="text-cyan-400" />
                  <p className="text-sm text-gray-400">Best Acc</p>
                </div>
                <p className="text-3xl font-bold text-white">{stats.bestAccuracy}%</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaBullseye className="text-blue-400" />
                  <p className="text-sm text-gray-400">Avg Acc</p>
                </div>
                <p className="text-3xl font-bold text-white">{stats.avgAccuracy}%</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaKeyboard className="text-pink-400" />
                  <p className="text-sm text-gray-400">Total Chars</p>
                </div>
                <p className="text-2xl font-bold text-white">{stats.totalCharsTyped.toLocaleString()}</p>
              </div>
            </motion.div>

            {/* Improvement Section */}
            {results.length >= 5 && (
              <motion.div
                className="glass-strong rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold gradient-text mb-4">Recent Improvement</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className={`text-4xl font-bold ${improvement.wpm >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {improvement.wpm >= 0 ? '+' : ''}{improvement.wpm}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">WPM Change</p>
                      <p className="text-gray-500 text-xs">Last 5 vs Previous 5 sessions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`text-4xl font-bold ${improvement.accuracy >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {improvement.accuracy >= 0 ? '+' : ''}{improvement.accuracy}%
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Accuracy Change</p>
                      <p className="text-gray-500 text-xs">Last 5 vs Previous 5 sessions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="glass-strong rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">WPM Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="session" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(167,139,250,0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="WPM" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#a78bfa', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                className="glass-strong rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Accuracy Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="session" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(6,182,212,0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Accuracy" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Session History */}
            <motion.div
              className="glass-strong rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Session History</h3>
                <motion.button
                  onClick={clearHistory}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrash />
                  <span>Clear History</span>
                </motion.button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">WPM</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Accuracy</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Characters</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...results].reverse().map((result, index) => (
                      <motion.tr
                        key={result.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(result.date).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-purple-400 font-bold">{result.wpm}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-cyan-400 font-bold">{result.accuracy}%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          <span className="text-green-400">{result.correctChars}</span>
                          {' / '}
                          <span className="text-red-400">{result.incorrectChars}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {result.duration < 60 ? `${result.duration}s` : `${Math.floor(result.duration / 60)}m`}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
