/* Edgar (Lin Zheng) */
const products = [
    {
        id: 1,
        name: "MacBook Pro 14",
        price: "$15999",
        image: "1.jpg",
        description: "Professional laptop with M2 Pro chip, delivering powerful performance for creative professionals"
    },
    {
        id: 2,
        name: "Lenovo Y9000P",
        price: "$10999",
        image: "2.jpg",
        description: "Gaming laptop with RTX 4060 GPU, perfect balance of performance and portability"
    },
    {
        id: 3,
        name: "Apple AirPods Pro",
        price: "$1199",
        image: "3.jpg",
        description: "Active noise cancelling earphones for an immersive audio experience"
    },
    {
        id: 4,
        name: "Sony wh - 1000xm5",
        price: "$3099",
        image: "4.jpg",
        description: "Sony's flagship noise - cancelling headphones with 30 - hour battery life and 8 microphones"
    },
    {
        id: 5,
        name: "Wooting 60HE+",
        price: "$1899",
        image: "5.jpg",
        description: "Revolutionary analog keyboard with full - range action detection"
    },
    {
        id: 6,
        name: "AKT 68",
        price: "$599",
        image: "6.jpg",
        description: "68 - key mechanical keyboard, best value for money choice"
    },
    {
        id: 7,
        name: "Raze's Viper Mini",
        price: "$2999",
        image: "7.jpg",
        description: "Ultra - lightweight wireless gaming mouse with Focus Pro 30K optical sensor"
    },
    {
        id: 8,
        name: "Logitech GPW2",
        price: "$899",
        image: "8.jpg",
        description: "Logitech's next - gen wireless gaming mouse with HERO 25K sensor"
    },
    {
        id: 9,
        name: "NVIDIA GeForce RTX 4090",
        price: "$13999",
        image: "9.jpg",
        description: "Top - tier gaming GPU with 24GB VRAM, supporting Ray Tracing 4.0"
    },
    {
        id: 10,
        name: "AMD Radeon RX 6900 XT",
        price: "$13999",
        image: "10.jpg",
        description: "AMD flagship GPU with 16GB VRAM, excellent ray - tracing gaming performance"
    },
    {
        id: 11,
        name: "Intel Core i9 - 11900K",
        price: "$1999",
        image: "11.jpg",
        description: "11th Gen flagship CPU with 8 cores 16 threads, superior gaming performance"
    },
    {
        id: 12,
        name: "AMD Ryzen 7 5800X 4th",
        price: "$1999",
        image: "12.jpg",
        description: "8 - core 16 - thread processor delivering exceptional performance for gaming and creation"
    }
];

