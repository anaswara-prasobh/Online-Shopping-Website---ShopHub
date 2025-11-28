// ===========================
// Utility Functions
// ===========================

/**
 * Show Material Design Snackbar notification
 */
function showSnackbar(message, duration = 3000) {
    const snackbar = document.getElementById('snackbar');
    if (!snackbar) return;
    
    snackbar.textContent = message;
    snackbar.classList.add('show');
    
    setTimeout(() => {
        snackbar.classList.remove('show');
    }, duration);
}

/**
 * Initialize LocalStorage with sample data
 */
function initializeLocalStorage() {
    // Initialize products
    if (!localStorage.getItem('products')) {
        const sampleProducts = [
            {
                id: 1,
                name: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and premium sound quality.',
                price: 199.99,
                category: 'Electronics',
                stock: 15
            },
            {
                id: 2,
                name: 'Smart Watch',
                description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and 7-day battery life.',
                price: 299.99,
                category: 'Electronics',
                stock: 8
            },
            {
                id: 3,
                name: 'Classic T-Shirt',
                description: '100% cotton comfortable t-shirt available in multiple colors and sizes.',
                price: 29.99,
                category: 'Fashion',
                stock: 50
            },
            {
                id: 4,
                name: 'Programming Guide',
                description: 'Comprehensive guide to web development with practical examples and best practices.',
                price: 49.99,
                category: 'Books',
                stock: 20
            },
            {
                id: 5,
                name: 'Gaming Mouse',
                description: 'High-precision gaming mouse with customizable buttons and RGB lighting.',
                price: 79.99,
                category: 'Gaming',
                stock: 25
            },
            {
                id: 6,
                name: 'Keyboard Pro',
                description: 'Mechanical gaming keyboard with mechanical switches and programmable keys.',
                price: 149.99,
                category: 'Gaming',
                stock: 12
            }
        ];
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }

    // Initialize cart
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Initialize users
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

// ===========================
// Registration Functions
// ===========================

/**
 * Validate registration form data
 */
function validateRegistrationForm(data) {
    const errors = {};

    // Name validation
    if (!data.name || data.name.trim().length < 3) {
        errors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === data.email)) {
        errors.email = 'Email already registered';
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

/**
 * Register a new user
 */
function registerNewUser(userData) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return newUser;
}

// ===========================
// Authentication Functions
// ===========================

/**
 * Login user
 */
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password' };
}

/**
 * Get currently logged in user
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('loggedInUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Check if current user is admin
 */
function isCurrentUserAdmin() {
    const user = getCurrentUser();
    return user && (user.isAdmin || user.email === 'admin@gmail.com');
}

/**
 * Logout current user
 */
function logoutUser() {
    localStorage.removeItem('loggedInUser');
}

// ===========================
// Product Functions (CRUD)
// ===========================

/**
 * Get all products
 */
function getAllProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

/**
 * Get product by ID
 */
function getProductById(productId) {
    const products = getAllProducts();
    return products.find(p => p.id == productId);
}

/**
 * Add new product (Admin only)
 */
function addProduct(productData) {
    if (!isCurrentUserAdmin()) {
        return { success: false, error: 'Only admins can add products' };
    }

    const products = getAllProducts();
    const newProduct = {
        id: Date.now(),
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        stock: parseInt(productData.stock) || 10,
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    return { success: true, product: newProduct };
}

/**
 * Update product (Admin only)
 */
function updateProduct(productId, productData) {
    if (!isCurrentUserAdmin()) {
        return { success: false, error: 'Only admins can update products' };
    }

    const products = getAllProducts();
    const index = products.findIndex(p => p.id == productId);

    if (index === -1) {
        return { success: false, error: 'Product not found' };
    }

    products[index] = {
        ...products[index],
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        stock: parseInt(productData.stock),
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem('products', JSON.stringify(products));
    return { success: true, product: products[index] };
}

/**
 * Delete product (Admin only)
 */
function deleteProduct(productId) {
    if (!isCurrentUserAdmin()) {
        return { success: false, error: 'Only admins can delete products' };
    }

    let products = getAllProducts();
    products = products.filter(p => p.id != productId);
    localStorage.setItem('products', JSON.stringify(products));

    return { success: true };
}

/**
 * Search products
 */
function searchProducts(query) {
    const products = getAllProducts();
    const lowerQuery = query.toLowerCase();

    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Sort products
 */
function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }

    return sorted;
}

// ===========================
// Shopping Cart Functions
// ===========================

/**
 * Get shopping cart
 */
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * Add item to cart
 */
function addToCart(productId, productName, price) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return { success: true, message: `${productName} added to cart` };
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    return { success: true };
}

/**
 * Update cart item quantity
 */
function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (!item) {
        return { success: false, error: 'Item not found in cart' };
    }

    if (quantity <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return { success: true };
}

/**
 * Clear cart
 */
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    return { success: true };
}

/**
 * Get cart total
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Get cart item count
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Calculate cart summary
 */
function calculateCartSummary() {
    const subtotal = getCartTotal();
    const taxRate = 0.08;
    const shippingThreshold = 50;
    const shippingCost = 10;

    const shipping = subtotal >= shippingThreshold ? 0 : shippingCost;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    return {
        subtotal,
        shipping,
        tax,
        total,
        itemCount: getCartItemCount()
    };
}

// ===========================
// Initialize on Page Load
// ===========================

// Initialize LocalStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage();
});
