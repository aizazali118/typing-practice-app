import { motion } from 'framer-motion';
import { Page } from '../App';
import { useAuth } from '../context/AuthContext';
import { FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({ currentPage, onNavigate, onOpenSettings, onOpenAuth }: NavbarProps) {
  const { user, logout, isAuthenticated } = useAuth();

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'practice', label: 'Practice' },
    { page: 'game', label: 'Game' },
    { page: 'progress', label: 'Progress' },
    { page: 'about', label: 'About' }
  ];

  return (
    <motion.nav
      className="glass-strong sticky top-0 z-50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl font-bold gradient-text">TypeMaster</h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === item.page
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* User & Settings */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-sm text-gray-300 hidden sm:block">
                  {user?.name}
                </span>
                <motion.button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Logout"
                >
                  <FaSignOutAlt className="text-gray-300" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                onClick={onOpenAuth}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Login"
              >
                <FaUser className="text-gray-300" />
              </motion.button>
            )}
            
            <motion.button
              onClick={onOpenSettings}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              title="Settings"
            >
              <FaCog className="text-gray-300" />
            </motion.button>
          </div>

          {/* Mobile Menu (simplified) */}
          <div className="md:hidden">
            <select
              value={currentPage}
              onChange={(e) => onNavigate(e.target.value as Page)}
              className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/20"
            >
              {navItems.map((item) => (
                <option key={item.page} value={item.page} className="bg-slate-800">
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
