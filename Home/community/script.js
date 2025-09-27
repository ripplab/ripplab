// Community JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializePostComposer();
    initializePostActions();
    initializeFollowButtons();
    initializeCollaborationActions();
    initializeEventActions();
});

// Tab functionality
function initializeTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Post composer functionality
function initializePostComposer() {
    const composerInput = document.querySelector('.composer-input input');
    const composerActions = document.querySelectorAll('.composer-btn');
    
    // Focus input when clicking composer
    composerInput.addEventListener('focus', function() {
        this.parentElement.parentElement.style.borderColor = 'var(--primary-blue)';
    });
    
    composerInput.addEventListener('blur', function() {
        this.parentElement.parentElement.style.borderColor = 'var(--light-gray)';
    });
    
    // Handle composer actions
    composerActions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            if (action === 'Paylaş') {
                const content = composerInput.value.trim();
                if (content) {
                    createPost(content);
                    composerInput.value = '';
                } else {
                    showNotification('Lütfen bir şeyler yazın!', 'warning');
                }
            } else if (action.includes('Müzik')) {
                showNotification('Müzik ekleme özelliği yakında eklenecek!', 'info');
            } else if (action.includes('Fotoğraf')) {
                showNotification('Fotoğraf ekleme özelliği yakında eklenecek!', 'info');
            } else if (action.includes('Video')) {
                showNotification('Video ekleme özelliği yakında eklenecek!', 'info');
            }
        });
    });
}

function createPost(content) {
    const feedPosts = document.querySelector('.feed-posts');
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.innerHTML = `
        <div class="post-header">
            <img src="../assets/dalga.png" alt="User" class="post-avatar">
            <div class="post-user-info">
                <h4>Sen</h4>
                <span class="post-time">Şimdi</span>
            </div>
            <button class="post-menu">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        <div class="post-content">
            <p>${content}</p>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn">
                <i class="far fa-heart"></i>
                <span>0</span>
            </button>
            <button class="action-btn comment-btn">
                <i class="far fa-comment"></i>
                <span>0</span>
            </button>
            <button class="action-btn share-btn">
                <i class="fas fa-share"></i>
                <span>Paylaş</span>
            </button>
        </div>
    `;
    
    // Insert at the beginning of feed
    feedPosts.insertBefore(newPost, feedPosts.firstChild);
    
    // Initialize actions for new post
    initializePostActionsForElement(newPost);
    
    showNotification('Gönderiniz paylaşıldı!', 'success');
}

// Post actions functionality
function initializePostActions() {
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        initializePostActionsForElement(card);
    });
}

function initializePostActionsForElement(postCard) {
    // Like button
    const likeBtn = postCard.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent);
            
            if (icon.classList.contains('far')) {
                // Like
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('liked');
                count++;
            } else {
                // Unlike
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('liked');
                count--;
            }
            
            countSpan.textContent = count;
        });
    }
    
    // Comment button
    const commentBtn = postCard.querySelector('.comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            showNotification('Yorum özelliği yakında eklenecek!', 'info');
        });
    }
    
    // Share button
    const shareBtn = postCard.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            showNotification('Paylaşım özelliği yakında eklenecek!', 'info');
        });
    }
    
    // Play button
    const playBtn = postCard.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            showNotification('Müzik çalma özelliği yakında eklenecek!', 'info');
        });
    }
}

// Follow buttons functionality
function initializeFollowButtons() {
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isFollowing = this.textContent.includes('Takip Et');
            
            if (isFollowing) {
                this.textContent = 'Takip Ediliyor';
                this.style.background = 'var(--success)';
                showNotification('Takip edilmeye başlandı!', 'success');
            } else {
                this.textContent = 'Takip Et';
                this.style.background = 'var(--primary-blue)';
                showNotification('Takip edilmeyi bıraktınız!', 'info');
            }
        });
    });
}

