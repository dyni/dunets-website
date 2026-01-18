import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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
app.post('/api/orders', (req, res) => {
  try {
    const newOrder = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    console.log('📝 New order:', newOrder.name, newOrder.email);
    res.status(201).json({ message: 'Заявка успешно отправлена', order: newOrder });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API для услуг
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: '1',
      slug: 'veb-razrabotka',
      title: 'Веб-разработка',
      description: 'Создание современных веб-сайтов',
      icon: 'code',
      priceRange: { min: 1500, max: 15000, currency: 'BYN', description: 'от 1 500 р. до 15 000 р.' }
    }
  ];
  res.json(services);
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
  console.log(`📡 Available endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   POST /api/orders`);
  console.log(`   GET  /api/services`);
});