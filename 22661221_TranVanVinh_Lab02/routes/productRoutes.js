const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productController = require('../controllers/productController');

// Đảm bảo thư mục uploads tồn tại
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cấu hình multer để upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        // Cho phép tất cả các file ảnh phổ biến
        const allowedMimes = [
            'image/jpeg',
            'image/jpg', 
            'image/png',
            'image/gif',
            'image/webp',
            'image/bmp',
            'image/jfif'  // Hỗ trợ JFIF
        ];
        
        // Kiểm tra extension cho các file JFIF
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.jfif'];
        
        if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
            cb(null, true);
        } else {
            cb(null, false); // Bỏ qua file không hợp lệ thay vì throw error
        }
    }
});

// Routes
router.get('/', productController.getAllProducts);
router.get('/add', productController.showAddProductForm);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/edit/:id', productController.showEditProductForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
