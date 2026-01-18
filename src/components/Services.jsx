import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, ShoppingCart, Globe, BarChart, Search, MessageCircle, Cloud, Link as LinkIcon, Users, MousePointer, Bug } from 'lucide-react';

const iconMap = {
  code: Code,
  mobile: Smartphone,
  design: Palette,
  search: Search,
  'shopping-cart': ShoppingCart,
  'message-circle': MessageCircle,
  'bar-chart-3': BarChart,
  cloud: Cloud,
  link: LinkIcon,
  users: Users,
  'mouse-pointer': MousePointer,
  bug: Bug,
  ecommerce: ShoppingCart,
  web: Globe,
  analytics: BarChart
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
      // Fallback данные
      setServices([
        {
          id: '1',
          title: 'Веб-разработка',
          description: 'Создание современных веб-сайтов и веб-приложений',
          icon: 'code'
        },
        {
          id: '2',
          title: 'Мобильные приложения',
          description: 'Разработка iOS и Android приложений',
          icon: 'mobile'
        },
        {
          id: '3',
          title: 'Дизайн UI/UX',
          description: 'Проектирование удобных интерфейсов',
          icon: 'design'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="services" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наши <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">услуги</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Полный спектр услуг для вашего цифрового присутствия
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <Link key={service.id} to={`/services/${service.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass-strong rounded-2xl p-8 hover:shadow-2xl transition-all group cursor-pointer h-full flex flex-col"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/70 flex-grow">{service.description}</p>
                    <div className="mt-auto text-purple-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                      Узнать подробнее →
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