// Collaboration actions
function initializeCollaborationActions() {
    const collaborationCards = document.querySelectorAll('.collaboration-card');
    
    collaborationCards.forEach(card => {
        const detailBtn = card.querySelector('.btn-secondary');
        const applyBtn = card.querySelector('.btn-primary');
        
        if (detailBtn) {
            detailBtn.addEventListener('click', function() {
                showNotification('Detay sayfası yakında eklenecek!', 'info');
            });
        }
        
        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                const collabTitle = card.querySelector('h5').textContent;
                if (confirm(`"${collabTitle}" işbirliğine başvurmak istediğinizden emin misiniz?`)) {
                    this.textContent = 'Başvuruldu';
                    this.style.background = 'var(--success)';
                    this.disabled = true;
                    showNotification('Başvurunuz gönderildi!', 'success');
                }
            });
        }
    });
}

// Event actions
function initializeEventActions() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const joinBtn = card.querySelector('.btn-primary');
        
        if (joinBtn) {
            joinBtn.addEventListener('click', function() {
                const eventTitle = card.querySelector('h4').textContent;
                if (confirm(`"${eventTitle}" etkinliğine katılmak istediğinizden emin misiniz?`)) {
                    this.textContent = 'Katılıyorsunuz';
                    this.style.background = 'var(--success)';
                    this.disabled = true;
                    showNotification('Etkinliğe katılımınız onaylandı!', 'success');
                }
            });
        }
    });
}

// Topic tag functionality
function initializeTopicTags() {
    const topicTags = document.querySelectorAll('.topic-tag');
    
    topicTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const topic = this.textContent;
            showNotification(`"${topic}" konusu için arama yapılıyor...`, 'info');
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.composer-input input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const content = this.value.trim();
                if (content) {
                    createPost(content);
                    this.value = '';
                }
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
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

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'warning': return '#f59e0b';
        case 'error': return '#ef4444';
        default: return '#3b82f6';
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeTopicTags();
    initializeSearch();
});

// Real-time updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate new posts occasionally
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            const samplePosts = [
                "Yeni beat'im hazır! Dinlemek isteyenler DM atsın 🎵",
                "Bugün harika bir müzik prodüksiyon günü geçirdim!",
                "Hangi müzik türünü daha çok seviyorsunuz?",
                "Müzik yapımında kullandığınız favori plugin'ler neler?"
            ];
            
            const randomPost = samplePosts[Math.floor(Math.random() * samplePosts.length)];
            const randomArtists = ['DJ Ripp', 'SynthMaster', 'MC Flow', 'CyberBeats'];
            const randomArtist = randomArtists[Math.floor(Math.random() * randomArtists.length)];
            
            // Only add if user is on feed tab
            const feedTab = document.querySelector('[data-tab="feed"]');
            if (feedTab && feedTab.classList.contains('active')) {
                addSimulatedPost(randomPost, randomArtist);
            }
        }
    }, 30000); // Check every 30 seconds
}

function addSimulatedPost(content, artist) {
    const feedPosts = document.querySelector('.feed-posts');
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.style.opacity = '0';
    newPost.style.transform = 'translateY(20px)';
    
    newPost.innerHTML = `
        <div class="post-header">
            <img src="../assets/dalga.png" alt="User" class="post-avatar">
            <div class="post-user-info">
                <h4>${artist}</h4>
                <span class="post-time">Az önce</span>
            </div>
            <button class="post-menu">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        <div class="post-content">
            <p>${content}</p>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn">
                <i class="far fa-heart"></i>
                <span>0</span>
            </button>
            <button class="action-btn comment-btn">
                <i class="far fa-comment"></i>
                <span>0</span>
            </button>
            <button class="action-btn share-btn">
                <i class="fas fa-share"></i>
                <span>Paylaş</span>
            </button>
        </div>
    `;
    
    // Insert at the beginning of feed
    feedPosts.insertBefore(newPost, feedPosts.firstChild);
    
    // Initialize actions for new post
    initializePostActionsForElement(newPost);
    
    // Animate in
    setTimeout(() => {
        newPost.style.transition = 'all 0.3s ease';
        newPost.style.opacity = '1';
        newPost.style.transform = 'translateY(0)';
    }, 100);
}

// Start real-time updates simulation
setTimeout(simulateRealTimeUpdates, 5000); // Start after 5 seconds
