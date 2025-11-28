# ShopHub JavaScript API Reference

## Table of Contents
1. [Utility Functions](#utility-functions)
2. [Authentication Functions](#authentication-functions)
3. [Product Functions (CRUD)](#product-functions-crud)
4. [Shopping Cart Functions](#shopping-cart-functions)
5. [Data Structures](#data-structures)

---

## Utility Functions

### `showSnackbar(message, duration = 3000)`
Display a Material Design snackbar notification.

**Parameters:**
- `message` (string): Notification message to display
- `duration` (number, optional): Duration in milliseconds (default: 3000)

**Returns:** void

**Example:**
```javascript
showSnackbar('Product added to cart!');
showSnackbar('Error occurred', 2000);
```

---

### `initializeLocalStorage()`
Initialize LocalStorage with sample data if not already present.

**Returns:** void

**Creates:**
- 6 sample products
- Empty cart array
- Empty users array

**Example:**
```javascript
initializeLocalStorage();
```

---

## Authentication Functions

### `validateRegistrationForm(data)`
Validate registration form data against business rules.

**Parameters:**
```javascript
data: {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}
```

**Returns:**
```javascript
{
  name?: string,      // Error message if validation fails
  email?: string,     // Error message if validation fails
  password?: string,  // Error message if validation fails
  confirmPassword?: string // Error message if validation fails
}
```

**Validation Rules:**
- Name: minimum 3 characters
- Email: valid email format
- Email: not already registered
- Password: minimum 6 characters
- Passwords: must match

**Example:**
```javascript
const errors = validateRegistrationForm({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'
});

if (Object.keys(errors).length === 0) {
  // Form is valid
}
```

---

### `registerNewUser(userData)`
Register a new user in LocalStorage.

**Parameters:**
```javascript
userData: {
  name: string,
  email: string,
  password: string
}
```

**Returns:**
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string,
  createdAt: string  // ISO timestamp
}
```

**Example:**
```javascript
const newUser = registerNewUser({
  name: 'Jane Smith',
  email: 'jane@example.com',
  password: 'secure123'
});
console.log(newUser.id);  // User's unique ID
```

---

### `loginUser(email, password)`
Authenticate user and create session.

**Parameters:**
- `email` (string): User's email
- `password` (string): User's password

**Returns:**
```javascript
{
  success: boolean,
  user?: { id, name, email, password },  // If successful
  error?: string                          // If failed
}
```

**Example:**
```javascript
const result = loginUser('john@example.com', 'password123');

if (result.success) {
  console.log('Welcome', result.user.name);
} else {
  console.log('Login failed:', result.error);
}
```

---

### `getCurrentUser()`
Get the currently logged-in user.

**Returns:**
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string
} | null  // Returns null if no user logged in
```

**Example:**
```javascript
const user = getCurrentUser();
if (user) {
  console.log('Logged in as:', user.email);
} else {
  console.log('Not logged in');
}
```

---

### `isCurrentUserAdmin()`
Check if the current user has admin privileges.

**Returns:** boolean

**Example:**
```javascript
if (isCurrentUserAdmin()) {
  showAdminMenu();
} else {
  hideAdminMenu();
}
```

---

### `logoutUser()`
Clear the current user session.

**Returns:** void

**Example:**
```javascript
logoutUser();
window.location.href = '/login';
```

---

## Product Functions (CRUD)

### `getAllProducts()`
Retrieve all products from LocalStorage.

**Returns:**
```javascript
[
  {
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    createdAt?: string
  },
  ...
]
```

**Example:**
```javascript
const products = getAllProducts();
console.log(`Total products: ${products.length}`);
```

---

### `getProductById(productId)`
Retrieve a single product by ID.

**Parameters:**
- `productId` (number): Product's unique ID

**Returns:**
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number
} | undefined  // Returns undefined if not found
```

**Example:**
```javascript
const product = getProductById(12345);
if (product) {
  console.log('Found:', product.name);
}
```

---

### `addProduct(productData)` ⚠️ Admin Only
Create a new product.

**Parameters:**
```javascript
productData: {
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number
}
```

**Returns:**
```javascript
{
  success: boolean,
  product?: { id, name, description, price, category, stock, createdAt },
  error?: string  // "Only admins can add products"
}
```

**Validation:**
- User must be admin
- Name: minimum 3 characters
- Description: minimum 10 characters
- Price: must be > 0
- Category: required
- Stock: must be integer

**Example:**
```javascript
const result = addProduct({
  name: 'Laptop',
  description: 'High-performance laptop with 16GB RAM',
  price: 999.99,
  category: 'Electronics',
  stock: 5
});

if (result.success) {
  console.log('Product added:', result.product.id);
}
```

---

### `updateProduct(productId, productData)` ⚠️ Admin Only
Update an existing product.

**Parameters:**
- `productId` (number): Product to update
- `productData` (object): Same structure as addProduct

**Returns:**
```javascript
{
  success: boolean,
  product?: { updated product object },
  error?: string  // Error message
}
```

**Example:**
```javascript
const result = updateProduct(12345, {
  name: 'Updated Laptop',
  description: 'Updated description',
  price: 1099.99,
  category: 'Electronics',
  stock: 3
});
```

---

### `deleteProduct(productId)` ⚠️ Admin Only
Delete a product from LocalStorage.

**Parameters:**
- `productId` (number): Product to delete

**Returns:**
```javascript
{
  success: boolean,
  error?: string  // Error message if failed
}
```

**Example:**
```javascript
const result = deleteProduct(12345);
if (result.success) {
  console.log('Product deleted');
}
```

---

### `searchProducts(query)`
Search products by name, description, or category.

**Parameters:**
- `query` (string): Search term (case-insensitive)

**Returns:**
```javascript
[
  { matching product objects }
]
```

**Example:**
```javascript
const results = searchProducts('laptop');
console.log(`Found ${results.length} products`);
```

---

### `sortProducts(products, sortBy)`
Sort products by specified criteria.

**Parameters:**
- `products` (array): Array of products to sort
- `sortBy` (string): Sort criteria
  - `'price-low'`: Ascending by price
  - `'price-high'`: Descending by price
  - `'name'`: Alphabetical by name
  - `'newest'`: Most recently created first

**Returns:** Sorted array of products

**Example:**
```javascript
const products = getAllProducts();
const sorted = sortProducts(products, 'price-low');
```

---

## Shopping Cart Functions

### `getCart()`
Retrieve the current shopping cart.

**Returns:**
```javascript
[
  {
    id: number,
    name: string,
    price: number,
    quantity: number
  },
  ...
]
```

**Example:**
```javascript
const cart = getCart();
console.log(`Cart has ${cart.length} items`);
```

---

### `addToCart(productId, productName, price)`
Add an item to the shopping cart.

**Parameters:**
- `productId` (number): Product's ID
- `productName` (string): Product's name
- `price` (number): Product's price

**Returns:**
```javascript
{
  success: boolean,
  message: string  // "Product Name added to cart"
}
```

**Behavior:**
- If product already in cart: increases quantity by 1
- If product not in cart: adds with quantity 1

**Example:**
```javascript
const result = addToCart(123, 'Laptop', 999.99);
console.log(result.message);  // "Laptop added to cart"
```

---

### `removeFromCart(productId)`
Remove an item from the shopping cart.

**Parameters:**
- `productId` (number): Product to remove

**Returns:**
```javascript
{
  success: boolean
}
```

**Example:**
```javascript
removeFromCart(123);
```

---

### `updateCartQuantity(productId, quantity)`
Update the quantity of a cart item.

**Parameters:**
- `productId` (number): Product to update
- `quantity` (number): New quantity (0 or less removes item)

**Returns:**
```javascript
{
  success: boolean,
  error?: string  // If product not in cart
}
```

**Example:**
```javascript
// Increase quantity to 5
updateCartQuantity(123, 5);

// Remove item (set quantity to 0)
updateCartQuantity(123, 0);
```

---

### `clearCart()`
Empty the shopping cart completely.

**Returns:**
```javascript
{
  success: boolean
}
```

**Example:**
```javascript
clearCart();
```

---

### `getCartTotal()`
Calculate the subtotal of the cart (before tax and shipping).

**Returns:** number (subtotal amount)

**Example:**
```javascript
const subtotal = getCartTotal();
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
```

---

### `getCartItemCount()`
Get the total number of items in cart (by quantity).

**Returns:** number (total quantity)

**Example:**
```javascript
const count = getCartItemCount();
console.log(`Cart has ${count} items`);
```

---

### `calculateCartSummary()`
Calculate complete cart summary with all charges.

**Returns:**
```javascript
{
  subtotal: number,     // Subtotal before tax/shipping
  shipping: number,     // $10 or $0 if subtotal >= $50
  tax: number,          // 8% of subtotal
  total: number,        // subtotal + shipping + tax
  itemCount: number     // Total items in cart
}
```

**Calculation Details:**
- Tax Rate: 8%
- Shipping: $10 (free if subtotal ≥ $50)
- Total: subtotal + shipping + tax

**Example:**
```javascript
const summary = calculateCartSummary();
console.log(`Subtotal: $${summary.subtotal.toFixed(2)}`);
console.log(`Shipping: $${summary.shipping.toFixed(2)}`);
console.log(`Tax: $${summary.tax.toFixed(2)}`);
console.log(`Total: $${summary.total.toFixed(2)}`);
```

---

## Data Structures

### User Object
```javascript
{
  id: number,                    // Timestamp when created
  name: string,                  // User's full name
  email: string,                 // Unique email
  password: string,              // Plain text (should be hashed in production)
  isAdmin?: boolean,             // Optional admin flag
  createdAt: string              // ISO 8601 timestamp
}
```

### Product Object
```javascript
{
  id: number,                    // Timestamp when created
  name: string,                  // Product name
  description: string,           // Detailed description
  price: number,                 // Product price in dollars
  category: string,              // Category name
  stock: number,                 // Available quantity
  createdAt: string,             // ISO 8601 timestamp
  updatedAt?: string             // ISO 8601 timestamp (optional)
}
```

### Cart Item Object
```javascript
{
  id: number,                    // Product ID (reference)
  name: string,                  // Product name (denormalized)
  price: number,                 // Product price (denormalized)
  quantity: number               // Quantity ordered
}
```

### Cart Summary Object
```javascript
{
  subtotal: number,              // Sum of (price * quantity)
  shipping: number,              // $10 or free
  tax: number,                   // subtotal * 0.08
  total: number,                 // subtotal + shipping + tax
  itemCount: number              // Sum of quantities
}
```

---

## LocalStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `users` | JSON Array | Registered users |
| `products` | JSON Array | Available products |
| `cart` | JSON Array | Current shopping cart |
| `loggedInUser` | JSON Object | Currently logged-in user |

---

## Error Handling Examples

### Handling Registration Errors
```javascript
const errors = validateRegistrationForm(formData);
if (errors.email) {
  document.getElementById('emailError').textContent = errors.email;
}
if (errors.password) {
  document.getElementById('passwordError').textContent = errors.password;
}
```

### Handling Login Errors
```javascript
const result = loginUser(email, password);
if (!result.success) {
  showSnackbar(result.error);
}
```

### Handling Product Operations
```javascript
const result = addProduct(productData);
if (result.success) {
  showSnackbar('Product added successfully');
  redirectToProducts();
} else {
  showSnackbar(result.error);
}
```

---

## Complete Usage Example

```javascript
// 1. Initialize on page load
initializeLocalStorage();

// 2. Register new user
const regErrors = validateRegistrationForm({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'
});

if (Object.keys(regErrors).length === 0) {
  const newUser = registerNewUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  });
  console.log('User registered:', newUser.id);
}

// 3. Login
const loginResult = loginUser('john@example.com', 'password123');
if (loginResult.success) {
  const user = getCurrentUser();
  console.log('Logged in as:', user.name);
}

// 4. As admin, add product
if (isCurrentUserAdmin()) {
  const productResult = addProduct({
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    category: 'Electronics',
    stock: 10
  });
}

// 5. Browse and search products
const allProducts = getAllProducts();
const searchResults = searchProducts('laptop');
const sortedProducts = sortProducts(allProducts, 'price-low');

// 6. Shopping
addToCart(123, 'Laptop', 999.99);
updateCartQuantity(123, 2);

const summary = calculateCartSummary();
console.log(`Total to pay: $${summary.total.toFixed(2)}`);

// 7. Checkout
clearCart();

// 8. Logout
logoutUser();
```

---

## Notes

- All functions are globally available once `script.js` is loaded
- LocalStorage has ~10MB limit (sufficient for this project)
- Timestamps use `Date.now()` for millisecond precision
- Email validation uses regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- All prices are numbers (not strings)
- Quantities are always positive integers

---

**Last Updated:** November 28, 2025
