import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaHeart, FaCode, FaRocket } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center gradient-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About TypeMaster
        </motion.h1>

        <motion.div
          className="glass-strong rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <FaRocket className="text-4xl text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            TypeMaster is a modern, interactive typing practice platform designed to help you improve
            your typing speed and accuracy through engaging practice sessions and fun games.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Whether you're a beginner learning the basics or an experienced typist aiming to reach new
            speeds, TypeMaster provides the tools and tracking you need to achieve your goals.
          </p>
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <FaCode className="text-4xl text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '⚡ Real-time character highlighting',
              '📊 Comprehensive analytics and charts',
              '🎮 Falling words game mode',
              '⏱️ Customizable timer durations',
              '📈 Progress tracking over time',
              '🎯 Multiple difficulty levels',
              '🎵 Background music support',
              '💾 LocalStorage data persistence'
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <span className="text-2xl">{feature.split(' ')[0]}</span>
                <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <FaHeart className="text-4xl text-pink-500" />
            <h2 className="text-3xl font-bold text-white">Developer</h2>
          </div>
          <p className="text-gray-300 text-lg mb-6">
            Built with passion and precision using modern web technologies:
            React, TypeScript, Tailwind CSS, and Framer Motion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="https://aizaz-ali-afridi-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt />
              <span>Visit Portfolio</span>
            </motion.a>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} TypeMaster. Created by{' '}
            <a
              href="https://aizaz-ali-afridi-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-pink-400 transition-colors"
            >
              Aizaz Ali Afridi
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with React + TypeScript + Tailwind CSS + Framer Motion
          </p>
        </motion.div>
      </div>
    </div>
  );
}
