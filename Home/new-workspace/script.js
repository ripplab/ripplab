// New Workspace JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeUpload();
    initializeForm();
});

// Upload functionality
function initializeUpload() {
    const uploadCard = document.querySelector('.upload-card');
    const fileInput = document.getElementById('music-file');
    const fileInfo = document.getElementById('file-info');
    const fileName = fileInfo.querySelector('.file-name');
    const fileSize = fileInfo.querySelector('.file-size');

    // Drag and drop functionality
    uploadCard.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadCard.classList.add('dragover');
    });

    uploadCard.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadCard.classList.remove('dragover');
    });

    uploadCard.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadCard.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    function handleFileSelect(file) {
        // Validate file type
        if (!file.type.startsWith('audio/')) {
            alert('Lütfen sadece ses dosyaları yükleyin.');
            return;
        }

        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
            alert('Dosya boyutu 50MB\'dan küçük olmalıdır.');
            return;
        }

        // Display file info
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.style.display = 'flex';
        
        // Store file for upload
        window.selectedFile = file;
    }
}

function removeFile() {
    const fileInfo = document.getElementById('file-info');
    const fileInput = document.getElementById('music-file');
    
    fileInfo.style.display = 'none';
    fileInput.value = '';
    window.selectedFile = null;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form functionality
function initializeForm() {
    const form = document.getElementById('upload-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!window.selectedFile) {
            alert('Lütfen bir dosya seçin.');
            return;
        }
        
        const formData = new FormData();
        const formElements = form.elements;
        
        // Add file
        formData.append('file', window.selectedFile);
        
        // Add form data
        for (let element of formElements) {
            if (element.name && element.type !== 'file') {
                if (element.type === 'checkbox') {
                    formData.append(element.name, element.checked);
                } else {
                    formData.append(element.name, element.value);
                }
            }
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
        submitBtn.disabled = true;
        
        // Simulate upload (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            removeFile();
        }, 2000);
    });
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Eseriniz başarıyla yüklendi!</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

function goBack() {
    window.location.href = '../index.html';
}

// Auto-save form data to localStorage
function autoSaveForm() {
    const form = document.getElementById('upload-form');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('newWorkspaceForm', JSON.stringify(data));
}

// Load saved form data
function loadSavedForm() {
    const savedData = localStorage.getItem('newWorkspaceForm');
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById('upload-form');
        
        for (let [key, value] of Object.entries(data)) {
            const element = form.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value === 'true';
                } else {
                    element.value = value;
                }
            }
        }
    }
}

// Clear saved form data
function clearSavedForm() {
    localStorage.removeItem('newWorkspaceForm');
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function() {
    loadSavedForm();
    
    const form = document.getElementById('upload-form');
    form.addEventListener('input', autoSaveForm);
    form.addEventListener('change', autoSaveForm);
    
    // Clear saved data on successful submit
    form.addEventListener('submit', function() {
        setTimeout(clearSavedForm, 1000);
    });
});
