import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Palette, Rocket } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    // Если на другой странице, переходим на страницу контактов
    if (window.location.pathname !== '/contact') {
      window.location.href = '/contact';
    } else {
      // Если уже на странице контактов, просто прокручиваем
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            {/* ТЕСТОВАЯ СТРОКА ДЛЯ ПРОВЕРКИ АВТОМАТИЧЕСКОГО ДЕПЛОЯ */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl mb-6 text-lg font-bold animate-pulse">
              🚀 ТЕСТ: Автоматический деплой Railway работает! Время: {new Date().toLocaleString('ru-RU')}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white/90 text-sm">Современная веб-разработка</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Создаём сайты
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                которые работают
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/70 mb-8 max-w-xl"
            >
              Профессиональная разработка веб-сайтов и приложений с использованием современных технологий и лучших практик дизайна.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Начать проект
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-strong rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all inline-block text-center"
              >
                Портфолио
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <div>
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-white/60 text-sm">Проектов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">30+</div>
                <div className="text-white/60 text-sm">Клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">5+</div>
                <div className="text-white/60 text-sm">Лет опыта</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-2 border-pink-500/30 rounded-full"
              ></motion.div>
              
              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 left-10 glass-strong p-6 rounded-2xl"
              >
                <Code className="w-12 h-12 text-purple-400" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-32 right-10 glass-strong p-6 rounded-2xl"
              >
                <Palette className="w-12 h-12 text-pink-400" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 glass-strong p-6 rounded-2xl"
              >
                <Rocket className="w-12 h-12 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
