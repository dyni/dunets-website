import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      console.log('🔄 Загрузка портфолио...');
      const response = await fetch('/api/portfolio');
      console.log('📡 Ответ API портфолио:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Портфолио загружено:', data.length, 'проектов');
      setPortfolio(data);
    } catch (error) {
      console.error('❌ Ошибка загрузки портфолио:', error);
      // Fallback данные
      setPortfolio([
        {
          id: '1',
          title: 'Интернет-магазин',
          description: 'Современный e-commerce с интеграцией платежных систем',
          category: 'E-commerce',
          tags: ['React', 'Node.js', 'Stripe']
        },
        {
          id: '2',
          title: 'Корпоративный сайт',
          description: 'Представительский сайт для крупной компании',
          category: 'Business',
          tags: ['Vue.js', 'Tailwind CSS']
        },
        {
          id: '3',
          title: 'Мобильное приложение',
          description: 'iOS и Android приложение для управления задачами',
          category: 'Mobile',
          tags: ['React Native', 'Firebase']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(portfolio.map(p => p.category))];
  const filteredPortfolio = selectedCategory === 'all' 
    ? portfolio 
    : portfolio.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наше <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">портфолио</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Примеры наших работ и успешных проектов
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'glass-strong text-white'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {category === 'all' ? 'Все' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-strong rounded-2xl overflow-hidden hover:shadow-2xl transition-all group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                  <div className="relative z-10 text-white text-4xl font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="glass p-3 rounded-full text-white"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="glass p-3 rounded-full text-white"
                    >
                      <Github className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-purple-400 mb-2">{item.category}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
