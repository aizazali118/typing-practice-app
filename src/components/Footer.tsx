import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com', // Replace with your GitHub
      icon: <FaGithub /> 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', // Replace with your LinkedIn
      icon: <FaLinkedin /> 
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com', // Replace with your Twitter
      icon: <FaTwitter /> 
    }
  ];

  return (
    <footer className="glass-strong mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">TypeMaster</h3>
            <p className="text-gray-400 text-sm">
              Master your typing skills with practice and games
            </p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Connect</h4>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Developer Portfolio */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Developer</h4>
            <motion.a
              href="https://aizaz-ali-afridi-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">View Portfolio</span>
              <FaExternalLinkAlt className="text-xs" />
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            Made with <FaHeart className="mx-2 text-pink-500" /> by{' '}
            <a
              href="https://aizaz-ali-afridi-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-purple-400 hover:text-pink-400 transition-colors"
            >
              Aizaz Ali Afridi
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} TypeMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
