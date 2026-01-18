import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку на сервер
    console.log('Форма отправлена:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Свяжитесь <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">с нами</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Готовы начать ваш проект? Давайте обсудим детали
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-white/70">info@dunets.skillman.su</p>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Телефон</h3>
                  <p className="text-white/70">+7 (999) 123-45-67</p>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Адрес</h3>
                  <p className="text-white/70">Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 space-y-6">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 bg-green-400/20 px-4 py-3 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</span>
                </motion.div>
              )}

              <div>
                <label className="block text-white/80 mb-2 font-medium">Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/50 border border-white/20 focus:border-purple-500 focus:outline-none transition-all bg-black/20"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/50 border border-white/20 focus:border-purple-500 focus:outline-none transition-all bg-black/20"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">Сообщение</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/50 border border-white/20 focus:border-purple-500 focus:outline-none transition-all resize-none bg-black/20"
                  placeholder="Расскажите о вашем проекте..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Отправить сообщение
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
