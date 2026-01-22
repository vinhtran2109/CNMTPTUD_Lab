const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/products.json');

// Đảm bảo thư mục data tồn tại
const ensureDataDirectory = () => {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
};

// Đọc tất cả sản phẩm
const getAllProducts = () => {
    ensureDataDirectory();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
};

// Lấy sản phẩm theo ID
const getProductById = (id) => {
    const products = getAllProducts();
    return products.find(product => product.id === id);
};

// Tạo sản phẩm mới
const createProduct = (product) => {
    const products = getAllProducts();
    products.push(product);
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
    return product;
};

// Cập nhật sản phẩm
const updateProduct = (id, updatedData) => {
    const products = getAllProducts();
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
        return null;
    }
    
    products[index] = { ...products[index], ...updatedData };
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
    return products[index];
};

// Xóa sản phẩm
const deleteProduct = (id) => {
    const products = getAllProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (products.length === filteredProducts.length) {
        return false;
    }
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(filteredProducts, null, 2));
    return true;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
