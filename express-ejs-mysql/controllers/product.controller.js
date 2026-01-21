const db = require('../db/mysql');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.render('products', { 
      products: rows, 
      editProduct: null,
      user: {
        username: req.session.username || 'User',
        fullname: req.session.fullname || req.session.username || 'User'
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  
  try {
    await db.query(
      'INSERT INTO products(name, price, quantity) VALUES (?, ?, ?)',
      [name, price, quantity]
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product');
  }
};

// Get product for edit
exports.getEditProduct = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    const [editProduct] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    
    res.render('products', { 
      products: rows, 
      editProduct: editProduct[0] || null,
      user: {
        username: req.session.username || 'User',
        fullname: req.session.fullname || req.session.username || 'User'
      }
    });
  } catch (error) {
    console.error('Error fetching product for edit:', error);
    res.status(500).send('Error fetching product');
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  
  try {
    await db.query(
      'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
      [name, price, quantity, req.params.id]
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product');
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
};
