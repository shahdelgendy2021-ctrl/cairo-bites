# Cairo Bites - Restaurant Ordering System

Hey there! 👋 Welcome to **Cairo Bites**, a restaurant ordering system I built to showcase traditional Egyptian cuisine. This project combines modern web design with clean, object-oriented JavaScript to create a smooth and enjoyable ordering experience.
Think of it as your digital gateway to delicious Egyptian food - from crispy falafel to sweet baklava, everything is just a few clicks away!
## What's Inside?
This project demonstrates three core OOP concepts that make the code clean and maintainable:
**Encapsulation** - The `OrderManager` class keeps its data private and safe, only exposing what's needed through public methods. It's like having a secure vault where only authorized methods can access the cart items.
**Inheritance** - I created a base `MenuItem` class that both `FoodItem` and `DrinkItem` extend. This means they share common properties (like name, price, image) but can have their own unique behaviors. It's efficient and follows the DRY principle!
**Polymorphism** - The `displayInfo()` method works differently depending on whether you're looking at food or drinks. Same method name, different behavior - that's polymorphism in action!
## Features You'll Love
### For Customers
- **Browse by Category** - Appetizers, main dishes, drinks, and desserts are all neatly organized
- **Smooth Scrolling** - Each category scrolls horizontally, making it easy to see everything
- **Detailed Item Pages** - Click any item to see full details, nutrition facts, and ratings
- **Smart Shopping Cart** - Add items, adjust quantities, and your cart remembers everything (even if you close the browser!)
- **Easy Checkout** - Simple form to enter your delivery information
- **Meet the Team** - Get to know the amazing people behind Cairo Bites
### Design Highlights
- **Looks Great Everywhere** - Whether you're on a phone, tablet, or desktop, the design adapts beautifully
- **Smooth Animations** - Buttons respond to your clicks, cards lift when you hover, and everything feels polished
- **Modern Glass Effect** - The navigation bar has a subtle blur effect that looks really sleek
- **Mobile-Friendly Menu** - On smaller screens, a hamburger menu appears that slides in smoothly
- **Progress Indicator** - A thin bar at the top shows how far you've scrolled (helpful on long pages!)
## The Color Story
I chose a warm, earthy color palette that feels authentic and elegant:
- **Burgundy** (#72383D) - The main color, used for buttons and accents
- **Dark Brown** (#322D29) - For text and footer, gives it a grounded feel
- **Taupe** (#AC9C8D) - Accent color for borders and subtle highlights
- **Cream & Beige** (#EFE9E1, #D1C7BD) - Soft backgrounds that are easy on the eyes
## Pages Overview
- **Home** (`index.html`) - Your starting point with a warm welcome and quick access to the menu
- **Menu** (`menu.html`) - Browse all items, filter by category, and add to cart
- **Item Details** (`item.html`) - Deep dive into any menu item with full information
- **Checkout** (`checkout.html`) - Review your order and enter delivery details
- **Team** (`team.html`) - Meet the talented chefs and staff
## How It Works
### For Users
1. Start at the home page and click "Go to Menu"
2. Browse items by scrolling through categories or use the filter buttons
3. Click any item to see more details (nutrition info, ratings, etc.)
4. Add items to your cart - you can adjust quantities anytime
5. When ready, head to checkout and fill in your delivery information
6. Don't forget to check out the team page to see who's making your food!
### Behind the Scenes
The cart uses browser localStorage, so your items stay saved even if you navigate away. The code is organized into separate JavaScript files for each page, making it easy to maintain and update.
## Tech Stack
I used modern web technologies to build this:
- **HTML5** - Clean, semantic markup
- **CSS3** - Flexbox, Grid, CSS variables, backdrop filters, and smooth animations
- **JavaScript ES6+** - Classes, private fields, inheritance, and all the good OOP stuff
Everything is vanilla JavaScript - no frameworks needed! This makes it lightweight and fast.
## Project Structure
Here's how everything is organized:

```
├── index.html          # Home sweet home
├── menu.html          # Where the magic happens
├── item.html          # Item details page
├── checkout.html      # Final step before food arrives
├── team.html          # Meet the team
├── css/
│   └── style.css      # All the styling in one place
├── js/
│   ├── classes.js     # The OOP classes (MenuItem, OrderManager, etc.)
│   ├── main.js        # Home page logic
│   ├── menu.js        # Menu page functionality
│   ├── item.js        # Item detail page
│   ├── checkout.js    # Checkout and cart management
│   └── team.js        # Team page rendering
├── images/            # All the delicious food photos
└── README.md          # You're reading it!
```

## OOP Concepts Explained Simply
### Encapsulation
The `OrderManager` class keeps its cart items private (using `#items`). You can't directly access or modify them - you have to use the public methods like `addItem()` or `removeItem()`. This protects the data and ensures everything works correctly.
**Location**: `js/classes.js` lines 98-250
### Inheritance
Instead of writing the same code twice, `FoodItem` and `DrinkItem` both extend the base `MenuItem` class. They inherit all the common properties (name, price, image) and can add their own special features.
**Location**: `js/classes.js` lines 1-68
### Polymorphism
Both `FoodItem` and `DrinkItem` have a `displayInfo()` method, but they return different messages. When you call it, JavaScript automatically uses the right version based on the object type. Pretty cool, right?
**Location**: `js/classes.js` lines 12-67
## Browser Compatibility
I've tested it on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
Should work great on all of them!
## A Few Notes
- Your cart is saved in the browser's localStorage, so it persists between sessions
- Every menu item includes nutrition information for those who want to know
- Want to change the colors? Just edit the CSS variables in `css/style.css` - they're all at the top in the `:root` section
- All images should go in the `images/` folder
## Getting Started
Just open `index.html` in your browser and start exploring! No build process, no npm install, no complicated setup - just pure, simple web technologies.
## Final Thoughts
This project was built with care and attention to detail. Every animation, every color choice, and every line of code was crafted to create the best possible experience. I hope you enjoy using it as much as I enjoyed building it!
If you have questions or suggestions, feel free to reach out. Happy coding! 🚀
© 2025 Cairo Bites. All rights reserved. Made with ❤️ in Egypt.

*Built with modern web technologies and a passion for great user experiences.*
