// Base Class - MenuItem (Inheritance)
class MenuItem {
    constructor(name, price, image, description = '', category = '', nutrition = {}) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
        this.nutrition = nutrition || {};
    }

    // Polymorphism - Base displayInfo method
    displayInfo() {
        return `${this.name} - ${this.price} EGP`;
    }

    // Method to check if item is Food or Drink
    getCategory() {
        return this.constructor.name === 'FoodItem' ? 'food' : 'drink';
    }

    // Serialize for localStorage
    toJSON() {
        return {
            type: this.constructor.name,
            name: this.name,
            price: this.price,
            image: this.image,
            description: this.description,
            category: this.category,
            nutrition: this.nutrition
        };
    }

    // Deserialize from localStorage
    static fromJSON(data) {
        if (data.type === 'FoodItem') {
            return new FoodItem(data.name, data.price, data.image, data.description || '', data.category || '', data.nutrition || {});
        } else if (data.type === 'DrinkItem') {
            return new DrinkItem(data.name, data.price, data.image, data.description || '', data.category || '', data.nutrition || {});
        }
        return new MenuItem(data.name, data.price, data.image, data.description || '', data.category || '', data.nutrition || {});
    }
}

// Subclass - FoodItem (Inheritance)
class FoodItem extends MenuItem {
    constructor(name, price, image, description = '', category = '', nutrition = {}) {
        super(name, price, image, description, category, nutrition);
    }

    // Polymorphism - Override displayInfo for FoodItem
    displayInfo() {
        return `${this.name} - ${this.price} EGP (Served Hot)`;
    }
}

// Subclass - DrinkItem (Inheritance)
class DrinkItem extends MenuItem {
    constructor(name, price, image, description = '', category = '', nutrition = {}) {
        super(name, price, image, description, category, nutrition);
    }

    // Polymorphism - Override displayInfo for DrinkItem
    displayInfo() {
        return `${this.name} - ${this.price} EGP (Served Cold)`;
    }
}

// CartItem class to manage quantity
class CartItem {
    constructor(item) {
        this.item = item;
        this.quantity = 1;
    }

    getTotalPrice() {
        return this.item.price * this.quantity;
    }

    // Serialize for localStorage
    toJSON() {
        return {
            item: this.item.toJSON(),
            quantity: this.quantity
        };
    }

    // Deserialize from localStorage
    static fromJSON(data) {
        const item = MenuItem.fromJSON(data.item);
        const cartItem = new CartItem(item);
        cartItem.quantity = data.quantity;
        return cartItem;
    }
}

// OrderManager Class (Encapsulation with private fields)
class OrderManager {
    // Encapsulation - Private field using # (ES6 private class fields)
    #items = [];
    #storageKey = 'cairoBitesCart';

    constructor() {
        this.loadFromStorage();
    }

