const API_URL = '/api/products';

let editingProductId = null;
let deleteProductId = null;

// DOM Elements
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');
const loadingEl = document.getElementById('loading');
const emptyStateEl = document.getElementById('empty-state');
const productCountEl = document.getElementById('product-count');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const imageInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const deleteModal = document.getElementById('delete-modal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    productForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);
    imageInput.addEventListener('change', handleImagePreview);

    // Delete modal
    document.getElementById('confirm-delete').addEventListener('click', confirmDelete);
    document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);
}

// Handle Image Preview
function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '';
    }
}

// Load Products
async function loadProducts() {
    try {
        showLoading();
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Không thể tải danh sách sản phẩm');
        hideLoading();
    }
}

// Display Products
function displayProducts(products) {
    hideLoading();

    if (products.length === 0) {
        emptyStateEl.style.display = 'block';
        productsList.innerHTML = '';
        productCountEl.textContent = '0 sản phẩm';
        return;
    }

    emptyStateEl.style.display = 'none';
    productCountEl.textContent = `${products.length} sản phẩm`;

    productsList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product['product-image'] || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                 alt="${product['product-name']}" 
                 class="product-image"
                 onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <div class="product-info">
                <h3 class="product-name">${escapeHtml(product['product-name'])}</h3>
                <p class="product-price">${formatPrice(product['product-price'])}</p>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="editProduct('${product['product-id']}')">
                        <span>✏️ Sửa</span>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteProduct('${product['product-id']}')">
                        <span>🗑️ Xóa</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle Form Submit
async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('product-name').value);
    formData.append('price', document.getElementById('product-price').value);

    const imageFile = imageInput.files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Đang xử lý...</span>';

        const url = editingProductId ? `${API_URL}/${editingProductId}` : API_URL;
        const method = editingProductId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to save product');
        }

        showSuccess(editingProductId ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        resetForm();
        loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        showError('Không thể lưu sản phẩm. Vui lòng thử lại.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = editingProductId ? '<span>💾 Cập Nhật</span>' : '<span>➕ Thêm Sản Phẩm</span>';
    }
}

// Edit Product
async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const product = await response.json();

        editingProductId = id;
        document.getElementById('product-id').value = id;
        document.getElementById('product-name').value = product['product-name'];
        document.getElementById('product-price').value = product['product-price'];

        if (product['product-image']) {
            imagePreview.innerHTML = `<img src="${product['product-image']}" alt="${product['product-name']}">`;
        }

        formTitle.textContent = 'Chỉnh Sửa Sản Phẩm';
        submitBtn.innerHTML = '<span>💾 Cập Nhật</span>';
        cancelBtn.style.display = 'inline-flex';

        // Scroll to form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading product:', error);
        showError('Không thể tải thông tin sản phẩm');
    }
}

// Delete Product
function deleteProduct(id) {
    deleteProductId = id;
    deleteModal.classList.add('active');
}

// Confirm Delete
async function confirmDelete() {
    try {
        const response = await fetch(`${API_URL}/${deleteProductId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        showSuccess('Xóa sản phẩm thành công!');
        closeDeleteModal();
        loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showError('Không thể xóa sản phẩm. Vui lòng thử lại.');
    }
}

// Close Delete Modal
function closeDeleteModal() {
    deleteModal.classList.remove('active');
    deleteProductId = null;
}

// Reset Form
function resetForm() {
    productForm.reset();
    editingProductId = null;
    document.getElementById('product-id').value = '';
    imagePreview.innerHTML = '';
    formTitle.textContent = 'Thêm Sản Phẩm Mới';
    submitBtn.innerHTML = '<span>➕ Thêm Sản Phẩm</span>';
    cancelBtn.style.display = 'none';
}

// Utility Functions
function showLoading() {
    loadingEl.style.display = 'block';
    productsList.style.display = 'none';
    emptyStateEl.style.display = 'none';
}

function hideLoading() {
    loadingEl.style.display = 'none';
    productsList.style.display = 'grid';
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showSuccess(message) {
    // Simple alert for now - can be replaced with toast notification
    alert('✅ ' + message);
}

function showError(message) {
    // Simple alert for now - can be replaced with toast notification
    alert('❌ ' + message);
}
