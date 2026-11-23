const products = [
    {
        id: 1,
        emoji: "🌰",
        name: "Premium Almonds",
        category: "Nuts",
        price: 899,
        weight: "500g",
        image: "assets/almonds.jpeg",
        description: "Fresh and crunchy premium almonds."
    },
    {
        id: 2,
        emoji: "🥜",
        name: "Royal Cashews",
        category: "Nuts",
        price: 749,
        weight: "500g",
        image: "assets/cashews.jpeg",
        description: "Delicious and creamy cashew nuts."
    },
    {
        id: 3,
        emoji: "🥜",
        name: "Green Pistachios",
        category: "Nuts",
        price: 999,
        weight: "500g",
        image: "assets/pistachios.jpeg",
        description: "Premium quality pistachios."
    },
    {
        id: 4,
        emoji: "🌴",
        name: "Royal Dates",
        category: "Dates",
        price: 599,
        weight: "500g",
        image: "assets/dates.jpeg",
        description: "Naturally sweet and soft dates."
    },
    {
        id: 5,
        emoji: "🍇",
        name: "Golden Raisins",
        category: "Dried Fruits",
        price: 399,
        weight: "500g",
        image: "assets/raisins.jpeg",
        description: "Sweet and tasty dried raisins."
    },
    {
        id: 6,
        emoji: "🌰",
        name: "Premium Walnuts",
        category: "Nuts",
        price: 849,
        weight: "500g",
        image: "assets/walnuts.jpeg",
        description: "Quality walnuts for everyday snacks."
    },
    {
        id: 7,
        emoji: "🎃",
        name: "Pumpkin Seeds",
        category: "Seeds",
        price: 349,
        weight: "250g",
        image: "assets/pumpkin-seeds.jpeg",
        description: "Crunchy pumpkin seeds."
    },
    {
        id: 8,
        emoji: "🍈",
        name: "Dried Figs",
        category: "Dried Fruits",
        price: 699,
        weight: "500g",
        image: "assets/figs.jpeg",
        description: "Tasty and naturally sweet dried figs."
    }
];

function fallbackImage(emoji, label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
<rect width="100%" height="100%" fill="#f3e8d7"/>
<text x="200" y="145" font-size="90" text-anchor="middle">${emoji}</text>
<text x="200" y="215" font-size="24" font-family="Arial" fill="#3b2418" text-anchor="middle">${label}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

let cart = [];
let selectedCategory = "All";

function displayProducts() {
    const grid = document.getElementById("productGrid");
    const search = document.getElementById("searchInput").value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}"
                 alt="${product.name}"
                 onerror="this.onerror=null;this.src=fallbackImage('${product.emoji}', '${product.name}')">

            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>${product.weight}</p>
                <div class="price">₹${product.price}</div>
                <button class="add-btn"
                    onclick="addToCart(${product.id})">
                    + Add To Cart
                </button>
            </div>
        </div>
    `).join("");
}

function filterProducts(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    displayProducts();
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    alert(product.name + " added to your cart!");
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<div class="empty-cart">Your cart is empty 🛒</div>';
    } else {
        cartItems.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            return `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>

                    <div class="quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">−</button>
                        ${item.quantity}
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    cartCount.innerText = count;
    cartTotal.innerText = total.toLocaleString("en-IN");
}

function changeQuantity(id, change) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

function toggleCart() {
    document.getElementById("cartPanel").classList.toggle("open");
    document.getElementById("cartOverlay").classList.toggle("show");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add products first.");
        return;
    }

    let orderDetails = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join("\n");

    let total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    );

    alert(
        "Demo Checkout\n\n" +
        orderDetails +
        "\n\nTotal Amount: ₹" + total +
        "\n\nThis is a static website demo. No real order or payment has been placed."
    );
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("contactStatus").innerText =
        "Thank you! Your demo message has been received.";

    this.reset();
});

displayProducts();
updateCart();
