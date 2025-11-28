# ShopHub - Online Shopping Website

A fully functional, responsive online shopping website built with **Bootstrap 5**, **Material Design**, **JavaScript**, and **LocalStorage**. This project demonstrates complete CRUD operations with user authentication and shopping cart functionality.

## 🎯 Project Features

### ✅ Implemented Features

1. **User Authentication System**
   - Registration page with form validation
   - Login page with email/password authentication
   - Admin demo account (admin@gmail.com / admin123)
   - Session management using LocalStorage

2. **Material Design Components**
   - Material Design Cards with shadows and hover effects
   - Material Design Buttons with ripple effects
   - Material Design Form Inputs with focus states
   - Material Design Snackbar notifications
   - Responsive Material Grid System

3. **CRUD Operations (using LocalStorage)**
   - **Create**: Add new products (admin only)
   - **Read**: Display products with search and filter
   - **Update**: Edit product details (admin only)
   - **Delete**: Remove products (admin only)

4. **Pages & Routes**
   - Home Page (index.html) - Hero banner with features
   - Login Page (login.html) - User authentication
   - Registration Page (register.html) - New user signup
   - Products Page (products.html) - Product listing with search/sort
   - Add/Edit Product Page (product-form.html) - Product management
   - Shopping Cart Page (cart.html) - Cart management with checkout

5. **Shopping Cart Features**
   - Add/remove items from cart
   - Update quantity
   - Cart total calculation
   - Tax and shipping calculation
   - Order summary
   - LocalStorage persistence

6. **Responsive Design**
   - Mobile-first approach
   - Bootstrap 5 grid system
   - Responsive navbar with mobile menu
   - Touch-friendly buttons and inputs

## 📁 Project Structure

```
PythonFSD/
├── app.py                          # Flask application with routes
├── static/
│   ├── script.js                   # JavaScript - validation, CRUD, cart logic
│   └── style.css                   # CSS - Material Design styling
└── templates/
    ├── index.html                  # Home page
    ├── login.html                  # Login page
    ├── register.html               # Registration page
    ├── products.html               # Product listing page
    ├── product-form.html           # Add/Edit product page
    └── cart.html                   # Shopping cart page
```

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Flask
- Modern web browser

### Installation

1. **Clone or download the project**
   ```bash
   cd PythonFSD
   ```

2. **Install Flask** (if not already installed)
   ```bash
   pip install flask
   ```

3. **Run the Flask application**
   ```bash
   python app.py
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📋 Usage Guide

### User Flow

#### 1. **Registration**
- Click "Register" or navigate to `/register`
- Fill in: Name, Email, Password, Confirm Password
- Form validation ensures:
  - Name: minimum 3 characters
  - Email: valid email format
  - Password: minimum 6 characters
  - Passwords match
- Duplicate email prevention
- Redirects to login on success

#### 2. **Login**
- Navigate to `/login`
- Enter email and password
- Demo Admin: `admin@gmail.com` / `admin123`
- Regular User: Use registered credentials
- Session persists in LocalStorage

#### 3. **Shopping (User)**
- View all products on Products page
- Search products by name/description
- Sort by price (low to high, high to low)
- Add items to cart
- View cart with quantity controls
- Calculate total with tax and shipping
- Checkout to complete purchase

#### 4. **Admin Management**
- After login as admin, "Add Product" appears in navbar
- Add new products with:
  - Name, Description, Price
  - Category selection
  - Stock quantity
- Edit existing products
- Delete products with confirmation

## 💾 LocalStorage Structure

### Users Collection
```javascript
localStorage.users = [
  {
    id: 1234567890,
    name: "John Doe",
    email: "john@gmail.com",
    password: "password123",
    createdAt: "2025-01-15T10:30:00"
  }
]
```

### Products Collection
```javascript
localStorage.products = [
  {
    id: 1234567890,
    name: "Product Name",
    description: "Product description...",
    price: 99.99,
    category: "Electronics",
    stock: 10,
    createdAt: "2025-01-15T10:30:00"
  }
]
```

### Cart Collection
```javascript
localStorage.cart = [
  {
    id: 1,
    name: "Product Name",
    price: 99.99,
    quantity: 2
  }
]
```

### Logged In User
```javascript
localStorage.loggedInUser = {
  id: 1234567890,
  name: "John Doe",
  email: "john@gmail.com",
  password: "password123"
}
```

## 🎨 Material Design Components Used

1. **Cards** - Product cards, category cards, form cards
2. **Buttons** - Primary, danger, warning, success buttons with elevation
3. **Forms** - Material design input fields and selects
4. **Shadows** - Elevation effects on hover
5. **Snackbar** - Toast notifications for user actions
6. **Responsive Grid** - Bootstrap 5 grid for layout

## ✨ Key JavaScript Functions

### Authentication
- `loginUser(email, password)` - User login
- `registerNewUser(userData)` - New user registration
- `getCurrentUser()` - Get logged-in user
- `isCurrentUserAdmin()` - Check admin status

### Products (CRUD)
- `getAllProducts()` - Retrieve all products
- `getProductById(id)` - Get single product
- `addProduct(data)` - Create new product
- `updateProduct(id, data)` - Update product
- `deleteProduct(id)` - Delete product
- `searchProducts(query)` - Search functionality
- `sortProducts(products, sortBy)` - Sort products

### Shopping Cart
- `getCart()` - Get cart items
- `addToCart(productId, name, price)` - Add item to cart
- `removeFromCart(productId)` - Remove item
- `updateCartQuantity(productId, qty)` - Update quantity
- `clearCart()` - Empty cart
- `getCartTotal()` - Calculate total
- `calculateCartSummary()` - Get complete summary

### Utilities
- `showSnackbar(message)` - Display notification
- `initializeLocalStorage()` - Initialize sample data

## 🔒 Security Notes

- Passwords are stored in LocalStorage (client-side only)
- For production, implement server-side authentication
- Use HTTPS for all connections
- Implement proper password hashing

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: Below 768px

## 🎯 Sample Data

The application comes pre-loaded with sample products:
1. Wireless Headphones - $199.99
2. Smart Watch - $299.99
3. Classic T-Shirt - $29.99
4. Programming Guide - $49.99
5. Gaming Mouse - $79.99
6. Keyboard Pro - $149.99

## 🐛 Troubleshooting

### Cart not persisting?
- Check if LocalStorage is enabled in browser
- Clear browser cache and reload

### Admin features not showing?
- Ensure you're logged in as admin@gmail.com
- Check LocalStorage for loggedInUser

### Products not loading?
- Check browser console for errors
- Verify LocalStorage is initialized
- Refresh the page

## 🚀 Future Enhancements

- Backend API integration
- Payment gateway integration
- User profile management
- Order history
- Product reviews and ratings
- Wishlist feature
- Email notifications
- Admin dashboard

## 📄 License

This project is for educational purposes.

## 👨‍💻 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Backend**: Flask (Python)
- **Database**: LocalStorage
- **Design**: Material Design 3
- **Icons**: Emoji icons

## ✅ Assignment Requirements Met

- ✅ Bootstrap 5 for responsive layout
- ✅ At least 3 Material Design components (Cards, Buttons, Forms, Shadows, Snackbars)
- ✅ Login and Registration with validation
- ✅ LocalStorage for all CRUD operations
- ✅ Dynamic product rendering with JavaScript
- ✅ Home, Login, Register, Products, Add/Edit Product, Cart pages
- ✅ Complete shopping workflow
- ✅ Admin user management
- ✅ Form validation
- ✅ Responsive design

---

**Developed with ❤️ for better e-commerce experiences**
