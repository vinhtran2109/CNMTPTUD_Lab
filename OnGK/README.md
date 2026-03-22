# 📦 Hệ thống quản lý sản phẩm

Ứng dụng web quản lý sản phẩm đơn giản được xây dựng với **Node.js**, **Express**, **EJS**, và **DynamoDB Local** (chạy trên Docker).

## 🎯 Tính năng

✅ **Quản lý sản phẩm**
- Xem danh sách sản phẩm dưới dạng bảng
- Thêm sản phẩm mới (có upload ảnh)
- Sửa thông tin sản phẩm (có thay đổi ảnh)
- Xóa sản phẩm
- Xem chi tiết sản phẩm

📷 **Xử lý ảnh**
- Hỗ trợ định dạng: JPEG, PNG, GIF, WebP
- Lưu ảnh vào thư mục `/public/uploads/`
- Đường dẫn ảnh được lưu trong DynamoDB
- Giới hạn dung lượng: 5MB

🗄️ **Cơ sở dữ liệu**
- DynamoDB Local trên Docker
- Bảng `Products` với các trường: `id`, `name`, `price`, `unit_in_stock`, `url_image`

## 🏗️ Cấu trúc dự án

```
├── config/
│   └── dynamodb.js          # Cấu hình DynamoDB
├── controllers/
│   └── productController.js # Xử lý logic CRUD
├── models/
│   └── Product.js           # Model dữ liệu
├── public/
│   ├── css/
│   │   └── style.css        # CSS styling
│   └── uploads/             # Thư mục lưu ảnh sản phẩm
├── routes/
│   └── productRoutes.js     # Định tuyến
├── views/
│   ├── header.ejs           # Phần header chung
│   ├── footer.ejs           # Phần footer chung
│   ├── index.ejs            # Trang danh sách sản phẩm
│   ├── add.ejs              # Form thêm sản phẩm
│   ├── edit.ejs             # Form sửa sản phẩm
│   ├── detail.ejs           # Trang chi tiết sản phẩm
│   └── error.ejs            # Trang lỗi
├── app.js                   # File chính của ứng dụng
├── docker-compose.yml       # Cấu hình Docker services
└── package.json             # Dependencies
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu
- Node.js (v14+)
- Docker & Docker Compose
- npm

### Các bước

1. **Cài đặt dependencies**
   ```bash
   npm install
   ```

2. **Khởi động DynamoDB Local**
   ```bash
   docker-compose up -d
   ```
   - DynamoDB Local: `http://localhost:8000`
   - DynamoDB Admin: `http://localhost:8001`

3. **Chạy ứng dụng**
   ```bash
   npm start
   ```
   
   Hoặc chế độ phát triển (auto-reload):
   ```bash
   npm run dev
   ```

4. **Truy cập ứng dụng**
   - Browser: `http://localhost:3000`

## 📝 Hướng dẫn sử dụng

### Thêm sản phẩm
1. Click "➕ Thêm sản phẩm" trong menu
2. Điền thông tin: Tên, Giá, Số lượng, Ảnh (tùy chọn)
3. Click "✅ Thêm sản phẩm"

### Sửa sản phẩm
1. Click "Sửa" từ danh sách hoặc trang chi tiết
2. Cập nhật thông tin
3. Tùy chọn upload ảnh mới
4. Click "💾 Lưu thay đổi"

### Xóa sản phẩm
1. Click "Xóa" từ danh sách hoặc trang chi tiết
2. Xác nhận xóa
3. Sản phẩm và ảnh sẽ bị xóa

## 🔗 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Lấy danh sách tất cả sản phẩm |
| GET | `/add` | Hiển thị form thêm sản phẩm |
| POST | `/add` | Tạo sản phẩm mới |
| GET | `/product/:id` | Lấy chi tiết sản phẩm |
| GET | `/edit/:id` | Hiển thị form sửa sản phẩm |
| POST | `/edit/:id` | Cập nhật sản phẩm |
| DELETE | `/delete/:id` | Xóa sản phẩm |

## 📊 Schema cơ sở dữ liệu

**Bảng Products**
```
{
  id: string (UUID),
  name: string,
  price: number,
  unit_in_stock: number,
  url_image: string,
  createdAt: string (ISO 8601),
  updatedAt: string (ISO 8601)
}
```

## ⚠️ Xử lý sự cố

**Port đang sử dụng**
```bash
# Kiểm tra process
netstat -ano | findstr :3000
# Hoặc dùng lsof trên Linux/Mac
lsof -i :3000
```

**DynamoDB không kết nối**
```bash
# Kiểm tra Docker containers
docker-compose ps

# Khởi động lại services
docker-compose restart
```

## 📝 Ghi chú

- Ảnh được lưu trong thư mục `public/uploads/`
- Đường dẫn ảnh là URL tương đối (vd: `/uploads/filename.jpg`)
- DynamoDB Local mặc định sử dụng bộ nhớ trong (dữ liệu mất khi restart)

---

**Happy coding! 🎉**
