import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Smartphone, Palette, ShoppingCart, Globe, BarChart, Send, CheckCircle, Loader } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const iconMap = {
  code: Code,
  mobile: Smartphone,
  design: Palette,
  ecommerce: ShoppingCart,
  web: Globe,
  analytics: BarChart
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceSlug: slug,
    serviceName: ''
  });

  useEffect(() => {
    // Прокрутка наверх при загрузке страницы
    window.scrollTo(0, 0);
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Запрос услуги со slug:', slug);
      const response = await fetch(`http://localhost:5000/api/services/${slug}`);
      console.log('Ответ сервера:', response.status, response.statusText);

      if (!response.ok) {
        if (response.status === 404) {
          setError(`Услуга "${slug}" не найдена`);
          console.error('Услуга не найдена:', slug);
        } else {
          setError(`Ошибка сервера: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }
      
      const data = await response.json();
      console.log('Данные услуги получены:', data);
      setService(data);
      setFormData(prev => ({ ...prev, serviceName: data.title, serviceSlug: data.slug }));
    } catch (error) {
      console.error('Ошибка загрузки услуги:', error);
      if (!error.message || !error.message.includes('HTTP')) {
        setError('Ошибка подключения к серверу. Убедитесь, что backend сервер запущен на порту 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          serviceId: id,
          serviceName: service.title
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Ошибка при отправке заявки');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="text-white mt-4">Загрузка услуги...</p>
          </div>
        </div>
      </>
    );
  }

  if (!loading && !service && error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4 flex items-center justify-center">
          <div className="text-center glass-strong rounded-3xl p-8 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Ошибка загрузки</h2>
            <p className="text-white/70 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold"
            >
              Вернуться к услугам
            </motion.button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!service && !loading) {
    return null;
  }

  const Icon = iconMap[service.icon] || Code;

  return (
    <>
      <Helmet>
        <title>{service.title} - Dunets | Заказать услугу</title>
        <meta name="description" content={service.description || `Заказать услугу ${service.title} в студии Dunets`} />

        {/* Schema.org Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dunets",
            "alternateName": "Dunets Web Studio",
            "description": "Студия веб-разработки. Создание современных сайтов и приложений.",
            "url": "https://dunets.skillman.su",
            "logo": "https://dunets.skillman.su/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+375-29-123-45-67",
              "contactType": "customer service",
              "availableLanguage": "Russian"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Мозырь",
              "addressCountry": "BY"
            },
            "sameAs": [
              "https://github.com/dunets",
              "https://linkedin.com/company/dunets"
            ]
          })}
        </script>

        {/* Schema.org Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "Organization",
              "name": "Dunets",
              "url": "https://dunets.skillman.su"
            },
            "serviceType": service.title,
            "areaServed": "RU",
            "offers": {
              "@type": "Offer",
              "priceCurrency": service.priceRange?.currency || "BYN",
              "priceRange": service.priceRange?.description,
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Dunets"
              }
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги веб-разработки",
              "itemListElement": service.features?.map((feature, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": feature,
                  "description": feature
                },
                "position": index + 1
              })) || []
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Фоновые эффекты */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <Header />
        
        <div className="pt-20 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {/* Назад */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/services')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Вернуться к услугам
            </motion.button>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Левая часть - Информация об услуге */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-strong rounded-3xl p-8 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-4">{service.title}</h1>
                  <p className="text-xl text-white/70 mb-6">{service.description}</p>
                  
                  {service.fullDescription && (
                    <div className="text-white/80 space-y-4">
                      <div dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
                    </div>
                  )}
                </div>

                {/* Цены */}
                {service.priceRange && (
                  <div className="glass-strong rounded-3xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Стоимость услуги</h2>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400 mb-2">
                        {service.priceRange.description}
                      </div>
                      <p className="text-white/70">
                        Цена зависит от сложности проекта и требований заказчика
                      </p>
                      <div className="mt-4 p-4 bg-white/10 rounded-xl">
                        <p className="text-sm text-white/80">
                          💡 Для точного расчета стоимости свяжитесь с нами для консультации
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Преимущества */}
                <div className="glass-strong rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Что включает услуга:</h2>
                  <ul className="space-y-4">
                    {(service.features || [
                      'Консультация и анализ требований',
                      'Разработка технического задания',
                      'Создание дизайн-макетов',
                      'Реализация проекта',
                      'Тестирование и оптимизация',
                      'Поддержка после запуска'
                    ]).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Правая часть - Форма заказа */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-strong rounded-3xl p-8 sticky top-24">
                  <h2 className="text-3xl font-bold text-white mb-2">Заказать услугу</h2>
                  <p className="text-white/70 mb-6">Заполните форму, и мы свяжемся с вами в ближайшее время</p>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-400 bg-green-400/20 px-4 py-3 rounded-xl mb-6"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Заявка отправлена! Мы свяжемся с вами в ближайшее время.</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Имя *</label>
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
                      <label className="block text-white/80 mb-2 font-medium">Email *</label>
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
                      <label className="block text-white/80 mb-2 font-medium">Телефон *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/50 border border-white/20 focus:border-purple-500 focus:outline-none transition-all bg-black/20"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Сообщение</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/50 border border-white/20 focus:border-purple-500 focus:outline-none transition-all resize-none bg-black/20"
                        placeholder="Расскажите о вашем проекте..."
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.05 }}
                      whileTap={{ scale: submitting ? 1 : 0.95 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Отправить заявку
                        </>
                      )}
                    </motion.button>

                    <p className="text-white/50 text-sm text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
