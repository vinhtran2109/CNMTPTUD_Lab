# 📚 HƯỚNG DẪN NỘP BÀI TẬP SHOPDB

## 📋 Yêu cầu nộp bài

### 1. File Word (Báo cáo)

Tạo file Word với nội dung:

#### A. Thông tin sinh viên
- Họ tên:
- MSSV:
- Lớp:
- Môn học: Công Nghệ Mới
- Bài tập: ShopDB Product Management

#### B. Giới thiệu dự án
- Tên dự án: ShopDB - Product Management System
- Công nghệ: Node.js + Express + EJS + MySQL
- Mô hình: MVC

#### C. Các tính năng đã cài đặt
✅ **CRUD đầy đủ**
- Create: Thêm sản phẩm mới
- Read: Xem danh sách sản phẩm
- Update: Chỉnh sửa sản phẩm
- Delete: Xóa sản phẩm (có confirm)

✅ **Authentication & Session**
- Login với bcrypt password hashing
- Register account
- Logout
- Session management với express-session
- Protected routes (middleware)

✅ **MVC Architecture**
- Model: Database layer (db/mysql.js)
- View: EJS templates (views/*.ejs)
- Controller: Business logic (controllers/*.js)
- Routes: Routing layer (routes/*.js)
- Middleware: Authentication (middleware/auth.js)

✅ **Docker Compose**
- Node.js container
- MySQL container
- Network configuration
- Volume persistence
- Health checks

#### D. Screenshots (Chèn vào Word)

**Cần chụp các màn hình sau:**

1. **Login Page**
   - Màn hình đăng nhập
   - Chụp full page với giao diện

2. **Register Page**
   - Màn hình đăng ký
   - Form registration

3. **Product List (Empty)**
   - Danh sách sản phẩm ban đầu
   - Có dữ liệu mẫu từ database

4. **Add Product**
   - Form thêm sản phẩm
   - Điền thông tin sản phẩm mới

5. **Product List (After Add)**
   - Danh sách sau khi thêm
   - Hiển thị sản phẩm mới được thêm

6. **Edit Product**
   - Form edit với dữ liệu đã điền
   - Highlight row đang edit

7. **Product List (After Edit)**
   - Danh sách sau khi cập nhật
   - Hiển thị thông tin đã thay đổi

8. **Delete Confirmation**
   - Dialog confirm delete
   - Alert box

9. **Product List (After Delete)**
   - Danh sách sau khi xóa
   - Sản phẩm đã bị xóa

10. **Docker Containers Running**
    - Terminal: `docker-compose ps`
    - Hiển thị 2 containers (app + mysql)

11. **Database Tables**
    - MySQL Workbench hoặc terminal
    - Show tables: users, products
    - SELECT * FROM products;

#### E. Cấu trúc dự án
```
Chèn screenshot của file explorer hoặc:
- Copy từ README.md phần "Cấu trúc dự án"
- Hoặc chụp màn hình VS Code Explorer
```

#### F. So sánh Node.js vs Java Servlet
```
Tóm tắt từ file COMPARISON_NodeJS_vs_Java.md
Chọn 5-7 điểm chính:
- Learning Curve
- Development Speed
- Performance
- Scalability
- Use Cases
- Kết luận
```

#### G. Kết luận
- Đánh giá quá trình thực hiện
- Kiến thức đã học được
- Khó khăn gặp phải và cách giải quyết
- Hướng phát triển

---

### 2. Link GitHub Repository

#### Bước 1: Tạo GitHub Repository

```bash
# 1. Initialize git (nếu chưa có)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit - ShopDB Product Management System"

# 4. Tạo repository trên GitHub (https://github.com/new)
# - Repository name: shopdb-product-management
# - Description: Product Management System with Node.js + Express + MySQL
# - Public repository

# 5. Connect và push
git remote add origin https://github.com/YOUR_USERNAME/shopdb-product-management.git
git branch -M main
git push -u origin main
```

#### Bước 2: Chuẩn bị README.md cho GitHub

File README.md đã được tạo sẵn, đảm bảo có:
- ✅ Mô tả dự án
- ✅ Features list
- ✅ Installation guide
- ✅ Screenshots section
- ✅ Docker instructions
- ✅ Demo account info

#### Bước 3: Tạo file SUBMISSION.md

```markdown
# 📝 THÔNG TIN NỘP BÀI

## Sinh viên
- **Họ tên:** [Tên của bạn]
- **MSSV:** [MSSV]
- **Lớp:** [Lớp]

## Dự án
- **Tên:** ShopDB - Product Management System
- **Môn học:** Công Nghệ Mới
- **Học kỳ:** 2 - Năm 4

## Demo Account
- **Username:** admin
- **Password:** 123456

## Quick Start
\`\`\`bash
# Local
npm install
npm start

# Docker
docker-compose up --build
\`\`\`

## Links
- Repository: [Link GitHub của bạn]
- Live Demo: [Nếu có deploy]
- Documentation: [README.md](README.md)
- Comparison: [COMPARISON_NodeJS_vs_Java.md](COMPARISON_NodeJS_vs_Java.md)
```

---

### 3. Giao diện chạy ứng dụng

#### Cách chạy và chụp màn hình:

**Option 1: Local (Recommended for screenshots)**
```bash
# Terminal 1: Start MySQL (nếu chưa chạy)
# Đảm bảo MySQL running

# Terminal 2: Start app
npm start

# Browser: http://localhost:3000
# Chụp tất cả các màn hình theo danh sách ở trên
```

**Option 2: Docker**
```bash
# Terminal
docker-compose up --build

# Wait for containers to start
# Browser: http://localhost:3000
# Chụp màn hình

# Chụp thêm:
docker-compose ps  # Container status
docker-compose logs app  # Application logs
```

#### Checklist chụp màn hình:
```
[ ] Login page (before login)
[ ] Login page (with error - wrong credentials)
[ ] Register page
[ ] Product list (initial data)
[ ] Add product form
[ ] Product list (after add)
[ ] Edit product form
[ ] Product list (after edit)
[ ] Delete confirmation dialog
[ ] Product list (after delete)
[ ] Logout (redirect to login)
[ ] Docker ps output
[ ] Database tables in MySQL
[ ] VS Code file structure
[ ] Terminal running npm start
[ ] Browser DevTools (Network/Console - optional)
```

---

## 📤 Checklist nộp bài

### File Word (.docx)
```
[ ] Trang bìa với thông tin sinh viên
[ ] Mục lục
[ ] Giới thiệu dự án
[ ] Tính năng đã cài đặt
[ ] Screenshots (đầy đủ theo list)
[ ] Cấu trúc dự án (code structure)
[ ] So sánh Node.js vs Java
[ ] Kết luận
[ ] Tài liệu tham khảo
```

### GitHub Repository
```
[ ] README.md (comprehensive)
[ ] COMPARISON_NodeJS_vs_Java.md
[ ] SUBMISSION.md (thông tin nộp bài)
[ ] .gitignore (đầy đủ)
[ ] Source code (full project)
[ ] docker-compose.yml
[ ] Dockerfile
[ ] Database setup.sql
[ ] Package.json with all dependencies
```

### Repository Structure Check
```
[ ] Không commit node_modules
[ ] Không commit .env
[ ] Có .gitignore proper
[ ] README có demo account
[ ] Code có comments
[ ] MVC structure rõ ràng
```

---

## 🎯 Tiêu chí chấm điểm (Dự đoán)

### 1. CRUD Operations (25%)
- ✅ Create product
- ✅ Read/List products
- ✅ Update product
- ✅ Delete product
- ✅ Form validation

### 2. Login + Session (25%)
- ✅ Login functionality
- ✅ Register functionality
- ✅ Session management
- ✅ Protected routes
- ✅ Password hashing
- ✅ Logout

### 3. MVC Architecture (20%)
- ✅ Clear separation: Model, View, Controller
- ✅ Routes layer
- ✅ Middleware layer
- ✅ Database layer
- ✅ Code organization

### 4. Docker Compose (15%)
- ✅ Dockerfile for Node.js
- ✅ docker-compose.yml
- ✅ Node + MySQL in same stack
- ✅ Proper networking
- ✅ Volume persistence
- ✅ Environment variables

### 5. UI/UX (10%)
- ✅ Clean interface
- ✅ User-friendly
- ✅ Responsive design
- ✅ Form validation feedback
- ✅ Visual feedback

### 6. Documentation (5%)
- ✅ README.md comprehensive
- ✅ Code comments
- ✅ Comparison document
- ✅ Setup instructions

---

## 💡 Tips

### 1. Demo tốt nhất
- Chạy local (không Docker) để chụp ảnh → nhanh hơn, stable
- Dùng Chrome DevTools để responsive testing
- Zoom browser 100% khi chụp screenshot

### 2. Word Document
- Sử dụng template đẹp
- Screenshots rõ nét, full screen
- Caption cho mỗi hình
- Numbering tự động

### 3. GitHub
- Write good commit messages
- Add badges to README (Node.js, Docker, MySQL)
- Add LICENSE file (MIT)
- Pin important files

### 4. Bonus Points
- Add input validation messages
- Add search/filter functionality
- Add pagination
- Deploy to Heroku/Railway
- Add unit tests
- Add API documentation

---

## 🆘 Troubleshooting

### Lỗi kết nối MySQL
```bash
# Check MySQL is running
mysql -u root -p

# Check port
netstat -an | findstr 3306

# Update db/mysql.js với đúng credentials
```

### Docker không start
```bash
# Check Docker Desktop is running
docker --version

# Remove old containers
docker-compose down -v

# Rebuild
docker-compose up --build
```

### Port 3000 đã được sử dụng
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Hoặc đổi port trong app.js và docker-compose.yml
```

---

## 📅 Timeline đề xuất

### Ngày 1-2: Development
- Setup project
- Implement CRUD
- Implement Authentication
- MVC restructure

### Ngày 3: Docker & Testing
- Setup Docker
- Testing tất cả features
- Fix bugs

### Ngày 4: Documentation
- Write README
- Write comparison
- Take screenshots
- Create Word document

### Ngày 5: Submission
- Final testing
- Push to GitHub
- Complete Word document
- Submit

---

**🎓 Good luck with your submission!**

_Nếu có thắc mắc, tham khảo:_
- README.md - Setup instructions
- COMPARISON_NodeJS_vs_Java.md - Technical comparison
- Code comments trong source
