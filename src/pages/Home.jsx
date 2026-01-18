import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dunets - Студия веб-разработки | Создание современных сайтов</title>
        <meta name="description" content="Профессиональная разработка веб-сайтов и приложений. Создаём современные цифровые решения для вашего бизнеса с использованием передовых технологий." />
        <meta property="og:title" content="Dunets - Студия веб-разработки" />
        <meta property="og:description" content="Профессиональная разработка веб-сайтов и приложений. Создаём современные цифровые решения для вашего бизнеса." />
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
              "telephone": "+375-29-123-45-67",
              "contactType": "customer service",
              "availableLanguage": "Russian"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Минск",
              "addressCountry": "BY"
            },
            "sameAs": [
              "https://github.com/dunets",
              "https://linkedin.com/company/dunets"
            ],
            "foundingDate": "2020",
            "knowsAbout": [
              "Веб-разработка",
              "Мобильные приложения",
              "UI/UX дизайн",
              "SEO оптимизация"
            ]
          })}
        </script>

        {/* Schema.org WebSite */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dunets - Студия веб-разработки",
            "url": "https://dunets.ru",
            "description": "Профессиональная разработка веб-сайтов и приложений",
            "publisher": {
              "@type": "Organization",
              "name": "Dunets"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://dunets.ru/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
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
      <Hero />
      <AboutSection />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
      </div>
    </>
  );
}
