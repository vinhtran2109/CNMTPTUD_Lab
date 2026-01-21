-- Create database
CREATE DATABASE IF NOT EXISTS productdb;
USE productdb;

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT DEFAULT 0
);

-- Insert default admin user (password: 123456)
INSERT INTO users (username, password, fullname) VALUES
('admin', '$2b$10$s7ueQoxci/lxK3RkSUixAuYHjg/6pDNTOUMwpc1N3rg8CsyBI871e', 'Administrator');

-- Insert sample data
INSERT INTO products (name, price, quantity) VALUES
('Laptop Dell XPS 15', 1499.99, 10),
('Wireless Mouse Logitech', 29.99, 50),
('Mechanical Keyboard', 79.99, 25),
('Monitor 27 inch', 299.99, 15),
('USB-C Hub', 49.99, 30),
('Webcam HD', 89.99, 20),
('Headphones Sony', 199.99, 12),
('External SSD 1TB', 129.99, 18);

-- Query to view all products
SELECT * FROM products;