function loadProducts() {
    const productContainer = document.querySelector('.product-container');
    if (!productContainer) return;

    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Shopping Cart
            </button>
        </div>
    `).join('');
}

function checkLoggedIn() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (currentUser) {
            authLink.textContent = 'Student Portal';
            authLink.href = 'student-portal.html';
            authLink.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'student-portal.html';
            };
        } else {
            authLink.textContent = 'Log/Sign in';
            authLink.href = 'login.html';
            authLink.onclick = null;
        }
    }
}

function formatPrice(price) {
    if (!price) return '0.00';
    const cleaned = price.toString()
        .replace(/[^\d.]/g, '')
        .replace(/^0+/, '')
        .replace(/\.+/, '.');
    return parseFloat(cleaned || '0').toFixed(2);
}

function formatQuantity(quantity) {
    if (!quantity) return '1';
    return quantity.toString()
        .replace(/[^\d]/g, '') || '1';
}

function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `ORD-${timestamp}-${random}`;
}

function addToCart(productId) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to add items to the cart.');
        window.location.href = 'login.html';
        return;
    }

    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    if (document.title.includes('Shopping Cart')) {
        loadCart();
    }
}

function removeFromCart(productId) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to remove items from the cart.');
        window.location.href = 'login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    if (document.title.includes('Shopping Cart')) {
        loadCart();
    }
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartContainer.innerHTML = cart.map((product, index) => {
            const price = parseFloat(product.price.replace('¥', ''));
            const quantity = product.quantity || 1;
            const total = price * quantity;
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p>
                        ${product.price} x 
                        <input type="number" id="quantity-${index}" value="${quantity}" min="1" oninput="updateTotal(${index})" 
                        style="
                            width: 50px; 
                            height: 25px; 
                            font-size: 14px;
                            -webkit-appearance: none; 
                            -moz-appearance: textfield; 
                            appearance: none;
                        "> 
                        = $<span id="total-${index}">${total.toFixed(2)}</span>
                    </p>
                    <button class="cta-button" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        }).join('');
    }
}

function updateTotal(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantityInput = document.getElementById(`quantity-${index}`);
    const newQuantity = parseInt(quantityInput.value);
    const price = parseFloat(cart[index].price.replace('¥', ''));

    if (!isNaN(newQuantity) && newQuantity > 0) {
        const total = price * newQuantity;
        const totalElement = document.getElementById(`total-${index}`);
        totalElement.textContent = total.toFixed(2);

        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        alert('Please enter a valid quantity.');
    }
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const total = cart.reduce((sum, item) => {
        const price = parseFloat(formatPrice(item.price));
        const quantity = parseInt(formatQuantity(item.quantity));
        return sum + (price * quantity);
    }, 0);

    const order = {
        orderId: generateOrderId(),
        username: currentUser.username,
        products: cart.map(item => ({
            ...item,
            price: formatPrice(item.price),
            quantity: parseInt(formatQuantity(item.quantity))
        })),
        total: total,
        date: new Date().toISOString()
    };

    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    orders = orders.filter(o => o.orderId !== order.orderId);
    
    orders.push(order);
    
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.setItem('cart', JSON.stringify([]));

    alert('Order confirmed!');
    window.location.href = 'orders.html';
}

function editOrder() {
    alert('Order edit feature coming soon!');
}

function downloadOrders() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
            alert('Please login first');
        window.location.href = 'login.html';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.username === currentUser.username);

    if (userOrders.length === 0) {
            alert('You have no order history');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Order ID,Date,Product Name,Quantity,Unit Price,Total\n";

    userOrders.forEach(order => {
        order.products.forEach(product => {
            const price = parseFloat(product.price.replace('¥', ''));
            const quantity = product.quantity || 1;
            const total = price * quantity;
            csvContent += `${order.orderId},${new Date(order.date).toLocaleDateString()},${product.name},${quantity},${price},${total}\n`;
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${currentUser.username}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearSession() {
    try {
        // Define keys to preserve
        const preserveKeys = ['users', 'isLoggedIn'];
        
        // Save data to preserve
        const preservedData = {};
        preserveKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) preservedData[key] = value;
        });
        
        // Clear all data
        localStorage.clear();
        
        // Restore preserved data
        Object.entries(preservedData).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        
        console.log('Session data cleared successfully.');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error clearing session data:', error);
    }
}

function clearStorage() {
    try {
        // Define keys to preserve
        const preserveKeys = ['users'];
        
        // Save data to preserve
        const preservedData = {};
        preserveKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) preservedData[key] = value;
        });
        
        // Clear all data
        localStorage.clear();
        
        // Restore preserved data
        Object.entries(preservedData).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        
        alert('Browser storage has been cleared.');
        location.reload();
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadOrders() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to view your orders.');
        window.location.href = 'login.html';
        return;
    }

    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) {
        console.error('Element with id "orders-container" not found!');
        return;
    }

    const ordersData = localStorage.getItem('orders');
    let orders = [];
    try {
        orders = JSON.parse(ordersData) || [];
    } catch (error) {
        console.error('Error parsing orders data from localStorage:', error);
        orders = [];
    }

    const userOrders = orders.filter(order => {
        if (!order || typeof order !== 'object') return false;
        if (!order.username || !order.orderId || !order.products) return false;
        return order.username === currentUser.username;
    });

    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (userOrders.length === 0) {
        ordersContainer.innerHTML = '<p>No order history</p>';
        return;
    }

    ordersContainer.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <h4>Order #${order.orderId}</h4>
            <p>Date: ${new Date(order.date).toLocaleDateString('en-US')}</p>
            <div class="order-items">
                ${order.products.map(product => `
                    <div class="order-item">
                        <h5>${product.name}</h5>
                        <p>${product.description || ''}</p>
                        <p>Price: ¥${formatPrice(product.price)}</p>
                        <p>Quantity: ${formatQuantity(product.quantity)}</p>
                        <p>Subtotal: ¥${(parseFloat(formatPrice(product.price)) * parseInt(formatQuantity(product.quantity))).toFixed(2)}</p>
                    </div>
                `).join('')}
            </div>
            <p class="order-total">Total: ¥${order.total.toFixed(2)}</p>
        </div>
    `).join('');
}

async function fetchWithNetworkErrorHandling() {
    try {
        if (!navigator.onLine) {
            throw new Error('No internet connection');
        }

        const response = await fetch('cart.json');
        const data = await response.json();
        return data;
    } catch (error) {
        if (!navigator.onLine) {
            showOfflineMessage();
        } else {
            showNetworkError();
        }
    }
}

function showOfflineMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <p>You are currently offline</p>
        <button onclick="window.location.reload()">Retry</button>
    `;
    document.body.appendChild(message);
}

function showNetworkError() {
    const message = document.createElement('div');
    message.innerHTML = `
        <p>An error occurred while loading the cart. Please check your internet connection.</p>
        <button onclick="window.location.reload()">Retry</button>
    `;
    document.body.appendChild(message);
}

async function loadCartFromFile() {
    try {
        const response = await fetch('cart.json');
        const cart = await response.json();
        localStorage.setItem('cart', JSON.stringify(cart));
        if (document.title.includes('Shopping Cart')) {
            loadCart();
        }
    } catch (error) {
        console.error('Error loading cart from file:', error);
    }
}

function loadCheckout() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to view the checkout page.');
        window.location.href = 'login.html';
        return;
    }

    const checkoutContainer = document.getElementById('checkout-container');
    if (!checkoutContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        checkoutContainer.innerHTML = '<p>Your cart is empty. Please add items to your cart before checking out.</p>';
    } else {
        let total = 0;
        checkoutContainer.innerHTML = cart.map(product => {
            const itemTotal = parseFloat(product.price.replace('¥', '')) * product.quantity;
            total += itemTotal;
            return `
                <div class="checkout-item">
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price} x ${product.quantity} = ¥${itemTotal.toFixed(2)}</p>
                </div>
            `;
        }).join('');
        checkoutContainer.innerHTML += `<p>Subtotal: ¥${total.toFixed(2)}</p>`;
        checkoutContainer.innerHTML += `<p>Total: ¥${total.toFixed(2)}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    checkLoggedIn();
    loadProducts();
    await loadCartFromFile();

    if (document.title.includes('Shopping Cart')) {
        loadCart();
    } else if (document.title.includes('Orders')) {
        loadOrders();
    } else if (document.title.includes('Checkout')) {
        loadCheckout();
    }

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            if (!/^[a-zA-Z0-9]+$/.test(username)) {
                alert('Username should only contain letters and numbers.');
                return;
            }

            const passwordValidation = isPasswordStrong(password);
            if (!passwordValidation.isValid) {
                alert('Password requirements:\n' + passwordValidation.reasons.join('\n'));
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.username === username)) {
                alert('Username already exists.');
                return;
            }

            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify({
                    username: user.username,
                    email: user.email
                }));
                checkLoggedIn();
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});

function isPasswordStrong(password) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    const validation = {
        isValid: false,
        reasons: []
    };

    if (password.length < minLength) {
        validation.reasons.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
        validation.reasons.push('Password must contain at A-Z');
    }
    if (!hasLowerCase) {
        validation.reasons.push('Password must contain at a-z');
    }
    if (!hasNumbers) {
        validation.reasons.push('Password must contain at least one number');
    }

    validation.isValid = validation.reasons.length === 0;
    return validation;
}

// 用户认证相关函数
function validatePassword123(password) {
    // Password must be at least 8 characters, containing uppercase, lowercase, numbers and special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateEmail123(email) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone123(phone) {
    // Validate Australian phone number format
    const phoneRegex = /^(\+61|0)[2-4789]\d{8}$/;
    return phoneRegex.test(phone);
}

function registerUser123(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Validate all fields
    if (!username || !email || !password || !confirmPassword || !phone || !address) {
        alert('Please fill in all required fields');
        return;
    }

    if (!validateEmail123(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!validatePassword123(password)) {
        alert('Password must be at least 8 characters, containing uppercase, lowercase, numbers and special characters');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (!validatePhone123(phone)) {
        alert('Please enter a valid Australian phone number');
        return;
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    // 保存用户信息
    users.push({
        username,
        email,
        password, // Note: In real applications, passwords should be encrypted
        phone,
        address
    });

    localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
    window.location.href = 'login.html';
}

// 购物车相关函数
let cart = [];

function loadCart123() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartDisplay123();
}

function addToCart123(resourceId) {
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    const resource = resources.find(r => r.id === resourceId);
    
    if (resource) {
        const existingItem = cart.find(item => item.id === resourceId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: resource.id,
                name: resource.name,
                price: resource.price,
                quantity: 1
            });
        }
        saveCart123();
        updateCartDisplay123();
    }
}

function updateCartItem123(resourceId, quantity) {
    const item = cart.find(item => item.id === resourceId);
    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            cart = cart.filter(item => item.id !== resourceId);
        }
        saveCart123();
        updateCartDisplay123();
    }
}

function saveCart123() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay123() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <div class="quantity-controls">
                <button onclick="updateCartItem123('${item.id}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartItem123('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        `;
        cartContainer.appendChild(itemElement);
    });

    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// 订单管理相关函数
function saveOrder123() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login first');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = {
        id: Date.now(),
        username: currentUser.username,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    saveCart123();
        alert('Order saved');
}

function downloadOrders123() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login first');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(order => order.username === currentUser.username);
    
    const blob = new Blob([JSON.stringify(userOrders, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


document.addEventListener('DOMContentLoaded', function() {
    // Registration form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', registerUser123);
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser123);
    }

    // Shopping cart page handling
    if (window.location.pathname.includes('cart.html')) {
        loadCart123();
    }

    // Check login status
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (currentUser) {
            authLink.textContent = `Welcome, ${currentUser.username}`;
            authLink.href = 'orders.html';
        } else {
            authLink.textContent = 'Log/Sign in';
            authLink.href = 'login.html';
        }
    }
});

// courses.html
function loadCourses() {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.image}" alt="${course.name}">
            <div class="course-content">
                <h3>${course.name}</h3>
                <p class="course-id">Course Code: ${course.id}</p>
                <p class="course-duration">Duration: ${course.duration}</p>
                <p class="course-description">${course.description}</p>
                <button onclick="window.location.href='resources.html?courseId=${course.id}'" class="view-resources-button">
                    View Resources
                </button>
            </div>
        </div>
    `).join('');
}