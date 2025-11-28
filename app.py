from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Routes for Online Shopping Website
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/product-form')
def product_form():
    return render_template('product-form.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route("/admin-dash")
def admin_dashboard():
    return render_template("admin-dash.html")

if __name__ == '__main__':
    app.run(debug=True)
