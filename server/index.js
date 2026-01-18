import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting server...');
console.log(`Port: ${PORT}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Directory: ${__dirname}`);

app.use(cors());
app.use(express.json());

// Настройка email отправки
const createEmailTransporter = () => {
  // Для тестирования используем Ethereal (фейковый SMTP)
  // В продакшене замените на реальный SMTP (Gmail, Yandex, etc.)
  return nodemailer.createTransporter({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER || 'test@example.com',
      pass: process.env.ETHEREAL_PASS || 'test'
    }
  });
};

// Обслуживание статических файлов React (если они есть)
const distPath = path.join(__dirname, '..', 'dist');
try {
  // Проверяем, существует ли папка dist
  const fs = await import('fs/promises');
  await fs.access(distPath);
  console.log('✅ Dist folder found, serving static files');

  app.use(express.static(distPath));
} catch (error) {
  console.log('ℹ️ Dist folder not found, using fallback only');
}

// Health check
app.get('/health', (req, res) => {
  console.log('🏥 Health check called');
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    railway: process.env.RAILWAY_PROJECT_ID ? 'yes' : 'no'
  });
});

// API для заказов
const orders = [];
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);

    console.log('📝 New order received:');
    console.log('   Name:', newOrder.name);
    console.log('   Email:', newOrder.email);
    console.log('   Phone:', newOrder.phone);
    console.log('   Service:', newOrder.serviceName || 'Not specified');
    console.log('   Message:', newOrder.message);

    // Отправка email уведомления
    try {
      const transporter = createEmailTransporter();

      const mailOptions = {
        from: '"Dunets Website" <noreply@dunets.skillman.su>',
        to: 'dyni@mail.ru', // Email студии
        subject: `Новая заявка от ${newOrder.name}`,
        html: `
          <h2>Новая заявка с сайта Dunets</h2>
          <p><strong>Имя:</strong> ${newOrder.name}</p>
          <p><strong>Email:</strong> ${newOrder.email}</p>
          <p><strong>Телефон:</strong> ${newOrder.phone || 'Не указан'}</p>
          <p><strong>Услуга:</strong> ${newOrder.serviceName || 'Не указана'}</p>
          <p><strong>Сообщение:</strong></p>
          <p>${newOrder.message || 'Без сообщения'}</p>
          <hr>
          <p><em>Отправлено: ${new Date().toLocaleString('ru-RU')}</em></p>
        `,
        replyTo: newOrder.email
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('📧 Email sent successfully:', info.messageId);

      // Для Ethereal показываем ссылку на просмотр
      if (info.messageId && info.messageId.includes('ethereal')) {
        console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
      }

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      // Не ломаем API из-за проблем с email
    }

    res.status(201).json({
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      order: newOrder
    });

  } catch (error) {
    console.error('❌ Order processing error:', error);
    res.status(500).json({ error: 'Ошибка обработки заявки' });
  }
});

// API для услуг
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: '1',
      slug: 'veb-razrabotka',
      title: 'Веб-разработка',
      description: 'Создание современных веб-сайтов и веб-приложений',
      icon: 'code',
      fullDescription: 'Мы создаем современные веб-сайты и веб-приложения с использованием передовых технологий.',
      features: ['Анализ требований', 'Разработка', 'Тестирование'],
      priceRange: { min: 1500, max: 15000, currency: 'BYN', description: 'от 1 500 р. до 15 000 р.' }
    },
    {
      id: '2',
      slug: 'mobilnye-prilozheniya',
      title: 'Мобильные приложения',
      description: 'Разработка iOS и Android приложений',
      icon: 'mobile',
      fullDescription: 'Мы разрабатываем мобильные приложения для iOS и Android.',
      features: ['Нативная разработка', 'Кросс-платформенные решения'],
      priceRange: { min: 4500, max: 24000, currency: 'BYN', description: 'от 4 500 р. до 24 000 р.' }
    },
    {
      id: '3',
      slug: 'dizayn-ui-ux',
      title: 'Дизайн UI/UX',
      description: 'Проектирование удобных интерфейсов',
      icon: 'design',
      fullDescription: 'Мы создаем пользовательские интерфейсы.',
      features: ['Исследование аудитории', 'Проектирование интерфейсов'],
      priceRange: { min: 900, max: 6000, currency: 'BYN', description: 'от 900 р. до 6 000 р.' }
    }
  ];
  res.json(services);
});

// API для портфолио
app.get('/api/portfolio', (req, res) => {
  const portfolio = [
    {
      id: '1',
      title: 'Интернет-магазин',
      description: 'Современный e-commerce с интеграцией платежных систем',
      category: 'E-commerce',
      tags: ['React', 'Node.js', 'Stripe'],
      image: '/api/placeholder/400/300'
    },
    {
      id: '2',
      title: 'Корпоративный сайт',
      description: 'Представительский сайт для крупной компании',
      category: 'Business',
      tags: ['Vue.js', 'Tailwind CSS'],
      image: '/api/placeholder/400/300'
    },
    {
      id: '3',
      title: 'Мобильное приложение',
      description: 'iOS и Android приложение для управления задачами',
      category: 'Mobile',
      tags: ['React Native', 'Firebase'],
      image: '/api/placeholder/400/300'
    }
  ];
  res.json(portfolio);
});

// API для просмотра заказов (для администратора)
app.get('/api/orders', (req, res) => {
  // В продакшене добавьте аутентификацию!
  console.log('📋 Orders requested - total:', orders.length);
  res.json({
    total: orders.length,
    orders: orders.slice(-10) // Последние 10 заказов
  });
});

// SPA fallback
let hasStaticFiles = false;
try {
  const fs = await import('fs/promises');
  await fs.access(path.join(distPath, 'index.html'));
  hasStaticFiles = true;
  console.log('✅ index.html found');
} catch (error) {
  console.log('ℹ️ index.html not found, using fallback page');
}

app.get('*', (req, res) => {
  // Пропускаем API запросы
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return;
  }

  if (hasStaticFiles) {
    // Если есть статические файлы, возвращаем index.html
    try {
      res.sendFile(path.join(distPath, 'index.html'));
    } catch (error) {
      console.error('Error serving index.html:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // Если нет статических файлов, показываем fallback страницу
    res.send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dunets - Студия веб-разработки в Мозыре</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  text-align: center;
                  padding: 50px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  min-height: 100vh;
                  margin: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: rgba(255, 255, 255, 0.1);
                  padding: 40px;
                  border-radius: 20px;
                  backdrop-filter: blur(10px);
              }
              .loader {
                  border: 4px solid rgba(255, 255, 255, 0.3);
                  border-top: 4px solid white;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  animation: spin 2s linear infinite;
                  margin: 20px auto;
              }
              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
              h1 { margin-bottom: 10px; font-size: 2.5em; }
              p { margin: 10px 0; opacity: 0.8; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Dunets</h1>
              <div class="loader"></div>
              <p>Студия веб-разработки в Мозыре</p>
              <p>Приложение загружается...</p>
              <p>Если страница не загружается, попробуйте обновить.</p>
          </div>
      </body>
      </html>
    `);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.ETHEREAL_USER ? 'Enabled (Ethereal)' : 'Disabled'}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   POST /api/orders (with email notification)`);
  console.log(`   GET  /api/orders (admin view)`);
  console.log(`   GET  /api/services`);
});