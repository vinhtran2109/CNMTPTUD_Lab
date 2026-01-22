const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const productModel = require('../models/productModel');

// Lấy tất cả sản phẩm
const getAllProducts = (req, res) => {
    try {
        const products = productModel.getAllProducts();
        res.render('products/index', { products });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).send('Lỗi khi lấy danh sách sản phẩm');
    }
};

// Hiển thị form thêm sản phẩm
const showAddProductForm = (req, res) => {
    res.render('products/add');
};

// Thêm sản phẩm mới
const addProduct = (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '/public/images/no-image.svg';
        
        const newProduct = {
            id: uuidv4(),
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            url_image: imageUrl,
            createdAt: new Date().toISOString()
        };
        
        productModel.createProduct(newProduct);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Lỗi khi thêm sản phẩm');
    }
};

// Hiển thị form chỉnh sửa sản phẩm
const showEditProductForm = (req, res) => {
    try {
        const { id } = req.params;
        const product = productModel.getProductById(id);
        
        if (!product) {
            return res.status(404).send('Không tìm thấy sản phẩm');
        }
        
        res.render('products/edit', { product });
    } catch (error) {
        console.error('Error showing edit form:', error);
        res.status(500).send('Lỗi khi hiển thị form chỉnh sửa');
    }
};

// Cập nhật sản phẩm
const updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const product = productModel.getProductById(id);
        
        if (!product) {
            return res.status(404).send('Không tìm thấy sản phẩm');
        }
        
        const updatedData = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            updatedAt: new Date().toISOString()
        };
        
        // Nếu có upload ảnh mới
        if (req.file) {
            // Xóa ảnh cũ nếu có
            if (product.url_image && product.url_image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', product.url_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updatedData.url_image = `/uploads/${req.file.filename}`;
        }
        
        productModel.updateProduct(id, updatedData);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Lỗi khi cập nhật sản phẩm');
    }
};

// Xóa sản phẩm
const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        const product = productModel.getProductById(id);
        
        if (!product) {
            return res.status(404).send('Không tìm thấy sản phẩm');
        }
        
        // Xóa ảnh nếu có
        if (product.url_image && product.url_image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', product.url_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        productModel.deleteProduct(id);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Lỗi khi xóa sản phẩm');
    }
};

module.exports = {
    getAllProducts,
    showAddProductForm,
    addProduct,
    showEditProductForm,
    updateProduct,
    deleteProduct
};
