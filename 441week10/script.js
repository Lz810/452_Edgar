/* Edgar (Lin Zheng) */
const products = [
    {
        id: 1,
        name: "MacBook Pro 14",
        price: "¥15999",
        image: "1.jpg",
        description: "Professional laptop with M2 Pro chip, delivering powerful performance for creative professionals"
    },
    {
        id: 2,
        name: "Lenovo Y9000P",
        price: "¥10999",
        image: "2.jpg",
        description: "Gaming laptop with RTX 4060 GPU, perfect balance of performance and portability"
    },
    {
        id: 3,
        name: "Apple AirPods Pro",
        price: "¥1199",
        image: "3.jpg",
        description: "Active noise cancelling earphones for an immersive audio experience"
    },
    {
        id: 4,
        name: "Sony wh - 1000xm5",
        price: "¥3099",
        image: "4.jpg",
        description: "Sony's flagship noise - cancelling headphones with 30 - hour battery life and 8 microphones"
    },
    {
        id: 5,
        name: "Wooting 60HE+",
        price: "¥1899",
        image: "5.jpg",
        description: "Revolutionary analog keyboard with full - range action detection"
    },
    {
        id: 6,
        name: "AKT 68",
        price: "¥599",
        image: "6.jpg",
        description: "68 - key mechanical keyboard, best value for money choice"
    },
    {
        id: 7,
        name: "Raze's Viper Mini",
        price: "¥2999",
        image: "7.jpg",
        description: "Ultra - lightweight wireless gaming mouse with Focus Pro 30K optical sensor"
    },
    {
        id: 8,
        name: "Logitech GPW2",
        price: "¥899",
        image: "8.jpg",
        description: "Logitech's next - gen wireless gaming mouse with HERO 25K sensor"
    },
    {
        id: 9,
        name: "NVIDIA GeForce RTX 4090",
        price: "¥13999",
        image: "9.jpg",
        description: "Top - tier gaming GPU with 24GB VRAM, supporting Ray Tracing 4.0"
    },
    {
        id: 10,
        name: "AMD Radeon RX 6900 XT",
        price: "¥13999",
        image: "10.jpg",
        description: "AMD flagship GPU with 16GB VRAM, excellent ray - tracing gaming performance"
    },
    {
        id: 11,
        name: "Intel Core i9 - 11900K",
        price: "¥1999",
        image: "11.jpg",
        description: "11th Gen flagship CPU with 8 cores 16 threads, superior gaming performance"
    },
    {
        id: 12,
        name: "AMD Ryzen 7 5800X 4th",
        price: "¥1999",
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (isLoggedIn) {
            authLink.textContent = 'Log out';
            authLink.href = '#';
            authLink.addEventListener('click', function () {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('cart');
                localStorage.removeItem('orders');
                window.location.href = 'index.html';
            });
        } else {
            authLink.textContent = 'Log/Sign in';
            authLink.href = 'login.html';
        }
    }
}

function addToCart(productId) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
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
                        = ¥<span id="total-${index}">${total.toFixed(2)}</span>
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

function confirmOrder() {
    window.location.href = 'orders.html';
}

function editOrder() {
    alert('Order edit feature coming soon!');
}

function downloadOrders() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to download your orders.');
        window.location.href = 'login.html';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const mockOrders = orders;

    if (mockOrders.length === 0) {
        alert('You have no orders to download.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8," +
        "Order ID,Product,Quantity,Price\n";
    mockOrders.forEach(order => {
        order.products.forEach(product => {
            csvContent += `${order.orderId},${product.name},${product.quantity || 1},${product.price.replace('¥', '')}\n`;
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearSession() {
    try {
        // 保存用户数据
        const users = localStorage.getItem('users');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // 清除所有数据
        localStorage.clear();
        
        // 恢复用户数据
        if (users) {
            localStorage.setItem('users', users);
        }
        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', isLoggedIn);
        }
        
        console.log('Session data cleared successfully.');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error clearing session data:', error);
    }
}

function clearStorage() {
    try {
        // 保存用户数据
        const users = localStorage.getItem('users');
        
        // 清除所有数据
        localStorage.clear();
        
        // 恢复用户数据
        if (users) {
            localStorage.setItem('users', users);
        }
        
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
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

    if (!Array.isArray(orders)) {
        console.error('Orders data is not an array:', orders);
        orders = [];
    }

    orders = orders.filter((order) => {
        if (
            typeof order === 'object' &&
            order!== null &&
            'orderId' in order &&
            'orderTime' in order &&
            'products' in order &&
            Array.isArray(order.products)
        ) {
            return true;
        }
        console.error('Invalid order object:', order);
        return false;
    });

    orders.sort((a, b) => b.orderTime - a.orderTime);

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>You have no orders yet.</p>';
    } else {
        ordersContainer.innerHTML = orders.map((order) => `
            <div class="order-group">
                <h3>Order ID: ${order.orderId}</h3>
                <p>Order Time: ${new Date(order.orderTime).toLocaleString()}</p>
                ${order.products.map((product) => `
                    <div class="order-item">
                        <img src="${product.image}" alt="${product.name}" width="100">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">${product.price}</p>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
}
function confirmOrder() {
    window.location.href='orders.html'
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to confirm your order.');
        window.location.href = 'login.html';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before confirming the order.');
        return;
    }

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
        orderId: generateOrderId(),
        orderTime: Date.now(),
        products: cart
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('cart', JSON.stringify([]));
    alert('Order confirmed!');
    loadOrders();
}

function editOrder() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to edit your order.');
        window.location.href = 'login.html';
        return;
    }
    window.location.href = 'cart.html';
}

function generateOrderId() {
    return Math.random().toString(36).substr(2, 9);
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
    loadProducts();
    checkLoggedIn();
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
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});

function downloadOrders() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to download your orders.');
        window.location.href = 'login.html';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const mockOrders = orders;

    if (mockOrders.length === 0) {
        alert('You have no orders to download.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8," +
        "Order ID,Product,Quantity,Price\n";
    mockOrders.forEach(order => {
        order.products.forEach(product => {
            csvContent += `${order.orderId},${product.name},${product.quantity || 1},${product.price.replace('¥', '')}\n`;
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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


