// Navbar JavaScript
class Navbar {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.menuIcon = document.getElementById('menu-icon');
        this.closeIcon = document.getElementById('close-icon');
        this.isMobileMenuOpen = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveNavItem();
    }

    bindEvents() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Handle logout
        const logoutBtns = document.querySelectorAll('.logout-btn, .mobile-logout-btn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleLogout());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && !e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        if (this.isMobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenu.classList.remove('hidden');
        this.menuIcon.classList.add('hidden');
        this.closeIcon.classList.remove('hidden');
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.mobileMenu.classList.add('hidden');
        this.menuIcon.classList.remove('hidden');
        this.closeIcon.classList.add('hidden');
        this.isMobileMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    handleLogout() {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Show logout confirmation
        this.showNotification('Logged out successfully', 'success');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Set notification style based on type
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                break;
            case 'warning':
                notification.classList.add('bg-yellow-500', 'text-white');
                break;
            default:
                notification.classList.add('bg-blue-500', 'text-white');
        }
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${message}</span>
                <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    updateUserInfo(user) {
        // Update user name and role in navbar
        const userNameElements = document.querySelectorAll('.user-name');
        const userRoleElements = document.querySelectorAll('.user-role');
        
        userNameElements.forEach(el => {
            if (el) el.textContent = user.name;
        });
        
        userRoleElements.forEach(el => {
            if (el) el.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        });
    }

    showUserMenu() {
        // Show/hide navigation items based on user role
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (user.role === 'admin') {
            // Show admin-specific navigation items
            this.showAdminNavItems();
        } else if (user.role === 'citizen') {
            // Show citizen-specific navigation items
            this.showCitizenNavItems();
        }
    }

    showAdminNavItems() {
        // Implementation for admin navigation items
        console.log('Showing admin navigation items');
    }

    showCitizenNavItems() {
        // Implementation for citizen navigation items
        console.log('Showing citizen navigation items');
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navbar;
}