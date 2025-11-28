# ShopHub Development Guide

## Quick Start

### Running the Application

1. Navigate to the project directory:
   ```bash
   cd c:\Users\prash\Desktop\Notes\PythonFSD
   ```

2. Start Flask server:
   ```bash
   python app.py
   ```

3. Open browser and go to:
   ```
   http://localhost:5000
   ```

## Application Flow

```
User Visits / (Home Page)
    ↓
No Session? → Redirect to /login
    ↓
Not Logged In? → Show Login Form
    ↓
Login Successful → Store in LocalStorage → Redirect to Home
    ↓
View Products → Add to Cart → Checkout
```

## LocalStorage Data Flow

### 1. User Registration

```javascript
// Form Submission → Validation → Store User
User Input → Validate → 
{
  id: timestamp,
  name: string,
  email: string,
  password: string
} → localStorage.users.push() → Redirect to Login
```

### 2. User Login

```javascript
// Find matching user → Store session
Input (email, password) → 
Search localStorage.users → 
Found? → localStorage.setItem('loggedInUser', user) → 
Redirect to Home : Show Error
```

### 3. Product Management (Admin)

**Adding Product:**
```javascript
Form Submission → Validation → 
{
  id: timestamp,
  name, description, price, category, stock
} → localStorage.products.push() → Redirect to Shop
```

**Editing Product:**
```javascript
Load Product → Get by ID from localStorage → 
Fill Form → Submit → 
Find & Replace in localStorage.products → Redirect to Shop
```

**Deleting Product:**
```javascript
Confirm Dialog → Filter out product from array → 
localStorage.setItem('products', filtered) → UI Refresh
```

### 4. Shopping Cart Operations

**Add to Cart:**
```javascript
Button Click (product, price) → 
Check if in cart? →
Yes: quantity++ : Add new item →
localStorage.setItem('cart', updated) →
Show Snackbar
```

**Update Quantity:**
```javascript
Qty Input Change → 
Update cart item quantity →
localStorage.setItem('cart', updated) →
Recalculate totals
```

**Checkout:**
```javascript
Click Checkout → Clear Cart →
localStorage.setItem('cart', []) →
Show Success Message →
Redirect or Reset
```

## Form Validation Rules

### Registration Form
```javascript
Name:
  - Minimum 3 characters
  - Not empty
  
Email:
  - Valid email format (regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  - Not already registered
  
Password:
  - Minimum 6 characters
  - Must contain at least one character
  
Confirm Password:
  - Must match password field
```

### Login Form
```javascript
Email:
  - Must not be empty
  - Must match registered user
  
Password:
  - Must not be empty
  - Must match user's password
```

### Product Form (Admin)
```javascript
Name:
  - Minimum 3 characters
  - Not empty
  
Description:
  - Minimum 10 characters
  - Not empty
  
Price:
  - Must be valid number
  - Must be greater than 0
  
Category:
  - Must select from dropdown
  
Stock:
  - Must be integer
  - Minimum 0
```

## File Structure & Responsibilities

### app.py
**Purpose**: Flask application setup and routing

**Routes:**
- `/` → Render index.html (Home)
- `/register` → Render register.html
- `/login` → Render login.html
- `/products` → Render products.html
- `/product-form` → Render product-form.html
- `/cart` → Render cart.html

### templates/index.html
**Features:**
- Navigation bar with conditional admin menu
- Hero banner with CTA button
- Features showcase (3 material cards)
- Categories section (4 cards)
- Footer with links
- Auth checking & cart count display

**Key JavaScript:**
- `checkAuth()` - Verify login status
- `updateCartCount()` - Display cart items
- Logout functionality

### templates/register.html
**Features:**
- Material design card form
- 4 input fields (name, email, password, confirm)
- Error messages below each field
- Submit button
- Login link

**Validations:**
- All fields required
- Email format validation
- Password strength (6+ chars)
- Passwords must match
- Email uniqueness

### templates/login.html
**Features:**
- Material design card form
- Email & password inputs
- Admin demo credentials display
- Register link
- Submit button

**Functionality:**
- Auto-initialize admin account
- Email/password verification
- Session storage
- Error handling

### templates/products.html
**Features:**
- Search input (real-time filtering)
- Sort dropdown (price, name)
- Product grid (3-column responsive)
- Material product cards:
  - Product image
  - Name, description
  - Price badge
  - Add to Cart button
  - Edit/Delete buttons (admin only)
- Delete confirmation modal

**Functions:**
- `loadProducts()` - Fetch from LocalStorage
- `renderProducts()` - Display in grid
- `addToCart()` - Add to cart
- `editProduct()` - Navigate to edit form
- `deleteProduct()` - Remove from LocalStorage
- Search & Sort filtering

### templates/product-form.html
**Features:**
- Form for add/edit products
- 5 input fields (name, description, price, category, stock)
- Category dropdown with 5 options
- Error messages
- Submit button (Add/Update Product)
- Back link

**Functionality:**
- Load existing product on edit mode
- Validate all fields
- Create or update in LocalStorage
- Redirect to products page

### templates/cart.html
**Features:**
- Cart items list with:
  - Product image
  - Name & price
  - Quantity controls (-/+)
  - Item total
  - Delete button
- Order summary card:
  - Subtotal, shipping, tax
  - Total amount
  - Checkout button
