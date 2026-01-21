# 🛒 ShopDB - Product Management System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

Ứng dụng quản lý sản phẩm (Product Management) được xây dựng với **Node.js**, **Express**, **EJS**, và **MySQL** theo mô hình **MVC** chuẩn. Ứng dụng hỗ trợ đầy đủ các chức năng CRUD, xác thực người dùng (Login/Register), quản lý session, và deployment với Docker Compose.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt và chạy](#-cài-đặt-và-chạy)
- [Chạy với Docker](#-chạy-với-docker)
- [Demo Account](#-demo-account)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [So sánh Node.js vs Java](#-so-sánh-nodejs-vs-java)
- [Tác giả](#-tác-giả)

## ✨ Tính năng

### 🔐 Authentication & Authorization
- ✅ Đăng nhập (Login)
- ✅ Đăng ký (Register)
- ✅ Đăng xuất (Logout)
- ✅ Session management với express-session
- ✅ Password hashing với bcrypt
- ✅ Protected routes (middleware authentication)

### 📦 Product Management (CRUD)
- ✅ **Create** - Thêm sản phẩm mới
- ✅ **Read** - Xem danh sách sản phẩm
- ✅ **Update** - Chỉnh sửa thông tin sản phẩm
- ✅ **Delete** - Xóa sản phẩm (có confirmation)

### 🎨 User Interface
- ✅ Giao diện đơn giản, thân thiện
- ✅ Responsive design (mobile-friendly)
- ✅ Modern UI với gradient background
- ✅ Form validation
- ✅ Visual feedback (badges, colors)
- ✅ Highlight row khi đang edit

### 🐳 Docker Support
- ✅ Dockerfile cho Node.js app
- ✅ Docker Compose (Node + MySQL stack)
- ✅ Database initialization tự động
- ✅ Health checks
- ✅ Volume persistence

## 🛠 Công nghệ sử dụng

### Backend
- **Node.js** v18+ - JavaScript runtime
- **Express** v5.2.1 - Web framework
- **MySQL2** v3.16.0 - Database driver
- **bcrypt** v5.1.1 - Password hashing
- **express-session** v1.18.1 - Session management

### Frontend
- **EJS** v4.0.1 - Template engine
- **CSS3** - Styling (custom, no framework)
- **HTML5** - Markup

### Database
- **MySQL** v8.0 - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Cấu trúc dự án

```
express-ejs-mysql/
├── controllers/              # Controller Layer (MVC)
│   ├── auth.controller.js   # Authentication logic
│   └── product.controller.js # Product CRUD logic
│
├── db/                      # Database Layer
│   ├── mysql.js            # Connection pool
│   └── setup.sql           # Database schema & seed data
│
├── middleware/              # Custom Middleware
│   └── auth.js             # Authentication middleware
│
├── routes/                  # Route Layer (MVC)
│   ├── auth.routes.js      # Auth routes (/login, /register, /logout)
│   └── product.routes.js   # Product routes (/, /add, /edit, /delete)
│
├── views/                   # View Layer (MVC)
│   ├── login.ejs           # Login page
│   ├── register.ejs        # Register page
│   ├── products.ejs        # Product management page
│   └── index.ejs           # (Optional) Home page
│
├── public/                  # Static files
│   └── style.css           # Application styles
│
├── .dockerignore           # Docker ignore file
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # NPM dependencies
├── app.js                  # Application entry point
└── README.md               # This file
```

### 🏗 Kiến trúc MVC

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────┐
│       ROUTES Layer          │  ← Routing logic
│  (auth.routes.js,           │
│   product.routes.js)        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│    MIDDLEWARE Layer         │  ← Authentication check
│  (auth.js)                  │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│    CONTROLLER Layer         │  ← Business logic
│  (auth.controller.js,       │
│   product.controller.js)    │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│      DATABASE Layer         │  ← Data access
│  (mysql.js)                 │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│       VIEW Layer            │  ← Presentation
│  (*.ejs templates)          │
└─────────────────────────────┘
```

## 💻 Yêu cầu hệ thống

### Development (Local)
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0

### Docker (Production)
- **Docker** >= 20.10
- **Docker Compose** >= 2.0

## 🚀 Cài đặt và chạy

### Option 1: Local Development (Without Docker)

#### Bước 1: Clone repository
```bash
git clone <repository-url>
cd express-ejs-mysql
```

#### Bước 2: Install dependencies
```bash
npm install
```

#### Bước 3: Setup MySQL Database

1. Đảm bảo MySQL đang chạy trên localhost:3306
2. Import database schema:
```bash
mysql -u root -p < db/setup.sql
```

Hoặc chạy SQL script trong MySQL Workbench/phpMyAdmin.

#### Bước 4: (Optional) Configure environment
Tạo file `.env` (copy từ `.env.example`):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=productdb
DB_PORT=3306
SESSION_SECRET=your-secret-key
PORT=3000
```

#### Bước 5: Start server
```bash
npm start
```

Application sẽ chạy tại: **http://localhost:3000**

### Option 2: Docker Development

#### Bước 1: Build và chạy containers
```bash
docker-compose up --build
```

Hoặc chạy ở background:
```bash
docker-compose up -d
```

#### Bước 2: Truy cập ứng dụng
- Application: **http://localhost:3000**
- MySQL: **localhost:3306**

#### Bước 3: Xem logs
```bash
docker-compose logs -f app
```

#### Bước 4: Dừng containers
```bash
docker-compose down
```

Xóa luôn volumes (database data):
```bash
docker-compose down -v
```

## 🐳 Chạy với Docker

### Docker Compose Services

#### Service: MySQL
- Image: `mysql:8.0`
- Port: `3306`
- Database: `productdb`
- Root password: `rootpassword`
- Auto-initializes với `db/setup.sql`
- Volume: `mysql_data` (persistent)

#### Service: App (Node.js)
- Build từ `Dockerfile`
- Port: `3000`
- Depends on: `mysql` (health check)
- Auto-restart on failure

### Docker Commands Cheat Sheet

```bash
# Build và start
docker-compose up --build

# Stop
docker-compose stop

# Start lại
docker-compose start

# Restart một service
docker-compose restart app

# Xem logs
docker-compose logs -f

# Exec vào container
docker-compose exec app sh
docker-compose exec mysql mysql -u root -p

# Remove containers
docker-compose down

# Remove containers + volumes
docker-compose down -v
```

## 🔑 Demo Account

### Default Admin Account
- **Username:** `admin`
- **Password:** `123456`

### Hoặc tự đăng ký tài khoản mới tại: `/register`

## 🌐 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/login` | Show login page | No |
| POST | `/login` | Handle login | No |
| GET | `/register` | Show register page | No |
| POST | `/register` | Handle registration | No |
| GET | `/logout` | Logout user | Yes |

### Product Routes (Protected)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | List all products | Yes |
| POST | `/add` | Add new product | Yes |
| GET | `/edit/:id` | Get product for edit | Yes |
| POST | `/update/:id` | Update product | Yes |
| GET | `/delete/:id` | Delete product | Yes |

## 📸 Screenshots

### Login Page
```
┌─────────────────────────────────┐
│         🔐 Login                │
│  ShopDB Product Management      │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Username                  │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ Password                  │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │        Login              │ │
│  └───────────────────────────┘ │
│                                 │
│  Demo: admin / admin123         │
└─────────────────────────────────┘
```

### Product Management Page
```
┌──────────────────────────────────────────────┐
│  🛒 ShopDB        Welcome, Admin!   Logout   │
├──────────────────────────────────────────────┤
│                                              │
│  ➕ Add New Product                          │
│  ┌─────────────┬─────────┬──────────┬─────┐│
│  │Product Name │ Price   │ Quantity │ Add ││
│  └─────────────┴─────────┴──────────┴─────┘│
│                                              │
│  📦 Product List (8 items)                  │
│  ┌───┬──────────────┬────────┬────┬───────┐│
│  │ID │ Name         │ Price  │Qty │Actions││
│  ├───┼──────────────┼────────┼────┼───────┤│
│  │1  │Laptop Dell...│$1499.99│ 10 │✏️ 🗑️ ││
│  │2  │Wireless...   │$29.99  │ 50 │✏️ 🗑️ ││
│  └───┴──────────────┴────────┴────┴───────┘│
└──────────────────────────────────────────────┘
```

## 📊 So sánh Node.js vs Java

Chi tiết so sánh đầy đủ giữa **Node.js (Express + EJS)** và **Java (Servlet + JSP)** được cung cấp trong file:

📄 **[COMPARISON_NodeJS_vs_Java.md](COMPARISON_NodeJS_vs_Java.md)**

### Highlights:

| Aspect | Node.js | Java Servlet |
|--------|---------|--------------|
| **Learning Curve** | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐ Moderate |
| **Development Speed** | ⭐⭐⭐⭐⭐ Fast | ⭐⭐⭐ Slower |
| **Performance (I/O)** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Good |
| **Performance (CPU)** | ⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **Enterprise Ready** | ⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login với credentials đúng
- [ ] Login với credentials sai
- [ ] Register tài khoản mới
- [ ] Register với username đã tồn tại
- [ ] Thêm sản phẩm mới
- [ ] Edit sản phẩm
- [ ] Delete sản phẩm (với confirmation)
- [ ] Logout và kiểm tra redirect
- [ ] Truy cập protected route khi chưa login

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt với salt rounds = 10
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Session Security** - Secure cookie settings
- ✅ **Authentication Middleware** - Protected routes
- ✅ **XSS Prevention** - EJS auto-escaping
- ✅ **CSRF** - (Recommended: Add csurf package for production)

## 📝 Database Schema

### Table: `users`
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: `products`
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT DEFAULT 0
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Tác giả

**ShopDB Project Team**
- Lab Assignment: Product Management System
- Course: Công Nghệ Mới (New Technologies)
- Year: 2026

---

## 📞 Contact & Support

Nếu có bất kỳ câu hỏi hoặc vấn đề nào, vui lòng:
1. Tạo issue trên GitHub repository
2. Liên hệ qua email của giảng viên
3. Tham khảo documentation trong code

---

**⭐ Nếu project này hữu ích, đừng quên star repository!**

**🚀 Happy Coding!**
