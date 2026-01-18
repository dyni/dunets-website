import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DATA_DIR = path.join(__dirname, '..', 'data');

// Создаем папку data если её нет
await fs.mkdir(DATA_DIR, { recursive: true });

app.use(cors());
app.use(express.json());

// Инициализация базы данных
async function initDatabase() {
  const portfolioPath = path.join(DATA_DIR, 'portfolio.json');
  const servicesPath = path.join(DATA_DIR, 'services.json');
  const testimonialsPath = path.join(DATA_DIR, 'testimonials.json');
  
  try {
    await fs.access(portfolioPath);
  } catch {
    // Примеры портфолио
    const defaultPortfolio = [
      {
        id: '1',
        title: 'Интернет-магазин',
        description: 'Современный e-commerce с интеграцией платежных систем',
        image: '/api/placeholder/400/300',
        category: 'E-commerce',
        tags: ['React', 'Node.js', 'Stripe']
      },
      {
        id: '2',
        title: 'Корпоративный сайт',
        description: 'Представительский сайт для крупной компании',
        image: '/api/placeholder/400/300',
        category: 'Business',
        tags: ['Vue.js', 'Tailwind CSS']
      }
    ];
    await fs.writeFile(portfolioPath, JSON.stringify(defaultPortfolio, null, 2));
  }
  
  try {
    await fs.access(servicesPath);
  } catch {
    const defaultServices = [
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
    ];
    await fs.writeFile(servicesPath, JSON.stringify(defaultServices, null, 2));
  }
  
  try {
    await fs.access(testimonialsPath);
  } catch {
    await fs.writeFile(testimonialsPath, JSON.stringify([], null, 2));
  }
}

// API для портфолио
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolioPath = path.join(DATA_DIR, 'portfolio.json');
    const data = await fs.readFile(portfolioPath, 'utf-8');
    const portfolio = JSON.parse(data);
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API для услуг
app.get('/api/services', async (req, res) => {
  try {
    const servicesPath = path.join(DATA_DIR, 'services.json');
    const data = await fs.readFile(servicesPath, 'utf-8');
    const services = JSON.parse(data);
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить одну услугу по slug
app.get('/api/services/:slug', async (req, res) => {
  try {
    const servicesPath = path.join(DATA_DIR, 'services.json');
    const data = await fs.readFile(servicesPath, 'utf-8');
    const services = JSON.parse(data);

    // Логируем для отладки
    console.log(`Поиск услуги со slug: "${req.params.slug}"`);
    console.log(`Все услуги:`, services.map(s => ({ id: s.id, slug: s.slug, title: s.title })));

    // Ищем услугу по slug
    const service = services.find(s => s.slug === req.params.slug);

    if (!service) {
      console.log(`Услуга со slug "${req.params.slug}" не найдена. Доступные slug:`, services.map(s => s.slug));
      return res.status(404).json({ error: 'Услуга не найдена' });
    }

    console.log(`Услуга найдена:`, service.title);
    res.json(service);
  } catch (error) {
    console.error('Ошибка при получении услуги:', error);
    res.status(500).json({ error: error.message });
  }
});

// Сохранить заявку на услугу
app.post('/api/orders', async (req, res) => {
  try {
    const ordersPath = path.join(DATA_DIR, 'orders.json');
    let orders = [];
    
    try {
      const data = await fs.readFile(ordersPath, 'utf-8');
      orders = JSON.parse(data);
    } catch {
      // Файл не существует, создадим новый
    }
    
    const newOrder = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
    
    res.status(201).json({ message: 'Заявка успешно отправлена', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API для отзывов
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonialsPath = path.join(DATA_DIR, 'testimonials.json');
    const data = await fs.readFile(testimonialsPath, 'utf-8');
    const testimonials = JSON.parse(data);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.path} не найден` });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Обслуживание статических файлов React приложения
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
console.log(`🚀 Starting server...`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Railway Environment: ${process.env.RAILWAY_ENVIRONMENT}`);
console.log(`Railway Project ID: ${process.env.RAILWAY_PROJECT_ID}`);
console.log(`Current directory: ${__dirname}`);

const distPath = path.join(__dirname, '..', 'dist');
console.log(`Dist path: ${distPath}`);

if (isProduction) {
  try {
    // Проверяем, существует ли папка dist
    const fs = await import('fs/promises');
    await fs.access(distPath);
    console.log('✅ Dist folder exists');

    // Проверяем index.html
    await fs.access(path.join(distPath, 'index.html'));
    console.log('✅ index.html found');

    // Обслуживаем статические файлы
    app.use(express.static(distPath));
    console.log('✅ Static files serving configured');

    // Fallback для SPA
    app.get('*', (req, res) => {
      // Пропускаем API запросы
      if (req.path.startsWith('/api/') || req.path === '/health') {
        return;
      }

      try {
        res.sendFile(path.join(distPath, 'index.html'));
      } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    console.log('✅ SPA fallback configured');
  } catch (error) {
    console.error('❌ Error configuring static files:', error);
    console.log('This might be normal if running in development mode');
  }
} else {
  console.log('ℹ️ Running in development mode - static files not served');
}

// Запуск сервера
await initDatabase();
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📡 Доступные API:`);
  console.log(`   GET /api/services`);
  console.log(`   GET /api/services/:id`);
  console.log(`   GET /api/portfolio`);
  console.log(`   POST /api/orders`);
  if (isProduction) {
    console.log(`🌐 Статические файлы обслуживаются из dist/`);
    console.log(`🔄 SPA fallback настроен`);
  }
});
