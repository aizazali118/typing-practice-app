import { motion } from 'framer-motion';
import { FaKeyboard, FaGamepad, FaChartLine, FaRocket } from 'react-icons/fa';
import { Page } from '../App';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: <FaKeyboard className="text-5xl" />,
      title: 'Practice Mode',
      description: 'Improve your typing speed with timed sessions and real-time feedback',
      color: 'from-purple-500 to-pink-500',
      action: () => onNavigate('practice')
    },
    {
      icon: <FaGamepad className="text-5xl" />,
      title: 'Game Mode',
      description: 'Challenge yourself with falling words and beat your high score',
      color: 'from-cyan-500 to-blue-500',
      action: () => onNavigate('game')
    },
    {
      icon: <FaChartLine className="text-5xl" />,
      title: 'Track Progress',
      description: 'View detailed analytics and watch your improvement over time',
      color: 'from-green-500 to-emerald-500',
      action: () => onNavigate('progress')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaRocket className="text-7xl mx-auto mb-6 gradient-text float-animation" />
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="gradient-text">TypeMaster</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master the art of typing with our interactive practice sessions and fun games.
              Track your progress and become a typing champion!
            </p>
            <motion.button
              onClick={() => onNavigate('practice')}
              className="btn-primary text-xl px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Practicing Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center gradient-text mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Choose Your Path
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-hover cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={feature.action}
              >
                <div className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-3xl p-12">
            <motion.h2
              className="text-4xl font-bold text-center gradient-text mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why TypeMaster?
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: '30+', label: 'Practice Texts' },
                { number: '3', label: 'Difficulty Levels' },
                { number: '100%', label: 'Free to Use' },
                { number: '∞', label: 'Unlimited Practice' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-5xl font-bold gradient-text mb-2">{stat.number}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-strong rounded-3xl p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Ready to Level Up Your Typing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users improving their typing skills every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => onNavigate('practice')}
                className="btn-primary text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Practice
              </motion.button>
              <motion.button
                onClick={() => onNavigate('game')}
                className="btn-secondary text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Game
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