- Empty cart message

**Calculations:**
- Tax: 8% of subtotal
- Shipping: $10 (free if subtotal ≥ $50)

### static/script.js
**Core Functions:**

**Utilities:**
- `showSnackbar(msg)` - Display toast notification
- `initializeLocalStorage()` - Setup sample data

**Authentication:**
- `validateRegistrationForm()` - Form validation
- `registerNewUser()` - Create account
- `loginUser()` - Authenticate user
- `getCurrentUser()` - Get session user
- `isCurrentUserAdmin()` - Check admin role
- `logoutUser()` - Clear session

**Products (CRUD):**
- `getAllProducts()` - Read all
- `getProductById()` - Read single
- `addProduct()` - Create new
- `updateProduct()` - Modify existing
- `deleteProduct()` - Remove item
- `searchProducts()` - Filter by query
- `sortProducts()` - Sort by criteria

**Cart:**
- `getCart()` - Get cart items
- `addToCart()` - Add item
- `removeFromCart()` - Remove item
- `updateCartQuantity()` - Update qty
- `clearCart()` - Empty cart
- `getCartTotal()` - Calculate total
- `getCartItemCount()` - Count items
- `calculateCartSummary()` - Full calculation

### static/style.css
**Components:**

1. **Material Cards** (.material-card)
   - Border radius: 12px
   - Shadow with hover effect
   - Transform on hover

2. **Material Buttons** (.material-btn)
   - Uppercase text
   - Shadows & elevation
   - Smooth transitions

3. **Material Inputs** (.material-input)
   - Bottom border only
   - Focus state styling
   - Smooth color transitions

4. **Navigation** (.navbar)
   - Box shadow
   - Bold brand
   - Hover effects

5. **Hero Banner** (.hero-banner)
   - Gradient background
   - Large typography
   - Text shadows

6. **Snackbar** (.snackbar)
   - Fixed bottom-right
   - Slide animation
   - Dark background

## Admin Features

### Admin Privileges

Only users with email `admin@gmail.com` or `isAdmin: true` can:
1. View "Add Product" in navbar
2. Add new products
3. Edit existing products
4. Delete products

### Admin Check
```javascript
if (user.isAdmin || user.email === 'admin@gmail.com') {
  showAdminFeatures();
}
```

## Testing Checklist

### Registration
- [ ] All fields required
- [ ] Name validation (min 3 chars)
- [ ] Email validation (valid format)
- [ ] Duplicate email prevention
- [ ] Password validation (min 6 chars)
- [ ] Password match validation
- [ ] Success redirect to login

### Login
- [ ] Email/password required
- [ ] Correct credentials login
- [ ] Invalid credentials error
- [ ] Session stored in LocalStorage
- [ ] Redirect to home on success
- [ ] Admin features visible for admin

### Products
- [ ] Display all products
- [ ] Search functionality
- [ ] Sort functionality
- [ ] Add to cart
- [ ] Admin can edit (if logged in as admin)
- [ ] Admin can delete (with confirmation)
- [ ] Product deletion works

### Cart
- [ ] Add items to cart
- [ ] Update quantity (+/- buttons)
- [ ] Remove items
- [ ] Calculate totals correctly
- [ ] Tax calculation (8%)
- [ ] Shipping calculation
- [ ] Checkout clears cart

### Navigation
- [ ] Navbar shows/hides based on auth
- [ ] Cart count updates
- [ ] Admin nav visible for admin
- [ ] Logout functionality
- [ ] All links work

## Common Issues & Solutions

### Issue: Products not showing
**Solution:**
```javascript
// Check LocalStorage
console.log(JSON.parse(localStorage.getItem('products')));

// Initialize if empty
if (!localStorage.getItem('products')) {
  initializeLocalStorage();
}
```

### Issue: Cart not persisting
**Solution:**
- Check browser's LocalStorage is enabled
- Clear cache: Ctrl+Shift+Delete
- Check browser console for errors
- Verify cart updates: `console.log(localStorage.getItem('cart'))`

### Issue: Admin features not visible
**Solution:**
- Verify logged in user: `console.log(localStorage.getItem('loggedInUser'))`
- Check email is `admin@gmail.com`
- Verify browser console for errors

### Issue: Forms not validating
**Solution:**
- Open browser DevTools
- Check console for validation errors
- Verify form IDs match in HTML & JS
- Test each validation rule individually

## Browser LocalStorage Limits

- Chrome/Firefox: ~10MB
- Safari: ~5MB
- This project uses ~100KB (plenty of room for scaling)

## Performance Tips

1. **Search Optimization**: Implement debouncing for real-time search
2. **Cart Updates**: Batch update operations
3. **Product Images**: Use CDN for placeholder images
4. **Lazy Loading**: Load products on demand for large datasets

## Future Enhancements

1. **Backend Integration**
   - Replace LocalStorage with database
   - Implement proper authentication
   - Add API endpoints

2. **Features**
   - User profile management
   - Order history
   - Product reviews
   - Wishlist
   - Email notifications

3. **Security**
   - Password hashing (bcrypt)
   - Session management
   - CSRF protection
   - Input sanitization

4. **Performance**
   - Pagination for products
   - Image optimization
   - Caching strategies
   - Service workers

---

**For questions or issues, check the browser console (F12) for detailed error messages.**
