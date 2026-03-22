const express = require('express');
const multer = require('multer');
const ctrl = require('../controllers/ProductController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Chỉ chấp nhận file ảnh'))
});

router
  .get('/', ctrl.index)
  .get('/add', ctrl.add)
  .post('/add', upload.single('image'), ctrl.create)
  .get('/product/:id', ctrl.detail)
  .get('/edit/:id', ctrl.edit)
  .post('/edit/:id', upload.single('image'), ctrl.update)
  .delete('/delete/:id', ctrl.delete);

module.exports = router;