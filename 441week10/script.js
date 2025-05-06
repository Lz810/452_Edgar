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
                localStorage.removeItem('users');
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to view the cart.');
        window.location.href = 'login.html';
        return;
    }

    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let total = 0;
        cartContainer.innerHTML = cart.map(product => {
            const itemTotal = parseFloat(product.price.replace('¥', '')) * product.quantity;
            total += itemTotal;
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price} x ${product.quantity} = ¥${itemTotal.toFixed(2)}</p>
                    <button class="cta-button" onclick="removeFromCart(${product.id})">Remove</button>
                </div>
            `;
        }).join('');
        cartContainer.innerHTML += `<p>Total: ¥${total.toFixed(2)}</p>`;
    }
}

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

function downloadOrders() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to download your orders.');
        window.location.href = 'login.html';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const data = JSON.stringify(orders, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.json';
    a.click();

    URL.revokeObjectURL(url);
}

function clearStorage() {
    localStorage.clear();
    alert('Browser storage has been cleared.');
    location.reload();
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
            if (password.length < 6) {
                alert('Password should be at least 6 characters long.');
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
    const csvContent = "data:text/csv;charset=utf-8," +
        "Order ID,Product,Quantity,Price\n" +
        mockOrders.map(order => `${order.id},${order.product},${order.quantity},${order.price}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearSession() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}
