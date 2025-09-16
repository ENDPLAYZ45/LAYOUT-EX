// Login/Registration JavaScript
class AuthForm {
    constructor() {
        this.isLogin = true;
        this.form = document.getElementById('auth-form');
        this.toggleBtn = document.getElementById('toggle-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.errorMessage = document.getElementById('error-message');
        this.nameField = document.getElementById('name-field');
        this.formTitle = document.getElementById('form-title');
        this.formSubtitle = document.getElementById('form-subtitle');
        this.submitText = document.getElementById('submit-text');
        this.loginIcon = document.getElementById('login-icon');
        this.loadingSpinner = document.getElementById('loading-spinner');

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFormState();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.toggleBtn.addEventListener('click', () => this.toggleFormMode());
        
        // Auto-fill demo credentials
        this.addDemoCredentialHandlers();
    }

    addDemoCredentialHandlers() {
        // Add click handlers to demo credential text
        const demoSection = document.querySelector('.bg-blue-50');
        if (demoSection) {
            const citizenText = demoSection.querySelector('p:first-of-type');
            const adminText = demoSection.querySelector('p:nth-of-type(2)');
            
            if (citizenText) {
                citizenText.style.cursor = 'pointer';
                citizenText.addEventListener('click', () => {
                    document.getElementById('email').value = 'citizen@example.com';
                    document.getElementById('password').value = 'password';
                });
            }
            
            if (adminText) {
                adminText.style.cursor = 'pointer';
                adminText.addEventListener('click', () => {
                    document.getElementById('email').value = 'admin@example.com';
                    document.getElementById('password').value = 'password';
                });
            }
        }
    }

    toggleFormMode() {
        this.isLogin = !this.isLogin;
        this.updateFormState();
        this.clearError();
    }

    updateFormState() {
        if (this.isLogin) {
            // Login mode
            this.formTitle.textContent = 'Welcome back';
            this.formSubtitle.textContent = 'Sign in to your EcoWaste account';
            this.submitText.textContent = 'Sign In';
            this.toggleBtn.textContent = "Don't have an account? Sign up";
            this.nameField.classList.add('hidden');
            this.nameField.querySelector('input').required = false;
        } else {
            // Registration mode
            this.formTitle.textContent = 'Create account';
            this.formSubtitle.textContent = 'Join the EcoWaste community';
            this.submitText.textContent = 'Create Account';
            this.toggleBtn.textContent = 'Already have an account? Sign in';
            this.nameField.classList.remove('hidden');
            this.nameField.querySelector('input').required = true;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        this.setLoading(true);
        this.clearError();

        try {
            if (this.isLogin) {
                const success = await this.login(email, password);
                if (success) {
                    this.showSuccess('Login successful! Redirecting...');
                    setTimeout(() => {
                        this.redirectUser();
                    }, 1000);
                } else {
                    this.showError('Invalid credentials. Please try again.');
                }
            } else {
                // Registration (mock implementation)
                this.showError('Registration not implemented in demo. Please use login credentials.');
            }
        } catch (error) {
            this.showError('An error occurred. Please try again.');
            console.error('Auth error:', error);
        } finally {
            this.setLoading(false);
        }
    }

    async login(email, password) {
        // Mock authentication - replace with actual API call
        const mockUsers = [
            { 
                id: '1', 
                name: 'John Citizen', 
                email: 'citizen@example.com', 
                role: 'citizen', 
                points: 150, 
                zone: 'Zone A' 
            },
            { 
                id: '2', 
                name: 'Admin User', 
                email: 'admin@example.com', 
                role: 'admin', 
                zone: 'All Zones' 
            },
            { 
                id: '3', 
                name: 'Collector Joe', 
                email: 'collector@example.com', 
                role: 'collector', 
                zone: 'Zone B' 
            }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
            // Store user data
            localStorage.setItem('token', 'mock-jwt-token');
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
        return false;
    }

    redirectUser() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        switch (user.role) {
            case 'admin':
                window.location.href = '/admin';
                break;
            case 'citizen':
                window.location.href = '/dashboard';
                break;
            case 'collector':
                window.location.href = '/collector';
                break;
            default:
                window.location.href = '/';
        }
    }

    setLoading(loading) {
        this.submitBtn.disabled = loading;
        
        if (loading) {
            this.loginIcon.classList.add('hidden');
            this.loadingSpinner.classList.remove('hidden');
        } else {
            this.loginIcon.classList.remove('hidden');
            this.loadingSpinner.classList.add('hidden');
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.clearError();
        }, 5000);
    }

    showSuccess(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-50 border text-green-600 px-4 py-3 rounded-lg';
        successDiv.style.borderColor = 'var(--green-200)';
        successDiv.textContent = message;
        
        // Insert before error message
        this.errorMessage.parentNode.insertBefore(successDiv, this.errorMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }

    clearError() {
        this.errorMessage.classList.add('hidden');
        this.errorMessage.textContent = '';
    }

    // Utility methods for form validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    // Enhanced form validation
    validateForm() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address.');
            return false;
        }

        if (!this.validatePassword(password)) {
            this.showError('Password must be at least 6 characters long.');
            return false;
        }

        if (!this.isLogin && !this.validateName(name)) {
            this.showError('Please enter a valid name (at least 2 characters).');
            return false;
        }

        return true;
    }
}

// Initialize auth form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthForm();
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        // User is already logged in, redirect to appropriate dashboard
        const userData = JSON.parse(user);
        switch (userData.role) {
            case 'admin':
                window.location.href = '/admin';
                break;
            case 'citizen':
                window.location.href = '/dashboard';
                break;
            default:
                window.location.href = '/';
        }
    }
});