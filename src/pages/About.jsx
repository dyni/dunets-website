import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AboutSection from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>О студии Dunets | Наша команда и опыт разработки</title>
        <meta name="description" content="Узнайте больше о студии Dunets - команде профессионалов, создающей цифровые решения для бизнеса. Более 5 лет опыта, 50+ успешных проектов." />
        <meta property="og:title" content="О студии Dunets | Наша команда и опыт" />
        <meta property="og:description" content="Команда профессионалов студии Dunets с опытом разработки более 50 проектов. Современные технологии и индивидуальный подход." />
        <meta property="og:type" content="website" />

        {/* Schema.org Organization (extended) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dunets",
            "alternateName": "Dunets Web Studio",
            "description": "Студия веб-разработки. Создание современных сайтов и приложений.",
            "url": "https://dunets.skillman.su",
            "logo": "https://dunets.skillman.su/logo.png",
            "foundingDate": "2020",
            "numberOfEmployees": "10-20",
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
            ],
            "knowsAbout": [
              "Веб-разработка",
              "Мобильные приложения",
              "UI/UX дизайн",
              "SEO оптимизация",
              "Интернет-магазины",
              "SMM маркетинг"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги веб-разработки",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Веб-разработка",
                    "description": "Создание современных веб-сайтов и приложений"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Мобильные приложения",
                    "description": "Разработка iOS и Android приложений"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX дизайн",
                    "description": "Проектирование удобных интерфейсов"
                  }
                }
              ]
            }
          })}
        </script>

        {/* Schema.org AboutPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "О студии Dunets",
            "description": "Информация о команде профессионалов студии Dunets",
            "url": "https://dunets.skillman.su/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Dunets",
              "description": "Студия веб-разработки с опытом более 5 лет"
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
        <AboutSection />
      </div>
      <Footer />
      </div>
    </>
  );
}
