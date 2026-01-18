import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Услуги студии Dunets | Веб-разработка, мобильные приложения, дизайн</title>
        <meta name="description" content="Полный спектр услуг веб-разработки: создание сайтов, мобильных приложений, UI/UX дизайн, интернет-магазины. Современные технологии и профессиональный подход." />
        <meta property="og:title" content="Услуги студии Dunets | Веб-разработка и дизайн" />
        <meta property="og:description" content="Веб-разработка, мобильные приложения, дизайн интерфейсов. Комплексные решения для вашего цифрового присутствия." />
        <meta property="og:type" content="website" />

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

        {/* Schema.org Service Catalog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Услуги студии Dunets",
            "description": "Полный каталог услуг веб-разработки",
            "url": "https://dunets.skillman.su/services",
            "numberOfItems": 12,
            "itemListElement": [
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/1",
                "name": "Веб-разработка",
                "description": "Создание современных веб-сайтов и веб-приложений",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "Web Development",
                "areaServed": "BY",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "RUB",
                  "availability": "https://schema.org/InStock"
                }
              },
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/2",
                "name": "Мобильные приложения",
                "description": "Разработка iOS и Android приложений",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "Mobile App Development",
                "areaServed": "BY"
              },
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/3",
                "name": "Дизайн UI/UX",
                "description": "Проектирование удобных интерфейсов",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "UI/UX Design",
                "areaServed": "BY"
              },
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/4",
                "name": "SEO-оптимизация",
                "description": "Повышение видимости сайта в поисковых системах",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "SEO Optimization",
                "areaServed": "BY"
              },
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/5",
                "name": "Интернет-магазины",
                "description": "Создание полнофункциональных онлайн-магазинов",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "E-commerce Development",
                "areaServed": "BY"
              },
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/11",
                "name": "Контекстная реклама",
                "description": "Настройка и ведение рекламных кампаний",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "PPC Advertising",
                "areaServed": "BY"
              },
              {
                "@type": "Service",
                "@id": "https://dunets.skillman.su/services/12",
                "name": "Анализ кода",
                "description": "Поиск ошибок и оптимизация кода",
                "provider": {
                  "@type": "Organization",
                  "name": "Dunets"
                },
                "serviceType": "Code Analysis & Debugging",
                "areaServed": "BY"
              }
            ]
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
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
      </div>
    </>
  );
}
