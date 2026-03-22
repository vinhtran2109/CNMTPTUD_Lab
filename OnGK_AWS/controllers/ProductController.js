const Product = require('../models/Product');
const { uploadBuffer, deleteByUrl } = require('../config/s3');

const ok = ({ name, price, unit_in_stock }) => name && price && unit_in_stock !== undefined;

const upload = (f) => f ? uploadBuffer(f.buffer, f.originalname, f.mimetype) : '';

const get = async (res, id) => {
  const p = await Product.getById(id);
  if (!p) return res.status(404).send('Không tìm thấy sản phẩm'), null;
  return p;
};

const wrap = (fn) => (req, res) => fn(req, res).catch(e => res.status(500).send(e.message));

exports.index = wrap(async (req, res) =>
  res.render('index', { products: await Product.getAll(), title: 'Danh sách sản phẩm' })
);

exports.add = (req, res) => res.render('add', { title: 'Thêm sản phẩm' });

exports.create = wrap(async (req, res) => {
  if (!ok(req.body))
    return res.status(400).render('add', { title: 'Thêm sản phẩm', error: 'Thiếu dữ liệu' });

  await Product.create({
    ...req.body,
    url_image: await upload(req.file)
  });

  res.redirect('/');
});

exports.detail = wrap(async (req, res) => {
  const p = await get(res, req.params.id);
  if (p) res.render('detail', { product: p, title: 'Chi tiết sản phẩm' });
});

exports.edit = wrap(async (req, res) => {
  const p = await get(res, req.params.id);
  if (p) res.render('edit', { product: p, title: 'Sửa sản phẩm' });
});

exports.update = wrap(async (req, res) => {
  const { id } = req.params;
  const cur = await get(res, id);
  if (!cur) return;

  if (!ok(req.body))
    return res.status(400).render('edit', { title: 'Sửa sản phẩm', product: cur, error: 'Thiếu dữ liệu' });

  const payload = { ...req.body };

  if (req.file) {
    payload.url_image = await upload(req.file);
    if (cur.url_image) await deleteByUrl(cur.url_image);
  }

  await Product.update(id, payload);
  res.redirect(`/product/${id}`);
});

exports.delete = wrap(async (req, res) => {
  const p = await Product.getById(req.params.id);
  if (!p) return res.status(404).json({ success: false });

  if (p.url_image) await deleteByUrl(p.url_image);
  await Product.delete(req.params.id);

  res.json({ success: true });
});