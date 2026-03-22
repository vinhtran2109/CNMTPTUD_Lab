const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productController = require('../controllers/productController');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({ storage });

router.get('/', productController.index);
router.get('/add', productController.add);
router.post('/add', upload.single('image'), productController.create);
router.get('/product/:id', productController.detail);
router.get('/edit/:id', productController.edit);
router.post('/edit/:id', upload.single('image'), productController.update);
router.delete('/delete/:id', productController.delete);

module.exports = router;
