// Team members data
const teamMembers = [
    {
        name: "Ahmed Hassan",
        role: "Head Chef",
        description: "Master chef with 15 years of experience in traditional Egyptian cuisine. Passionate about bringing authentic flavors to every dish.",
        image: "https://source.unsplash.com/200x200/?chef-man",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Fatima Ali",
        role: "Pastry Chef",
        description: "Expert in creating traditional Egyptian desserts. Her baklava and basbousa are legendary among our customers.",
        image: "https://source.unsplash.com/200x200/?chef-woman",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Mohamed Salah",
        role: "Restaurant Manager",
        description: "Ensuring smooth operations and exceptional customer service. He's the heart of Cairo Bites' hospitality.",
        image: "https://source.unsplash.com/200x200/?manager-man",
        social: {
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "Layla Ibrahim",
        role: "Sous Chef",
        description: "Specialized in grilled dishes and kebabs. Her attention to detail makes every meal perfect.",
        image: "https://source.unsplash.com/200x200/?chef-woman-2",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Omar Farouk",
        role: "Service Manager",
        description: "Leading our service team to provide the best dining experience. Always with a smile and ready to help.",
        image: "https://source.unsplash.com/200x200/?waiter-man",
        social: {
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "Nour Khaled",
        role: "Marketing Director",
        description: "Spreading the word about our delicious food. She's behind our social media presence and customer engagement.",
        image: "https://source.unsplash.com/200x200/?business-woman",
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
        
        const socialLinks = Object.entries(member.social).map(([platform, url]) => {
            const icons = {
                facebook: 'fab fa-facebook',
                instagram: 'fab fa-instagram',
                twitter: 'fab fa-twitter',
                linkedin: 'fab fa-linkedin'
            };
            return `<a href="${url}" target="_blank" aria-label="${platform}"><i class="${icons[platform]}"></i></a>`;
        }).join('');
        
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="team-card-image" onerror="this.src='https://via.placeholder.com/200?text=${encodeURIComponent(member.name)}'">
            <h3>${member.name}</h3>
            <p class="team-card-role">${member.role}</p>
            <p class="team-card-description">${member.description}</p>
            <div class="team-card-social">
                ${socialLinks}
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
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
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

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTeam();
    order.updateCartBadge();
    initMobileMenu();
    initNavbarScroll();
    initScrollProgress();
    
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