    // Load cart from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.#storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                this.#items = data.map(item => CartItem.fromJSON(item));
                this.updateCartBadge();
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
        }
    }

    // Save cart to localStorage
    saveToStorage() {
        try {
            const data = this.#items.map(item => item.toJSON());
            localStorage.setItem(this.#storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    // Public method to add item (accepts optional quantity)
    addItem(item, qty = 1) {
        const existingItemIndex = this.#items.findIndex(
            cartItem => cartItem.item.name === item.name
        );

        if (existingItemIndex !== -1) {
            this.#items[existingItemIndex].quantity += qty;
        } else {
            const cartItem = new CartItem(item);
            cartItem.quantity = qty;
            this.#items.push(cartItem);
        }

        this.saveToStorage();
        this.updateCartBadge();
        this.showToast('Item added to cart!', 'success');
    }

    // Public method to remove item
    removeItem(index) {
        if (index >= 0 && index < this.#items.length) {
            this.#items.splice(index, 1);
            this.saveToStorage();
            this.updateCartBadge();
            this.showToast('Item removed from cart', 'success');
        }
    }

    // Public method to increase quantity
    increaseQuantity(index) {
        if (index >= 0 && index < this.#items.length) {
            this.#items[index].quantity++;
            this.saveToStorage();
            this.updateCartBadge();
        }
    }

    // Public method to decrease quantity
    decreaseQuantity(index) {
        if (index >= 0 && index < this.#items.length) {
            if (this.#items[index].quantity > 1) {
                this.#items[index].quantity--;
            } else {
                this.removeItem(index);
                return;
            }
            this.saveToStorage();
            this.updateCartBadge();
        }
    }

    // Public method to calculate total (encapsulated calculation)
    calculateTotal() {
        return this.#items.reduce((total, cartItem) => total + cartItem.getTotalPrice(), 0);
    }

    // Public method to get items count
    getItemCount() {
        return this.#items.reduce((count, cartItem) => count + cartItem.quantity, 0);
    }

    // Public method to get unique items count
    getUniqueItemCount() {
        return this.#items.length;
    }

    // Public method to clear order
    clearOrder() {
        this.#items = [];
        this.saveToStorage();
        this.updateCartBadge();
    }

    // Public method to get all items
    getItems() {
        return this.#items;
    }

    // Update cart badge in navbar
    updateCartBadge() {
        const cartBadge = document.querySelector('#cartBadge');
        if (cartBadge) {
            const itemCount = this.getItemCount();
            cartBadge.textContent = itemCount;
            cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
        }
    }

    // Toast notification method with enhanced styling
    showToast(message, type = 'success') {
        const toastContainer = document.querySelector('#toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'fa-check-circle';
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
        } else if (type === 'info') {
            icon = 'fa-info-circle';
        } else if (type === 'warning') {
            icon = 'fa-warning';
        }

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto-remove after 3.5 seconds
        setTimeout(() => {
            toast.remove();
        }, 3500);
    }
}

// Menu items array organized by categories, with nutrition facts
const menu = {
    appetizers: [
        new FoodItem("Hummus", 45, "images/hummus.jpg", "Creamy chickpea dip with tahini, lemon, and garlic", "appetizers", {calories:200,fat:10,carbs:18,protein:6,sugar:2,sodium:300}),
        new FoodItem("Baba Ganoush", 50, "images/Baba ghanoug.jpg", "Smoky roasted eggplant dip with tahini", "appetizers", {calories:180,fat:12,carbs:10,protein:3,sugar:2,sodium:220}),
        new FoodItem("Fattoush Salad", 55, "images/Fattoush salad.jpg", "Fresh mixed salad with crispy pita bread", "appetizers", {calories:120,fat:6,carbs:10,protein:2,sugar:3,sodium:150}),
        new FoodItem("Tabbouleh", 48, "images/Tabbouleh.jpg", "Parsley salad with tomatoes, bulgur, and mint", "appetizers", {calories:160,fat:7,carbs:20,protein:4,sugar:2,sodium:120}),
        new FoodItem("Stuffed Vine Leaves", 60, "images/Stuffed Vine Leaves.jpg", "Rice-stuffed grape leaves with herbs", "appetizers", {calories:140,fat:5,carbs:22,protein:3,sugar:1,sodium:200})
    ],
    mainDishes: [
        new FoodItem("Koshari", 60, "images/Koshari.jpg", "Egypt's national dish with rice, lentils, and pasta", "mainDishes", {calories:520,fat:12,carbs:90,protein:15,sugar:5,sodium:480}),
        new FoodItem("Shawarma", 120, "images/Shawarma.jpg", "Marinated meat with garlic sauce and pickles", "mainDishes", {calories:650,fat:35,carbs:30,protein:40,sugar:3,sodium:900}),
        new FoodItem("Ful Medames", 45, "images/Full medames.jpg", "Traditional fava beans cooked to perfection", "mainDishes", {calories:360,fat:8,carbs:40,protein:18,sugar:4,sodium:400}),
        new FoodItem("Grilled Kofta", 140, "images/Grilled Kofta.jpg", "Spiced ground meat skewers with tahini", "mainDishes", {calories:580,fat:40,carbs:10,protein:35,sugar:2,sodium:700}),
        new FoodItem("Hawawshi", 80, "images/Hawawshi.jpg", "Spiced meat baked in crispy bread", "mainDishes", {calories:550,fat:28,carbs:45,protein:25,sugar:3,sodium:650}),
        new FoodItem("Molokhia", 75, "images/molokhia.jpg", "Traditional jute leaf stew with chicken", "mainDishes", {calories:330,fat:10,carbs:8,protein:30,sugar:1,sodium:520}),
        new FoodItem("Kofta with Rice", 130, "images/Kofta with rice.jpg", "Spiced meatballs with aromatic rice", "mainDishes", {calories:620,fat:30,carbs:60,protein:32,sugar:2,sodium:700})
    ],
    drinks: [
        new DrinkItem("Pepsi", 25, "images/pepsi.jpg", "Refreshing carbonated soft drink", "drinks", {calories:150,fat:0,carbs:39,protein:0,sugar:39,sodium:30}),
        new DrinkItem("Mango Juice", 40, "images/Mango juice.jpg", "Fresh tropical mango juice", "drinks", {calories:180,fat:0.5,carbs:42,protein:1,sugar:40,sodium:10}),
        new DrinkItem("Fresh Orange", 35, "images/Fresh Orange juice.jpg", "Freshly squeezed orange juice", "drinks", {calories:120,fat:0,carbs:28,protein:2,sugar:24,sodium:0}),
        new DrinkItem("Tea", 20, "images/tea.jpg", "Traditional Egyptian black tea", "drinks", {calories:5,fat:0,carbs:0,protein:0,sugar:0,sodium:5}),
        new DrinkItem("Hibiscus", 30, "images/Hibiscus.jpg", "Refreshing hibiscus tea (Karkade)", "drinks", {calories:10,fat:0,carbs:2,protein:0,sugar:1,sodium:5}),
        new DrinkItem("Lemon Mint", 32, "images/Lemon ment.jpg", "Cool lemonade with fresh mint", "drinks", {calories:80,fat:0,carbs:20,protein:0,sugar:18,sodium:10}),
        new DrinkItem("Coffee", 25, "images/coffee.jpg", "Rich Turkish coffee", "drinks", {calories:5,fat:0,carbs:1,protein:0,sugar:0,sodium:5})
    ],
    desserts: [
        new FoodItem("Baklava", 65, "images/baklava.jpg", "Layers of phyllo with nuts and honey", "desserts", {calories:420,fat:24,carbs:50,protein:6,sugar:35,sodium:200}),
        new FoodItem("Basbousa", 50, "images/basbousa.jpg", "Sweet semolina cake with syrup", "desserts", {calories:360,fat:15,carbs:50,protein:5,sugar:30,sodium:180}),
        new FoodItem("Umm Ali", 55, "images/Um ali.jpg", "Traditional bread pudding with nuts", "desserts", {calories:300,fat:12,carbs:40,protein:8,sugar:20,sodium:140}),
        new FoodItem("Kunafa", 70, "images/kunafa.jpg", "Sweet cheese pastry with syrup", "desserts", {calories:450,fat:26,carbs:48,protein:8,sugar:32,sodium:220}),
        new FoodItem("Mahalabia", 40, "images/mahalabia.jpg", "Creamy milk pudding with rose water", "desserts", {calories:200,fat:6,carbs:30,protein:6,sugar:20,sodium:80}),
        new FoodItem("Zalabia", 45, "images/zalabia.jpg", "Crispy fried dough with honey", "desserts", {calories:330,fat:14,carbs:50,protein:3,sugar:28,sodium:160})
    ]
};

// Flatten menu for compatibility with existing code
const allMenuItems = [
    ...menu.appetizers,
    ...menu.mainDishes,
    ...menu.drinks,
    ...menu.desserts
];

// Ensure each item has rating and calories (provide sensible defaults)
allMenuItems.forEach(i => {
    if (typeof i.rating === 'undefined') {
        i.rating = (i instanceof DrinkItem) ? 4.2 : 4.6;
    }
    // keep a top-level calories for backwards compatibility, prefer nutrition.calories when present
    if (typeof i.calories === 'undefined') {
        i.calories = (i.nutrition && i.nutrition.calories) ? i.nutrition.calories : ((i instanceof DrinkItem) ? 150 : 450);
    }
});

// Initialize global OrderManager instance
const order = new OrderManager();

// Newsletter subscription function (global)
function subscribeNewsletter() {
    const input = document.querySelector('#newsletterInput');
    if (!input) return;
    
    const email = input.value.trim();
    
    if (!email) {
        order.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        order.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    order.showToast('Thank you for subscribing!', 'success');
    input.value = '';
}

