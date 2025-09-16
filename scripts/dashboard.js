// Citizen Dashboard JavaScript
class CitizenDashboard {
    constructor() {
        this.map = null;
        this.bins = [];
        this.selectedBin = null;
        this.currentRating = 0;
        this.feedbackList = [];
        
        this.init();
    }

    init() {
        this.initializeMap();
        this.loadBinData();
        this.bindEvents();
        this.checkAuthentication();
    }

    checkAuthentication() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id || user.role !== 'citizen') {
            window.location.href = '/login';
            return;
        }
        
        // Update user info in the header
        const welcomeText = document.querySelector('h1');
        if (welcomeText) {
            welcomeText.textContent = `Welcome back, ${user.name}!`;
        }
    }

    initializeMap() {
        // Initialize Leaflet map
        this.map = L.map('map').setView([40.7128, -74.0060], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    loadBinData() {
        // Mock bin data - replace with actual API call
        this.bins = [
            {
                id: '1',
                binId: 'BIN001',
                location: { 
                    lat: 40.7128, 
                    lng: -74.0060, 
                    address: '123 Main St, New York, NY' 
                },
                fillLevel: 85,
                lastEmptied: new Date('2024-01-15'),
                zone: 'Zone A',
                status: 'normal',
                capacity: 100
            },
            {
                id: '2',
                binId: 'BIN002',
                location: { 
                    lat: 40.7580, 
                    lng: -73.9855, 
                    address: '456 Park Ave, New York, NY' 
                },
                fillLevel: 95,
                lastEmptied: new Date('2024-01-14'),
                zone: 'Zone A',
                status: 'full',
                capacity: 100
            },
            {
                id: '3',
                binId: 'BIN003',
                location: { 
                    lat: 40.7505, 
                    lng: -73.9934, 
                    address: '789 Broadway, New York, NY' 
                },
                fillLevel: 45,
                lastEmptied: new Date('2024-01-16'),
                zone: 'Zone B',
                status: 'normal',
                capacity: 100
            },
            {
                id: '4',
                binId: 'BIN004',
                location: { 
                    lat: 40.7282, 
                    lng: -73.7949, 
                    address: '321 Queens Blvd, Queens, NY' 
                },
                fillLevel: 78,
                lastEmptied: new Date('2024-01-13'),
                zone: 'Zone B',
                status: 'maintenance',
                capacity: 100
            }
        ];

        this.addBinsToMap();
        this.updateStats();
    }

    addBinsToMap() {
        this.bins.forEach(bin => {
            const color = this.getBinColor(bin.fillLevel, bin.status);
            
            const marker = L.circleMarker([bin.location.lat, bin.location.lng], {
                color: color,
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6,
                fillColor: color,
                radius: 8
            }).addTo(this.map);

            // Create popup content
            const popupContent = this.createPopupContent(bin);
            marker.bindPopup(popupContent);
            
            // Add click event
            marker.on('click', () => {
                this.selectBin(bin);
            });
        });
    }

    createPopupContent(bin) {
        const statusColor = this.getStatusColor(bin.status);
        
        return `
            <div style="min-width: 200px; padding: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <div style="width: 20px; height: 20px; background-color: ${this.getBinColor(bin.fillLevel, bin.status)}; border-radius: 50%;"></div>
                    <h3 style="margin: 0; font-weight: 600;">Bin ${bin.binId}</h3>
                </div>
                
                <div style="font-size: 14px; line-height: 1.4;">
                    <p style="margin: 4px 0;"><strong>Location:</strong> ${bin.location.address}</p>
                    <p style="margin: 4px 0;"><strong>Fill Level:</strong> ${bin.fillLevel}%</p>
                    <p style="margin: 4px 0;"><strong>Zone:</strong> ${bin.zone}</p>
                    <p style="margin: 4px 0;"><strong>Status:</strong> 
                        <span style="color: ${statusColor}; font-weight: 500; text-transform: capitalize;">
                            ${bin.status}
                        </span>
                    </p>
                    <p style="margin: 4px 0;"><strong>Last Emptied:</strong> ${bin.lastEmptied.toLocaleDateString()}</p>
                </div>
                
                <div style="margin: 12px 0 8px;">
                    <div style="width: 100%; background-color: #e5e7eb; border-radius: 9999px; height: 8px;">
                        <div style="height: 8px; border-radius: 9999px; background-color: ${this.getBinColor(bin.fillLevel, bin.status)}; width: ${bin.fillLevel}%; transition: width 0.3s;"></div>
                    </div>
                </div>
                
                <button onclick="window.dashboard.openFeedbackModal('${bin.id}')" 
                        style="width: 100%; background: linear-gradient(135deg, #10B981 0%, #3B82F6 100%); color: white; padding: 8px 12px; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; margin-top: 8px;">
                    Provide Feedback
                </button>
            </div>
        `;
    }

    getBinColor(fillLevel, status) {
        if (status === 'maintenance') return '#9CA3AF';
        if (status === 'overflow') return '#EF4444';
        if (fillLevel >= 90) return '#F59E0B';
        if (fillLevel >= 70) return '#F97316';
        if (fillLevel >= 50) return '#10B981';
        return '#22C55E';
    }

    getStatusColor(status) {
        switch (status) {
            case 'overflow': return '#EF4444';
            case 'maintenance': return '#F59E0B';
            default: return '#10B981';
        }
    }

    selectBin(bin) {
        this.selectedBin = bin;
    }

    bindEvents() {
        // Feedback button
        document.getElementById('feedback-btn').addEventListener('click', () => {
            this.openFeedbackModal();
        });

        // Modal close buttons
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeFeedbackModal();
        });

        document.getElementById('cancel-feedback').addEventListener('click', () => {
            this.closeFeedbackModal();
        });

        // Star rating
        const starButtons = document.querySelectorAll('.star-btn');
        starButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.setRating(index + 1);
            });
            
            btn.addEventListener('mouseenter', () => {
                this.highlightStars(index + 1);
            });
        });

        document.getElementById('star-rating').addEventListener('mouseleave', () => {
            this.highlightStars(this.currentRating);
        });

        // Feedback form submission
        document.getElementById('feedback-form').addEventListener('submit', (e) => {
            this.handleFeedbackSubmit(e);
        });

        // Close modal when clicking outside
        document.getElementById('feedback-modal').addEventListener('click', (e) => {
            if (e.target.id === 'feedback-modal') {
                this.closeFeedbackModal();
            }
        });
    }

    openFeedbackModal(binId = null) {
        let bin = this.selectedBin;
        
        if (binId) {
            bin = this.bins.find(b => b.id === binId);
        }
        
        if (!bin) {
            bin = this.bins[0]; // Default to first bin if none selected
        }
        
        this.selectedBin = bin;
        
        // Update modal content
        document.getElementById('modal-bin-id').textContent = bin.binId;
        document.getElementById('modal-bin-location').textContent = bin.location.address;
        document.getElementById('modal-bin-fill').textContent = bin.fillLevel;
        
        // Reset form
        this.resetFeedbackForm();
        
        // Show modal
        document.getElementById('feedback-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeFeedbackModal() {
        document.getElementById('feedback-modal').classList.add('hidden');
        document.body.style.overflow = '';
        this.resetFeedbackForm();
    }

    resetFeedbackForm() {
        this.currentRating = 0;
        this.highlightStars(0);
        document.getElementById('comment').value = '';
        document.getElementById('submit-feedback').disabled = true;
    }

    setRating(rating) {
        this.currentRating = rating;
        this.highlightStars(rating);
        document.getElementById('submit-feedback').disabled = rating === 0;
    }

    highlightStars(count) {
        const starButtons = document.querySelectorAll('.star-btn');
        starButtons.forEach((btn, index) => {
            const icon = btn.querySelector('.star-icon');
            if (index < count) {
                icon.style.color = '#FBBF24';
                icon.style.fill = 'currentColor';
                btn.classList.add('active');
            } else {
                icon.style.color = '#D1D5DB';
                icon.style.fill = 'none';
                btn.classList.remove('active');
            }
        });
    }

    handleFeedbackSubmit(e) {
        e.preventDefault();
        
        if (!this.selectedBin || this.currentRating === 0) {
            return;
        }

        const comment = document.getElementById('comment').value;
        
        const feedback = {
            id: Date.now().toString(),
            userId: JSON.parse(localStorage.getItem('user')).id,
            binId: this.selectedBin.id,
            binName: this.selectedBin.binId,
            rating: this.currentRating,
            comment: comment,
            timestamp: new Date(),
            status: 'pending'
        };

        // Add to feedback list
        this.feedbackList.unshift(feedback);
        this.updateFeedbackDisplay();
        this.updateStats();
        
        // Show success message
        this.showNotification('Feedback submitted successfully! Thank you for helping keep our city clean.', 'success');
        
        // Close modal
        this.closeFeedbackModal();
    }

    updateFeedbackDisplay() {
        const feedbackContainer = document.getElementById('feedback-list');
        
        if (this.feedbackList.length === 0) {
            feedbackContainer.innerHTML = `
                <div class="text-gray-500 text-center py-4">
                    No feedback given yet. Help improve your neighborhood by providing feedback!
                </div>
            `;
            return;
        }

        feedbackContainer.innerHTML = this.feedbackList.slice(0, 3).map(feedback => `
            <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium">Bin ${feedback.binName}</span>
                    <div class="flex text-yellow-400">
                        ${'⭐'.repeat(feedback.rating)}
                    </div>
                </div>
                ${feedback.comment ? `<p class="text-sm text-gray-600">${feedback.comment}</p>` : ''}
                <span class="text-xs text-gray-500">
                    ${feedback.timestamp.toLocaleDateString()}
                </span>
            </div>
        `).join('');
    }

    updateStats() {
        // Update feedback count
        const feedbackStat = document.querySelector('.stat-card:nth-child(2) .text-2xl');
        if (feedbackStat) {
            feedbackStat.textContent = this.feedbackList.length;
        }

        // Update nearby bins count
        const binsStat = document.querySelector('.stat-card:nth-child(4) .text-2xl');
        if (binsStat) {
            binsStat.textContent = this.bins.length;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full max-w-sm`;
        
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
            <div class="flex items-start space-x-2">
                <span class="flex-1">${message}</span>
                <button class="text-white hover:text-gray-200 ml-2" onclick="this.parentElement.parentElement.remove()">
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
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new CitizenDashboard();
});