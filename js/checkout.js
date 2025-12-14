// Load shared classes (assumes classes.js is loaded first)

// Update cart display
function updateCartDisplay() {
    const orderList = document.querySelector('#orderList');
    const emptyCart = document.querySelector('#emptyCart');
    const cartSummary = document.querySelector('#cartSummary');
    const subtotalElement = document.querySelector('#subtotal');
    const totalElement = document.querySelector('#total');
    const deliveryForm = document.querySelector('#deliveryForm');
    const checkoutBtn = document.querySelector('#checkoutBtn');

    const items = order.getItems();

    if (items.length === 0) {
        if (orderList) orderList.innerHTML = '';
        if (emptyCart) emptyCart.classList.remove('hidden');
        if (cartSummary) cartSummary.classList.add('hidden');
        if (deliveryForm) deliveryForm.classList.add('hidden');
        if (subtotalElement) subtotalElement.textContent = '0 EGP';
        if (totalElement) totalElement.textContent = '0 EGP';
        return;
    }

    if (emptyCart) emptyCart.classList.add('hidden');
    if (cartSummary) cartSummary.classList.remove('hidden');
    if (deliveryForm) deliveryForm.classList.remove('hidden');

    const subtotal = order.calculateTotal();
    const delivery = 15;
    const total = subtotal + delivery;

    if (subtotalElement) subtotalElement.textContent = `${subtotal} EGP`;
    if (totalElement) totalElement.textContent = `${total} EGP`;

    if (orderList) {
        orderList.innerHTML = items.map((cartItem, index) => {
            const itemTotal = cartItem.getTotalPrice();
            return `
                <li>
                    <div class="order-item-info">
                        <strong>${cartItem.item.displayInfo()}</strong>
                        <div class="item-price">${itemTotal} EGP</div>
                    </div>
                    <div class="order-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="order.decreaseQuantity(${index}); updateCartDisplay();">-</button>
                            <span class="quantity-value">${cartItem.quantity}</span>
                            <button class="quantity-btn" onclick="order.increaseQuantity(${index}); updateCartDisplay();">+</button>
                        </div>
                        <button class="remove-btn" onclick="order.removeItem(${index}); updateCartDisplay();" title="Remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `;
        }).join('');
    }
}

// Checkout button handler
const checkoutBtn = document.querySelector('#checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const items = order.getItems();
        
        if (items.length === 0) {
            order.showToast('Your cart is empty!', 'error');
            return;
        }

        // Validate form
        const form = document.querySelector('#deliveryFormElement');
        if (!form || !form.checkValidity()) {
            form?.reportValidity();
            order.showToast('Please fill in all required fields', 'error');
            return;
        }

        const formData = new FormData(form);
        const customerData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            deliveryTime: formData.get('deliveryTime'),
            instructions: formData.get('instructions')
        };

        const subtotal = order.calculateTotal();
        const delivery = 15;
        const total = subtotal + delivery;
        const itemCount = order.getItemCount();

        // Create order summary
        const orderSummary = items.map(cartItem => 
            `${cartItem.quantity}x ${cartItem.item.name} - ${cartItem.getTotalPrice()} EGP`
        ).join('\n');

        const message = `Order Placed Successfully! 🎉\n\n` +
            `Customer: ${customerData.name}\n` +
            `Phone: ${customerData.phone}\n` +
            `Address: ${customerData.address}\n` +
            (customerData.deliveryTime ? `Delivery Time: ${customerData.deliveryTime}\n` : '') +
            (customerData.instructions ? `Instructions: ${customerData.instructions}\n` : '') +
            `\nOrder Details:\n${orderSummary}\n\n` +
            `Subtotal: ${subtotal} EGP\n` +
            `Delivery: ${delivery} EGP\n` +
            `Total: ${total} EGP\n\n` +
            `Thank you for your order!`;

        alert(message);

        // Clear cart and form
        order.clearOrder();
        form.reset();
        updateCartDisplay();
        order.showToast('Order confirmed! We will prepare it shortly.', 'success');
    });
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
    updateCartDisplay();
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

