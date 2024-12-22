/* Edgar (Lin Zheng) */
const products = [
    {
        id: 1,
        name: "MacBook Pro 14",
        price: "¥15999",
        image: "1.jpg"
    },
    {
        id: 2,
        name: "Lenovo Y9000P",
        price: "¥10999",
        image: "2.jpg"
    },
    {
        id: 3,
        name: "Apple AirPods Pro ",
        price: "¥1199",
        image: "3.jpg"
    },
    {
        id: 4,
        name: "Sony wh-1000xm5",
        price: "¥3099",
        image: "4.jpg"
    },
    {
        id: 5,
        name: "Wooting 60HE+",
        price: "¥1899",
        image: "5.jpg"
    },
    {
        id: 6,
        name: "AKT 68",
        price: "¥599",
        image: "6.jpg"
    },
    {
        id: 7,
        name: "Raze's Viper Mini",
        price: "¥2999",
        image: "7.jpg"
    },
    {
        id: 8,
        name: "Logitech GPW2",
        price: "¥899",
        image: "8.jpg"
    },
    {
        id: 9,
        name: "NVIDIA GeForce RTX 4090",
        price: "¥13999",
        image: "9.jpg"
    },
    {
        id: 10,
        name: "AMD Radeon RX 6900 XT",
        price: "¥13999",
        image: "10.jpg"
    },
    {
        id: 11,
        name: "Intel Core i9-11900K",
        price: "¥1999",
        image: "11.jpg"
    },
    {
        id: 12,
        name: "AMD Ryzen 7 5800X 4th",
        price: "¥1999",
        image: "12.jpg"
    },

];
const blogPosts = [
    {
        id: 1,
        title: "new product",
        date: "2024-11-25",
        summary: "Our company has a new magnetic keyboard on the shelves..."
    },
    {
        id: 2,
        title: "Sales promotion",
        date: "2024-11-24",
        summary: "Recently, our products are on sale to celebrate the 20th anniversary of our company..."
    },
    {
        id: 3,
        title: "Autumn full scene new product conference",
        date: "2024-11-23",
        summary: "Join us for our exciting autumn product launch event! We'll..."
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
            <p>${product.price}</p>
            <button class="add-to-cart" onclick="addToCart('${product.name}')">
                加入购物车
            </button>
        </div>
    `).join('');
}
function loadBlogPosts() {
    const blogContainer = document.querySelector('.blog-container');
    if (!blogContainer) return;

    blogContainer.innerHTML = blogPosts.map(post => `
        <div class="blog-card">
            <h3>${post.title}</h3>
            <p class="date">${post.date}</p>
            <p class="summary">${post.summary}</p>
            <button class="read-more" onclick="readBlogPost(${post.id})">
                read more
            </button>
        </div>
    `).join('');
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadBlogPosts();

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}); 

