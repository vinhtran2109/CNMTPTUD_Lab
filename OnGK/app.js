const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.title = 'Quản lý sản phẩm';
  next();
});

// Routes
app.use('/', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send(err.message || 'Internal server error');
});

// 404 handling
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Initialize database and start server
const startServer = async () => {
  let retries = 0;
  const maxRetries = 10;

  const initDB = async () => {
    try {
      console.log('Initializing DynamoDB...');
      await Product.init();
      console.log('✅ DynamoDB initialized successfully');

      app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        console.log(`⏳ DynamoDB not ready. Retrying... (${retries}/${maxRetries})`);
        console.log(`   Error: ${error.message}`);
        setTimeout(initDB, 2000); // Retry after 2 seconds
      } else {
        console.error('❌ Failed to connect to DynamoDB after', maxRetries, 'attempts');
        process.exit(1);
      }
    }
  };

  initDB();
};

startServer();
