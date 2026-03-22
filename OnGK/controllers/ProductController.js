const Product = require('../models/Product');

exports.index = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.render('index', { products, title: 'Danh sách sản phẩm' });
  } catch (error) {
    res.status(500).send(error.message || 'Lỗi tải danh sách sản phẩm');
  }
};

exports.add = (req, res) => {
  res.render('add', { title: 'Thêm sản phẩm' });
};

exports.create = async (req, res) => {
  try {
    const { name, price, unit_in_stock } = req.body;

    if (!name || !price || unit_in_stock === undefined) {
      return res.status(400).render('add', {
        title: 'Thêm sản phẩm',
        error: 'Vui lòng nhập đủ tên, giá và tồn kho.'
      });
    }

    const url_image = req.file ? `/uploads/${req.file.filename}` : '';

    await Product.create({
      name,
      price,
      unit_in_stock,
      url_image
    });

    res.redirect('/');
  } catch (error) {
    res.status(500).render('add', {
      title: 'Thêm sản phẩm',
      error: error.message || 'Không thể thêm sản phẩm.'
    });
  }
};

exports.detail = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);

    if (!product) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }

    res.render('detail', { product, title: 'Chi tiết sản phẩm' });
  } catch (error) {
    res.status(500).send(error.message || 'Lỗi xem chi tiết sản phẩm');
  }
};

exports.edit = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);

    if (!product) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }

    res.render('edit', { product, title: 'Sửa sản phẩm' });
  } catch (error) {
    res.status(500).send(error.message || 'Lỗi mở form sửa sản phẩm');
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit_in_stock } = req.body;
    const currentProduct = await Product.getById(id);

    if (!currentProduct) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }

    if (!name || !price || unit_in_stock === undefined) {
      return res.status(400).render('edit', {
        title: 'Sửa sản phẩm',
        product: currentProduct,
        error: 'Vui lòng nhập đủ tên, giá và tồn kho.'
      });
    }

    const payload = {
      name,
      price,
      unit_in_stock
    };

    if (req.file) {
      payload.url_image = `/uploads/${req.file.filename}`;
    }

    await Product.update(id, payload);
    res.redirect(`/product/${id}`);
  } catch (error) {
    res.status(500).send(error.message || 'Lỗi cập nhật sản phẩm');
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm' });
    }

    await Product.delete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
