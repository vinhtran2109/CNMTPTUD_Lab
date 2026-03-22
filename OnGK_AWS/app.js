const express = require('express');
const path = require('path');
require('dotenv').config();
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => ((res.locals.title = 'Quan ly san pham'), next()));
app.use('/', productRoutes);

app.use((err, req, res, next) => res.status(500).send(err.message || 'Internal server error'));
app.use((req, res) => res.status(404).send('Not found'));

const startServer = async (retries = 10) => {
  try {
    await Product.init();
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (err) {
    if (retries === 0) {
      console.error('DynamoDB failed:', err.message);
      process.exit(1);
    }
    console.log('Retrying...', err.message);
    setTimeout(() => startServer(retries - 1), 2000);
  }
};

startServer();