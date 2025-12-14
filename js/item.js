// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Populate item details page based on `id` query param
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const container = document.querySelector('#itemArea');

    if (Number.isNaN(id) || !allMenuItems[id]) {
        container.innerHTML = '<p>Item not found. <a href="menu.html">Return to menu</a>.</p>';
        return;
    }

    const item = allMenuItems[id];

    // Build rating stars
    function renderStars(r) {
        const full = Math.floor(r);
        const half = (r - full) >= 0.5;
        let html = '';
        for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
        if (half) html += '<i class="fas fa-star-half-alt"></i>';
        const empty = 5 - full - (half ? 1 : 0);
        for (let i = 0; i < empty; i++) html += '<i class="far fa-star"></i>';
        return `<span class="rating-stars">${html}</span>`;
    }

    const nutrition = item.nutrition || {};

    const nutritionHtml = `
        <div class="nutrition-card">
            <h4>Nutrition Facts</h4>
            <ul class="nutrition-list">
                <li>Calories: <strong>${nutrition.calories ?? item.calories ?? 'N/A'}</strong></li>
                <li>Fat: <strong>${nutrition.fat ?? 'N/A'}</strong> g</li>
                <li>Carbs: <strong>${nutrition.carbs ?? 'N/A'}</strong> g</li>
                <li>Protein: <strong>${nutrition.protein ?? 'N/A'}</strong> g</li>
                <li>Sugar: <strong>${nutrition.sugar ?? 'N/A'}</strong> g</li>
                <li>Sodium: <strong>${nutrition.sodium ?? 'N/A'}</strong> mg</li>
            </ul>
        </div>
    `;

    const html = `
        <div class="item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(item.name)}'">
        </div>
        <div class="item-details">
            <h1>${item.name}</h1>
            <div class="item-meta">
                <div class="meta-pill">Price: <strong> ${item.price} EGP</strong></div>
                <div class="meta-pill">Category: <strong> ${item.category || 'General'}</strong></div>
            </div>
            <div class="item-meta">
                <div>${renderStars(item.rating || 0)} <span style="margin-left:8px">${(item.rating||0).toFixed(1)}</span></div>
            </div>
            <p>${item.description || ''}</p>
            ${nutritionHtml}

            <div style="margin-top:18px; display:flex; gap:12px; align-items:center;">
                <label for="qtyInput" style="font-weight:600">Quantity:</label>
                <input id="qtyInput" type="number" min="1" value="1" style="width:72px;padding:8px;border-radius:6px;border:1px solid #ddd" />
                <button id="addOrderBtn" class="add-order-large"><i class="fas fa-plus"></i> Add to Order</button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    const addBtn = document.querySelector('#addOrderBtn');
    addBtn.addEventListener('click', () => {
        const qtyInput = document.querySelector('#qtyInput');
        let qty = 1;
        if (qtyInput) {
            qty = parseInt(qtyInput.value) || 1;
            if (qty < 1) qty = 1;
        }
        order.addItem(item, qty);
    });

    // Update cart badge if needed
    if (typeof order !== 'undefined') order.updateCartBadge();
});
