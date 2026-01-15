const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

// Home
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products');
  res.render('products', { products: rows, editProduct: null });
});

// Add product
router.post('/add', async (req, res) => {
  const { name, price, quantity } = req.body;
  await db.query(
    'INSERT INTO products(name, price, quantity) VALUES (?, ?, ?)',
    [name, price, quantity]
  );
  res.redirect('/');
});

// Delete product
router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.redirect('/');
});

// Get product for edit
router.get('/edit/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products');
  const [editProduct] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  res.render('products', { products: rows, editProduct: editProduct[0] });
});

// Update product
router.post('/update/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  await db.query(
    'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
    [name, price, quantity, req.params.id]
  );
  res.redirect('/');
});

module.exports = router;
