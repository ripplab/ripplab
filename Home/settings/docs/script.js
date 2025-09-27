// Settings Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeSettingsPage();
});

function initializeSettingsPage() {
    // Initialize menu navigation
    initializeMenuNavigation();
    
    // Initialize theme switching
    initializeThemeSwitching();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize toggle switches
    initializeToggleSwitches();
    
    // Load saved theme
    loadSavedTheme();
}

// Menu Navigation
function initializeMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.settings-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Remove active class from all menu items and sections
            menuItems.forEach(menu => menu.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item and corresponding section
            item.classList.add('active');
            const targetSectionElement = document.getElementById(targetSection + '-section');
            if (targetSectionElement) {
                targetSectionElement.classList.add('active');
            }
        });
    });
}

// Theme Switching
function initializeThemeSwitching() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Apply theme
            applyTheme(theme);
            
            // Save theme preference
            localStorage.setItem('theme', theme);
        });
    });
}

function applyTheme(theme) {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('theme-light', 'theme-dark');
    
    if (theme === 'dark') {
        body.classList.add('theme-dark');
    } else if (theme === 'light') {
        body.classList.add('theme-light');
    } else if (theme === 'auto') {
        // Auto theme - check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('theme-dark');
        }
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set active theme option
    const themeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (themeOption) {
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        themeOption.classList.add('active');
    }
    
    // Apply theme
    applyTheme(savedTheme);
}

// Form Handling
function initializeFormHandling() {
    const saveButtons = document.querySelectorAll('.btn-save');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleSaveAction(button);
        });
    });
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleCancelAction(button);
        });
    });
    
    // Upload button
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', handlePhotoUpload);
    }
    
    // Change photo button
    const changePhotoBtn = document.querySelector('.change-photo-btn');
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', handlePhotoUpload);
    }
    
    // Add card button
    const addCardBtn = document.querySelector('.btn-add-card');
    if (addCardBtn) {
        addCardBtn.addEventListener('click', handleAddCard);
    }
    
    // Remove card buttons
    const removeCardBtns = document.querySelectorAll('.btn-remove');
    removeCardBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleRemoveCard(button);
        });
    });
}

function handleSaveAction(button) {
    // Get the settings card containing this button
    const settingsCard = button.closest('.settings-card');
    const section = button.closest('.settings-section');
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Kaydediliyor...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;
        
        // Show success message
        // showNotification('Ayarlar başarıyla kaydedildi!', 'success');
        
        // Save form data to localStorage (for demo purposes)
        saveFormData(section);
    }, 1000);
}

function handleCancelAction(button) {
    const settingsCard = button.closest('.settings-card');
    const inputs = settingsCard.querySelectorAll('input, select, textarea');
    
    // Reset form inputs to their original values
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = input.defaultChecked;
        } else {
            input.value = input.defaultValue;
        }
    });
    
    // showNotification('Değişiklikler iptal edildi', 'info');
}

function handlePhotoUpload() {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                // showNotification('Dosya boyutu 5MB\'dan küçük olmalıdır', 'error');
                alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                // showNotification('Lütfen geçerli bir resim dosyası seçin', 'error');
                alert('Lütfen geçerli bir resim dosyası seçin');
                return;
            }
            
            // Read and display the image
            const reader = new FileReader();
            reader.onload = (e) => {
                const profilePhoto = document.querySelector('.profile-photo-large');
                if (profilePhoto) {
                    profilePhoto.src = e.target.result;
                    // showNotification('Profil fotoğrafı güncellendi', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

function handleAddCard() {
    // showNotification('Yeni kart ekleme özelliği yakında eklenecek', 'info');
}

function handleRemoveCard(button) {
    if (confirm('Bu kartı kaldırmak istediğinizden emin misiniz?')) {
        const paymentMethod = button.closest('.payment-method');
        paymentMethod.style.opacity = '0.5';
        
        setTimeout(() => {
            paymentMethod.remove();
            // showNotification('Kart başarıyla kaldırıldı', 'success');
        }, 300);
    }
}

// Toggle Switches
function initializeToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const toggleItem = toggle.closest('.toggle-item');
            const toggleInfo = toggleItem.querySelector('.toggle-info h4');
            const settingName = toggleInfo.textContent;
            
            if (toggle.checked) {
                // showNotification(`${settingName} aktif edildi`, 'success');
            } else {
                // showNotification(`${settingName} devre dışı bırakıldı`, 'info');
            }
            
            // Save toggle state
            saveToggleState(settingName, toggle.checked);
        });
    });
}

// Data Management
function saveFormData(section) {
    const sectionId = section.id;
    const formData = {};
    
    // Get all form inputs in this section
    const inputs = section.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            formData[input.name || input.id] = input.checked;
        } else {
            formData[input.name || input.id] = input.value;
        }
    });
    
    // Save to localStorage
    localStorage.setItem(`settings_${sectionId}`, JSON.stringify(formData));
}

function saveToggleState(settingName, state) {
    const toggleStates = JSON.parse(localStorage.getItem('toggleStates') || '{}');
    toggleStates[settingName] = state;
    localStorage.setItem('toggleStates', JSON.stringify(toggleStates));
}

function loadToggleStates() {
    const toggleStates = JSON.parse(localStorage.getItem('toggleStates') || '{}');
    
    Object.entries(toggleStates).forEach(([settingName, state]) => {
        const toggleInfo = Array.from(document.querySelectorAll('.toggle-info h4'))
            .find(h4 => h4.textContent === settingName);
        
        if (toggleInfo) {
            const toggle = toggleInfo.closest('.toggle-item').querySelector('input');
            if (toggle) {
                toggle.checked = state;
            }
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);

// Initialize saved states on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadToggleStates();
    }, 100);
});
