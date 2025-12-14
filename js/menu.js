// Render menu categories with horizontal scrolling

// Render category items
function renderCategory(categoryName, containerId, items) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return;

    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        const itemIndex = allMenuItems.indexOf(item);

        card.innerHTML = `
            <a class="view-link" href="item.html?id=${itemIndex}">
                <div class="card-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}'">
                </div>
            </a>
            <div class="card-content">
                <h4><a class="view-link" href="item.html?id=${itemIndex}">${item.name}</a></h4>
                <p class="card-description">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">${item.price} EGP</span>
                    <button class="add-order-btn">
                        <i class="fas fa-plus"></i> Add to Order
                    </button>
                </div>
            </div>
        `;
        
        const addBtn = card.querySelector('.add-order-btn');
        addBtn.addEventListener('click', () => {
            order.addItem(item);
            alert('Added to Order!');
        });
        
        container.appendChild(card);
    });
}

// Filter menu by category
function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hide/show categories
    const categories = {
        appetizers: document.querySelector('.appetizers-scroll').parentElement.parentElement,
        mainDishes: document.querySelector('.main-dishes-scroll').parentElement.parentElement,
        drinks: document.querySelector('.drinks-scroll').parentElement.parentElement,
        desserts: document.querySelector('.desserts-scroll').parentElement.parentElement
    };

    for (const [key, element] of Object.entries(categories)) {
        if (category === 'all' || category === key) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}

// Render all categories
function renderAllCategories() {
    renderCategory('appetizers', 'appetizersScroll', menu.appetizers);
    renderCategory('mainDishes', 'mainDishesScroll', menu.mainDishes);
    renderCategory('drinks', 'drinksScroll', menu.drinks);
    renderCategory('desserts', 'dessertsScroll', menu.desserts);
}

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderAllCategories();
    order.updateCartBadge();
    initMobileMenu();
    initNavbarScroll();
    
    // Newsletter enter key
    const newsletterInput = document.querySelector('#newsletterInput');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
});
