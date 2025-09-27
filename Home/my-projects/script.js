// My Projects JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSearch();
    initializeSort();
    initializeProjectActions();
});

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('empty-state');
    const projectsGrid = document.getElementById('projects-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    function filterProjects(filter) {
        let visibleCount = 0;

        projectCards.forEach(card => {
            const status = card.getAttribute('data-status');
            const shouldShow = filter === 'all' || status === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide empty state
        if (visibleCount === 0) {
            projectsGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            projectsGrid.style.display = 'grid';
            emptyState.style.display = 'none';
        }
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const projectCards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('empty-state');
    const projectsGrid = document.getElementById('projects-grid');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
            
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide empty state
        if (visibleCount === 0 && searchTerm !== '') {
            projectsGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            projectsGrid.style.display = 'grid';
            emptyState.style.display = 'none';
        }
    });
}

// Sort functionality
function initializeSort() {
    const sortSelect = document.getElementById('sort-select');
    const projectsGrid = document.getElementById('projects-grid');

    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const projectCards = Array.from(document.querySelectorAll('.project-card'));
        
        projectCards.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
                case 'oldest':
                    return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
                case 'popular':
                    const aViews = parseInt(a.querySelector('.stat').textContent.match(/\d+/)[0]);
                    const bViews = parseInt(b.querySelector('.stat').textContent.match(/\d+/)[0]);
                    return bViews - aViews;
                case 'name':
                    const aName = a.querySelector('h3').textContent.toLowerCase();
                    const bName = b.querySelector('h3').textContent.toLowerCase();
                    return aName.localeCompare(bName);
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        projectCards.forEach(card => {
            projectsGrid.appendChild(card);
        });
    });
}

// Project actions
function initializeProjectActions() {
    // Edit button
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            editProject(projectTitle);
        });
    });

    // Publish button
    document.querySelectorAll('.publish-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            publishProject(projectCard, projectTitle);
        });
    });

    // Stats button
    document.querySelectorAll('.stats-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            showProjectStats(projectTitle);
        });
    });

    // Delete button
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            deleteProject(projectCard, projectTitle);
        });
    });

    // Play button
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            playProject(projectTitle);
        });
    });
}

function editProject(title) {
    // Simulate navigation to edit page
    showNotification(`"${title}" düzenleme sayfasına yönlendiriliyorsunuz...`, 'info');
    
    // In a real app, this would navigate to the edit page
    setTimeout(() => {
        showNotification('Düzenleme sayfası henüz hazır değil.', 'warning');
    }, 1000);
}

function publishProject(projectCard, title) {
    const statusElement = projectCard.querySelector('.project-status');
    const publishBtn = projectCard.querySelector('.publish-btn');
    
    // Show confirmation
    if (confirm(`"${title}" projesini yayınlamak istediğinizden emin misiniz?`)) {
        // Update status
        statusElement.textContent = 'Yayınlandı';
        statusElement.className = 'project-status published';
        
        // Update button
        publishBtn.innerHTML = '<i class="fas fa-chart-bar"></i> İstatistikler';
        publishBtn.className = 'action-btn stats-btn';
        
        // Add click event to new stats button
        publishBtn.addEventListener('click', function() {
            showProjectStats(title);
        });
        
        showNotification(`"${title}" başarıyla yayınlandı!`, 'success');
    }
}

function showProjectStats(title) {
    // Create stats modal
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title} - İstatistikler</h3>
                    <button class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">1,234</div>
                            <div class="stat-label">Toplam Görüntülenme</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">567</div>
                            <div class="stat-label">Beğeni</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">89</div>
                            <div class="stat-label">Yorum</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">23</div>
                            <div class="stat-label">Satış</div>
                        </div>
                    </div>
                    <div class="chart-placeholder">
                        <i class="fas fa-chart-line"></i>
                        <p>Grafik burada görünecek</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .stats-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .modal-header h3 {
            margin: 0;
            color: #1f2937;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #6b7280;
        }
        .modal-body {
            padding: 1.5rem;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .stat-item {
            text-align: center;
            padding: 1rem;
            background: #f9fafb;
            border-radius: 8px;
        }
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #0047c4;
            margin-bottom: 0.5rem;
        }
        .stat-label {
            color: #6b7280;
            font-size: 0.9rem;
        }
        .chart-placeholder {
            text-align: center;
            padding: 3rem;
            background: #f9fafb;
            border-radius: 8px;
            color: #6b7280;
        }
        .chart-placeholder i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', function() {
        modal.remove();
        style.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            modal.remove();
            style.remove();
        }
    });
}

function deleteProject(projectCard, title) {
    if (confirm(`"${title}" projesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
        // Animate removal
        projectCard.style.transition = 'all 0.3s ease';
        projectCard.style.transform = 'scale(0.8)';
        projectCard.style.opacity = '0';
        
        setTimeout(() => {
            projectCard.remove();
            showNotification(`"${title}" projesi silindi.`, 'success');
            
            // Check if no projects left
            const remainingProjects = document.querySelectorAll('.project-card');
            if (remainingProjects.length === 0) {
                document.getElementById('projects-grid').style.display = 'none';
                document.getElementById('empty-state').style.display = 'block';
            }
        }, 300);
    }
}

function playProject(title) {
    showNotification(`"${title}" çalınıyor...`, 'info');
    
    // In a real app, this would start audio playback
    setTimeout(() => {
        showNotification('Müzik çalma özelliği yakında eklenecek.', 'info');
    }, 1000);
}

function clearFilters() {
    // Reset search
    document.getElementById('search-input').value = '';
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-filter="all"]').classList.add('active');
    
    // Reset sort
    document.getElementById('sort-select').value = 'newest';
    
    // Show all projects
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = 'block';
    });
    
    document.getElementById('projects-grid').style.display = 'grid';
    document.getElementById('empty-state').style.display = 'none';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
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
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
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
