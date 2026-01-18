import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Target,
      title: 'Целевой подход',
      description: 'Каждый проект разрабатывается с учётом ваших бизнес-целей',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Команда экспертов',
      description: 'Опытные разработчики и дизайнеры в одном месте',
      color: 'pink'
    },
    {
      icon: Award,
      title: 'Качество',
      description: 'Используем только проверенные технологии и лучшие практики',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Скорость',
      description: 'Быстрая разработка без потери качества',
      color: 'yellow'
    }
  ];

  return (
    <section id="about" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            О студии <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dunets</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Мы — команда профессионалов, создающая цифровые решения, которые помогают бизнесу расти и достигать новых высот
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-strong rounded-2xl p-6 hover:shadow-2xl transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
