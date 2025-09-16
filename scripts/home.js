// Home Page JavaScript
class HomePage {
    constructor() {
        this.stats = {
            activeBins: 1247,
            activeCitizens: 3429,
            zonesCovered: 12,
            efficiencyScore: 94
        };
        
        this.init();
    }

    init() {
        this.animateStats();
        this.bindEvents();
        this.checkUserStatus();
    }

    checkUserStatus() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        
        if (user.id && token) {
            // User is logged in, update CTA buttons
            this.updateCTAForLoggedInUser(user);
        }
    }

    updateCTAForLoggedInUser(user) {
        const ctaButtons = document.querySelectorAll('a[href="/login"]');
        ctaButtons.forEach(button => {
            if (user.role === 'admin') {
                button.href = '/admin';
                button.innerHTML = button.innerHTML.replace('Get Started', 'Go to Dashboard');
                button.innerHTML = button.innerHTML.replace('Join EcoWaste', 'Go to Dashboard');
            } else if (user.role === 'citizen') {
                button.href = '/dashboard';
                button.innerHTML = button.innerHTML.replace('Get Started', 'Go to Dashboard');
                button.innerHTML = button.innerHTML.replace('Join EcoWaste', 'Go to Dashboard');
            }
        });
    }

    animateStats() {
        const statElements = document.querySelectorAll('.stat-card .text-2xl');
        
        statElements.forEach((element, index) => {
            const finalValue = this.getStatValue(index);
            this.animateNumber(element, 0, finalValue, 2000);
        });
    }

    getStatValue(index) {
        const values = [
            this.stats.activeBins,
            this.stats.activeCitizens,
            this.stats.zonesCovered,
            this.stats.efficiencyScore
        ];
        return values[index] || 0;
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const isPercentage = element.textContent.includes('%');
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            if (isPercentage) {
                element.textContent = current + '%';
            } else {
                element.textContent = this.formatNumber(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num.toString();
    }

    bindEvents() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add hover effects to feature cards
        this.addFeatureCardEffects();
        
        // Add intersection observer for animations
        this.setupScrollAnimations();
        
        // Add click tracking for analytics
        this.setupAnalytics();
    }

    addFeatureCardEffects() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe feature cards and stats
        document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupAnalytics() {
        // Track CTA button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                const href = button.getAttribute('href');
                
                // Log analytics event (replace with actual analytics service)
                console.log('Button clicked:', {
                    text: buttonText,
                    href: href,
                    timestamp: new Date().toISOString()
                });
            });
        });

        // Track feature card interactions
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                console.log('Feature card clicked:', {
                    title: title,
                    index: index,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    // Method to update stats dynamically (for real-time updates)
    updateStats(newStats) {
        this.stats = { ...this.stats, ...newStats };
        this.animateStats();
    }

    // Method to show notification messages
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
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
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Method to handle newsletter subscription (if added)
    handleNewsletterSignup(email) {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Mock API call
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
        }, 1000);
    }
}

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .stat-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize home page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomePage;
}