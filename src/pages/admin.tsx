import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaSignOutAlt, FaTrash, FaDownload } from 'react-icons/fa';

interface UserLogin {
  username: string;
  email: string;
  timestamp: string;
}

const ADMIN_PASSWORD = '1217';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logins, setLogins] = useState<UserLogin[]>([]);

  // Load logins from localStorage
  useEffect(() => {
    const savedLogins = localStorage.getItem('userLogins');
    if (savedLogins) {
      setLogins(JSON.parse(savedLogins));
    }
  }, []);

  // Check if already authenticated
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setPassword('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
  };

  const handleDeleteLogin = (index: number) => {
    const newLogins = logins.filter((_, i) => i !== index);
    setLogins(newLogins);
    localStorage.setItem('userLogins', JSON.stringify(newLogins));
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all user logins?')) {
      setLogins([]);
      localStorage.removeItem('userLogins');
    }
  };

  const handleDownloadCSV = () => {
    if (logins.length === 0) {
      alert('No data to download');
      return;
    }

    const headers = ['Username', 'Email', 'Login Time'];
    const rows = logins.map(login => [login.username, login.email, login.timestamp]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `user_logins_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="glass-strong rounded-2xl p-8 max-w-md w-full"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-6">
            <FaLock className="text-4xl gradient-text" />
          </div>
          <h1 className="text-3xl font-bold text-center gradient-text mb-2">Admin Panel</h1>
          <p className="text-gray-400 text-center mb-6">Enter admin password to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-400"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="w-full btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login to Admin
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-gray-400 mt-2">User Login Management</p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass-strong rounded-xl p-6">
            <p className="text-gray-400 text-sm">Total Logins</p>
            <p className="text-4xl font-bold gradient-text mt-2">{logins.length}</p>
          </div>
          <div className="glass-strong rounded-xl p-6">
            <p className="text-gray-400 text-sm">Unique Users</p>
            <p className="text-4xl font-bold gradient-text mt-2">
              {new Set(logins.map(l => l.email)).size}
            </p>
          </div>
          <div className="glass-strong rounded-xl p-6">
            <p className="text-gray-400 text-sm">Last Login</p>
            <p className="text-lg font-bold text-purple-300 mt-2">
              {logins.length > 0 ? new Date(logins[logins.length - 1].timestamp).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={handleDownloadCSV}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={logins.length === 0}
          >
            <FaDownload /> Download CSV
          </motion.button>
          <motion.button
            onClick={handleDeleteAll}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={logins.length === 0}
          >
            <FaTrash /> Delete All
          </motion.button>
        </motion.div>

        {/* User Logins Table */}
        <motion.div
          className="glass-strong rounded-xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="bg-white/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Login Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {logins.length > 0 ? (
                  logins.map((login, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-white font-medium">{login.username}</td>
                      <td className="px-6 py-4 text-gray-300">{login.email}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{login.timestamp}</td>
                      <td className="px-6 py-4">
                        <motion.button
                          onClick={() => handleDeleteLogin(index)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash size={16} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                      No user logins yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Info */}
        <motion.p
          className="text-gray-500 text-sm text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Admin password: <span className="font-mono text-purple-400">1217</span> (change in code for production)
        </motion.p>
      </div>
    </motion.div>
  );
}
