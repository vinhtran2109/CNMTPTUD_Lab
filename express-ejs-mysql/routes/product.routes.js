const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { requireAuth } = require('../middleware/auth');

// All product routes require authentication
router.get('/', requireAuth, productController.getAllProducts);
router.post('/add', requireAuth, productController.addProduct);
router.get('/edit/:id', requireAuth, productController.getEditProduct);
router.post('/update/:id', requireAuth, productController.updateProduct);
router.get('/delete/:id', requireAuth, productController.deleteProduct);

module.exports = router;
