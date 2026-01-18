import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Контакты студии Dunets | Свяжитесь с нами для разработки сайта</title>
        <meta name="description" content="Свяжитесь с нами для обсуждения вашего проекта. Email, телефон, адрес офиса. Готовы ответить на ваши вопросы и начать сотрудничество." />
        <meta property="og:title" content="Контакты студии Dunets | Свяжитесь с нами" />
        <meta property="og:description" content="Свяжитесь с нами для обсуждения вашего проекта. Мы готовы ответить на вопросы и начать сотрудничество." />
        <meta property="og:type" content="website" />

        {/* Schema.org Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dunets",
            "alternateName": "Dunets Web Studio",
            "description": "Студия веб-разработки. Создание современных сайтов и приложений.",
            "url": "https://dunets.ru",
            "logo": "https://dunets.ru/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+7-999-123-45-67",
              "contactType": "customer service",
              "availableLanguage": "Russian"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Москва",
              "addressCountry": "RU"
            },
            "sameAs": [
              "https://github.com/dunets",
              "https://linkedin.com/company/dunets"
            ]
          })}
        </script>

        {/* Schema.org ContactPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Контакты студии Dunets",
            "description": "Свяжитесь с нами для обсуждения вашего проекта",
            "url": "https://dunets.ru/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Dunets",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+375-29-123-45-67",
                  "contactType": "customer service",
                  "contactOption": "TollFree",
                  "availableLanguage": "Russian",
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                },
                {
                  "@type": "ContactPoint",
                  "email": "info@dunets.ru",
                  "contactType": "customer service",
                  "availableLanguage": "Russian"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressRegion": "Москва",
                "addressCountry": "RU",
                "streetAddress": "ул. Примерная, д. 1"
              }
            }
          })}
        </script>

        {/* Schema.org LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://dunets.ru",
            "name": "Dunets Web Studio",
            "alternateName": "Dunets",
            "description": "Студия веб-разработки. Создание современных сайтов и приложений.",
            "url": "https://dunets.ru",
            "telephone": "+375-29-123-45-67",
            "email": "info@dunets.by",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск",
                "addressRegion": "Минск",
                "addressCountry": "BY",
                "streetAddress": "ул. Примерная, д. 1"
              },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 53.9045,
              "longitude": 27.5615
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "$$",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "currenciesAccepted": "RUB",
            "serviceType": [
              "Веб-разработка",
              "Мобильные приложения",
              "UI/UX дизайн",
              "SEO оптимизация"
            ],
            "areaServed": "RU",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50",
              "bestRating": "5",
              "worstRating": "1"
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
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
      </div>
    </>
  );
}
