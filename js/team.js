// Team members data
const teamMembers = [
    {
        name: "Shahd Ismail",
        role: "192300203",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Lojain Hesham",
        role: "192200304",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Nancy Mohamed",
        role: "192200204",
        social: {
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "Salma Mohamed",
        role: "192200204",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Habiba Mahmoud",
        role: "192200356",
        social: {
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    }
];

// Render team members
function renderTeam() {
    const teamGrid = document.querySelector('#teamGrid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        
        card.innerHTML = `
            <div class="team-card-content">
                <h3>${member.name}</h3>
                <span class="team-card-role-badge">${member.role}</span>
            </div>
        `;
        
        teamGrid.appendChild(card);
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

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTeam();
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

