import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Github, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const menuItems = [
    { name: 'Главная', path: '/' },
    { name: 'О нас', path: '/about' },
    { name: 'Услуги', path: '/services' },
    { name: 'Портфолио', path: '/portfolio' },
    { name: 'Контакты', path: '/contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white">Dunets</span>
            </div>
            <p className="text-white/60">
              Студия веб-разработки. Создаём сайты и приложения, которые помогают бизнесу расти.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-white/60">
              <li>info@dunets.by</li>
              <li>+375 (29) 123-45-67</li>
              <li>Мозырь, ул. Примерная, д. 1</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2026 Dunets Web Studio. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
