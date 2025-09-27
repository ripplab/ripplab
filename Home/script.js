// DOM Elements - Will be initialized after DOM loads
let userBtn, userDropdown, userBtn2, userDropdown2, followBtns, categoryItems;

// Search functionality - REMOVED FOR PERFORMANCE

// Search function - REMOVED FOR PERFORMANCE

// Show search suggestions - REMOVED FOR PERFORMANCE

// Hide search suggestions - REMOVED FOR PERFORMANCE
// Handle suggestion click - REMOVED FOR PERFORMANCE

// Search input event listeners - REMOVED FOR PERFORMANCE

// All functionality will be initialized after DOM loads

// Sayfa yüklendiğinde yorumları yükle
document.addEventListener('DOMContentLoaded', function() {
    loadCommentsFromStorage();
    
    // Tüm karakter sayaçlarını sıfırla
    const charCounters = document.querySelectorAll('.char-counter');
    charCounters.forEach(counter => {
        counter.textContent = '0/115';
        counter.style.color = 'var(--text-secondary)';
        counter.style.fontWeight = '600';
    });
});

// Karakter sayacı güncelleme
function updateCharCount(textarea) {
    const commentsSection = textarea.closest('.comments-section');
    const charCounter = commentsSection.querySelector('.char-counter');
    const text = textarea.value;
    const charCount = text.length;
    
    charCounter.textContent = `${charCount}/115`;
    
    // 80'den sonra sarı, 100'den sonra kırmızı yap
    if (charCount > 100) {
        charCounter.style.color = '#ff0000';
        charCounter.style.fontWeight = '700';
    } else if (charCount > 80) {
        charCounter.style.color = '#ffaa00';
        charCounter.style.fontWeight = '600';
    } else {
        charCounter.style.color = 'var(--text-secondary)';
        charCounter.style.fontWeight = '600';
    }
}

// Card Details Toggle Functionality
function initializeCardDetails() {
    const contentCards = document.querySelectorAll('.content-card');
    // Kartlar bulundu
    
    contentCards.forEach((card, index) => {
        // Kart için event listener ekleniyor
        
        card.addEventListener('click', function(e) {
            // Karta tıklandı
            
            // Don't trigger if clicking on buttons or interactive elements
            if (e.target.closest('.play-btn') || 
                e.target.closest('.like-btn') || 
                e.target.closest('.save-btn') || 
                e.target.closest('.add-to-cart-btn') || 
                e.target.closest('.buy-now-btn') ||
                e.target.closest('.comment-submit-btn') ||
                e.target.closest('.comment-delete') ||
                e.target.closest('.comment-reply') ||
                e.target.closest('.comment-input') ||
                e.target.closest('.comment-actions') ||
                e.target.closest('.comment-form') ||
                e.target.closest('.comments-section') ||
                e.target.closest('.comment-input-wrapper') ||
                e.target.closest('.comment-content') ||
                e.target.closest('.comment-header') ||
                e.target.closest('.comment-text') ||
                e.target.closest('.comment-avatar')) {
                // Butona tıklandı, detay açılmıyor
                return;
            }
            
            const longCard = this.querySelector('.long-card');
            // Long card bulundu
            
            if (!longCard) {
                // Long card bulunamadı
                return;
            }
            
            const isActive = longCard.classList.contains('active');
            // Aktif mi kontrol ediliyor
            
            // Close all other long cards and remove active class from cards
            document.querySelectorAll('.long-card.active').forEach(detail => {
                detail.classList.remove('active');
            });
            document.querySelectorAll('.content-card.active').forEach(card => {
                card.classList.remove('active');
            });
            
            // Toggle current long card and add active class to card
            if (!isActive) {
                longCard.classList.add('active');
                this.classList.add('active');
                // Long card aktif edildi
            } else {
                // If already active, close it
                longCard.classList.remove('active');
                this.classList.remove('active');
                // Long card kapatıldı
                
                // Scroll to the card when it's closed
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300); // Wait for transition to complete
            }
        });
    });
}



// Yorum Gönderme Fonksiyonu
function submitComment(button) {
    const commentForm = button.closest('.comment-form');
    const commentInput = commentForm.querySelector('.comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Yorum yazmadan gönderemezsin!');
        return;
    }
    
    // Karakter sayısı kontrolü
    const charCount = commentText.length;
    if (charCount > 115) {
        alert(`Yorum çok uzun! En fazla 115 karakter yazabilirsin. Şu an ${charCount} karakter yazdın.`);
        return;
    }
    
    // Yeni yorum oluştur
    const newComment = createCommentElement('RippLab', commentText, 'Şimdi', true);
    
    // Yorum listesine ekle
    const commentsList = commentForm.nextElementSibling;
    commentsList.insertBefore(newComment, commentsList.firstChild);
    
    // LocalStorage'a kaydet
    saveCommentToStorage(commentText);
    
    // Input'u temizle
    commentInput.value = '';
    
    // Karakter sayacını sıfırla
    updateCharCount(commentInput);
    
    alert('Yorum gönderildi!');
}

// Yorum elementi oluştur
function createCommentElement(author, text, time, isRippLab = false) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    
    // Sadece RippLab yorumlarında silme butonu olsun
    const deleteButton = isRippLab ? `
        <button class="comment-delete" onclick="deleteComment(this)">
            <i class="fas fa-trash"></i>
            Sil
        </button>
    ` : '';
    
    commentDiv.innerHTML = `
        <div class="comment-avatar">
            <img src="assets/dalga.png" alt="User Avatar">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${author}</span>
                <span class="comment-time">${time}</span>
            </div>
            <p class="comment-text">${text}</p>
            <div class="comment-actions">
                <button class="comment-reply">
                    <i class="fas fa-reply"></i>
                    Yanıtla
                </button>
                ${deleteButton}
            </div>
        </div>
    `;
    return commentDiv;
}

// LocalStorage'a yorum kaydet
function saveCommentToStorage(commentText) {
    let comments = JSON.parse(localStorage.getItem('ripplabComments') || '[]');
    const newComment = {
        text: commentText,
        author: 'RippLab',
        time: new Date().toLocaleString('tr-TR'),
        isRippLab: true
    };
    comments.unshift(newComment);
    localStorage.setItem('ripplabComments', JSON.stringify(comments));
}

// LocalStorage'dan yorumları yükle
function loadCommentsFromStorage() {
    const comments = JSON.parse(localStorage.getItem('ripplabComments') || '[]');
    const commentsList = document.querySelector('.comments-list');
    
    if (commentsList && comments.length > 0) {
        comments.forEach(comment => {
            const commentElement = createCommentElement(
                comment.author, 
                comment.text, 
                comment.time, 
                comment.isRippLab
            );
            commentsList.insertBefore(commentElement, commentsList.firstChild);
        });
    }
}

// Yorum silme fonksiyonu
function deleteComment(button) {
    if (confirm('Bu yorumu silmek istediğinden emin misin?')) {
        const commentItem = button.closest('.comment-item');
        const commentText = commentItem.querySelector('.comment-text').textContent;
        
        // LocalStorage'dan da sil
        let comments = JSON.parse(localStorage.getItem('ripplabComments') || '[]');
        comments = comments.filter(comment => comment.text !== commentText);
        localStorage.setItem('ripplabComments', JSON.stringify(comments));
        
        commentItem.remove();
    }
}

// Saved Music Button
const savedMusicBtn = document.getElementById('saved-music-btn');
const savedMusicModal = document.getElementById('saved-music-modal');
const closeSavedModal = document.getElementById('close-saved-modal');

// Music Detail Modal
const musicDetailModal = document.getElementById('music-detail-modal');
const closeMusicDetailModal = document.getElementById('close-music-detail-modal');

if (savedMusicBtn) {
    savedMusicBtn.addEventListener('click', () => {
        showSavedMusicModal();
    });
}

if (closeSavedModal) {
    closeSavedModal.addEventListener('click', () => {
        hideSavedMusicModal();
    });
}

if (closeMusicDetailModal) {
    closeMusicDetailModal.addEventListener('click', () => {
        musicDetailModal.style.display = 'none';
    });
}

// Close modal when clicking outside or on header
if (savedMusicModal) {
    savedMusicModal.addEventListener('click', (e) => {
        if (e.target === savedMusicModal) {
            hideSavedMusicModal();
        }
    });
    
    // Close modal when clicking on header
    const modalHeader = savedMusicModal.querySelector('.modal-header');
    if (modalHeader) {
        modalHeader.addEventListener('click', (e) => {
            // Don't close if clicking on the close button itself
            if (!e.target.closest('.close-btn')) {
                hideSavedMusicModal();
            }
        });
    }
}

// Close music detail modal when clicking outside
if (musicDetailModal) {
    musicDetailModal.addEventListener('click', (e) => {
        if (e.target === musicDetailModal) {
            musicDetailModal.style.display = 'none';
        }
    });
}

function showSavedMusicModal() {
    const savedMusic = JSON.parse(localStorage.getItem('savedMusic') || '[]');
    const gallery = document.getElementById('saved-music-gallery');
    
    if (savedMusic.length === 0) {
        gallery.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <h3>Henüz kaydedilen müzik yok</h3>
                <p>Müzikleri kaydetmek için kaydet ikonuna tıklayın</p>
            </div>
        `;
    } else {
        const isDarkTheme = document.body.classList.contains('theme-dark');
        const textColor = isDarkTheme ? 'var(--white)' : 'var(--text-secondary)';
        
        gallery.innerHTML = savedMusic.map(music => {
            const savedDate = new Date(music.timestamp);
            const now = new Date();
            const diffTime = Math.abs(now - savedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            
            let timeAgo = '';
            if (diffDays > 1) {
                timeAgo = `${diffDays} gün önce`;
            } else if (diffDays === 1) {
                timeAgo = '1 gün önce';
            } else if (diffHours > 1) {
                timeAgo = `${diffHours} saat önce`;
            } else if (diffHours === 1) {
                timeAgo = '1 saat önce';
            } else if (diffMinutes > 1) {
                timeAgo = `${diffMinutes} dakika önce`;
            } else {
                timeAgo = 'Az önce';
            }
            
            return `
                <div class="saved-music-card" data-music-id="${music.id}" style="background-image: url('${music.image}')">
                    <div class="saved-music-image">
                        <img src="${music.image}" alt="${music.title}">
                        <div class="saved-music-overlay">
                            <button class="play-saved-btn">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                    </div>
                    <div class="saved-music-info">
                        <h3>${music.title}</h3>
                        <p class="saved-date" style="font-size: 0.8rem; opacity: 0.7;">
                            ${savedDate.toLocaleDateString('tr-TR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div class="saved-music-actions">
                        <button class="remove-saved-btn" onclick="removeFromSaved('${music.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    savedMusicModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideSavedMusicModal() {
    savedMusicModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function removeFromSaved(musicId) {
    const savedMusic = JSON.parse(localStorage.getItem('savedMusic') || '[]');
    const updatedMusic = savedMusic.filter(music => music.id !== musicId);
    localStorage.setItem('savedMusic', JSON.stringify(updatedMusic));
    
    // Update the main page save button
    const saveBtn = document.querySelector(`[data-music-id="${musicId}"]`);
    if (saveBtn) {
        saveBtn.classList.remove('saved');
        // HTML içeriğini değiştirme, sadece CSS class'ı kaldır
        // saveBtn.innerHTML = '<i class="far fa-bookmark"></i><span>Kaydet</span>';
        // saveBtn.style.background = 'var(--primary-blue)';
    }
    
    // Refresh modal
    showSavedMusicModal();
    showNotification('Müzik kaydedilenlerden kaldırıldı', 'success');
}

// Toggle Switch Functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleInputs = document.querySelectorAll('.toggle-input');
    
    // Restore like states from localStorage
        const likedMusic = JSON.parse(localStorage.getItem('likedMusic') || '[]');
    
    toggleInputs.forEach(toggle => {
        const musicId = toggle.closest('.content-card').querySelector('.save-btn').getAttribute('data-music-id');
        
        // Restore like state
        if (likedMusic.includes(musicId)) {
            toggle.checked = true;
        }
        
        toggle.addEventListener('change', function() {
            const likeCount = this.closest('.likes').querySelector('.like-count');
            const musicId = this.closest('.content-card').querySelector('.save-btn').getAttribute('data-music-id');
            let currentLikes = parseInt(likeCount.textContent.replace('K', '000').replace('.', ''));
            
            if (this.checked) {
                // Add like
                currentLikes++;
                showNotification('Beğenildi!', 'success');
                
                // Save like state to localStorage
                const likedMusic = JSON.parse(localStorage.getItem('likedMusic') || '[]');
                if (!likedMusic.includes(musicId)) {
                    likedMusic.push(musicId);
                    localStorage.setItem('likedMusic', JSON.stringify(likedMusic));
                }
            } else {
                // Remove like
                currentLikes--;
                showNotification('Beğeni kaldırıldı', 'info');
                
                // Remove like state from localStorage
                const likedMusic = JSON.parse(localStorage.getItem('likedMusic') || '[]');
                const updatedLikedMusic = likedMusic.filter(id => id !== musicId);
                localStorage.setItem('likedMusic', JSON.stringify(updatedLikedMusic));
            }
            
            // Update likes count
            if (currentLikes >= 1000) {
                likeCount.textContent = (currentLikes / 1000).toFixed(1) + 'K';
            } else {
                likeCount.textContent = currentLikes;
            }
        });
        });
    });

    // Content Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    const playBtns = document.querySelectorAll('.play-btn');
    const contentCards = document.querySelectorAll('.content-card');
    






    // Play Button Functionality
    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            const contentCard = btn.closest('.content-card');
            const musicId = contentCard?.getAttribute('data-music-id');
            
            if (icon.classList.contains('fa-play')) {
                // Müziği çal
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                // Midnight Vibes kartı için özel müzik çalma
                if (musicId === '1') {
                    const audio = document.getElementById('midnightVibesAudio');
                    if (audio) {
                        audio.play();
                        // showNotification('Midnight Vibes çalıyor', 'success');
                        // Uzun karttaki play butonunu da güncelle
                        updateAllPlayButtons('pause');
                    }
                } else {
                    // showNotification('Çalıyor', 'success');
                }
            } else {
                // Müziği durdur
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                
                // Midnight Vibes kartı için özel müzik durdurma
                if (musicId === '1') {
                    const audio = document.getElementById('midnightVibesAudio');
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                        // showNotification('Midnight Vibes durduruldu', 'info');
                        // Uzun karttaki play butonunu da güncelle
                        updateAllPlayButtons('play');
                    }
                } else {
                    // showNotification('Durduruldu', 'info');
                }
            }
        });
    });

    // Content Card Click - Notification kaldırıldı
    // contentCards.forEach(card => {
    //     card.addEventListener('click', () => {
    //         const title = card.querySelector('h3').textContent;
    //         showNotification(`${title} detayları açılıyor...`, 'info');
    //     });
    // });
    
    // Kategori Filtreleme Sistemi
    const categoryItems = document.querySelectorAll('.left-sidebar .category-item');
    const allContentCards = document.querySelectorAll('.content-card');
    
    // Sayfa yüklendiğinde "Tümü" kategorisini aktif yap
    const tumuCategory = document.querySelector('.left-sidebar .category-item:first-child');
    tumuCategory.classList.add('active');
    

    

    
    categoryItems.forEach(categoryItem => {
        categoryItem.addEventListener('click', (e) => {
            e.preventDefault();
            
            const selectedCategory = categoryItem.querySelector('span').textContent;
            
            // Eğer "Tümü" kategorisine tıklandıysa
            if (selectedCategory === 'Tümü') {
                categoryItems.forEach(item => item.classList.remove('active'));
                categoryItem.classList.add('active');
                
                // Tüm müzikleri göster
                allContentCards.forEach(card => {
                    card.style.display = 'block';
                });
                
                // showNotification('Tüm kategoriler gösteriliyor', 'info');
                return;
            }
            

            
            // Yeni kategori seçimi
            categoryItems.forEach(item => item.classList.remove('active'));
            categoryItem.classList.add('active');
            
            // Tüm müzik kartlarını göster/gizle
            allContentCards.forEach(card => {
                const cardCategories = Array.from(card.querySelectorAll('.category')).map(cat => cat.textContent);
                
                if (cardCategories.includes(selectedCategory)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // showNotification(`${selectedCategory} kategorisi seçildi`, 'info');
        });
    });
});

// Notification System - Kaldırıldı

// Notification functions - Kaldırıldı

// Content Management System - REMOVED FOR PERFORMANCE

// Auto-manage content every 5 minutes - REMOVED FOR PERFORMANCE

// Real-time time updates for demo cards - REMOVED FOR PERFORMANCE

// Update times every minute - REMOVED FOR PERFORMANCE

// Initial update - REMOVED FOR PERFORMANCE

// Scroll Animations - REMOVED FOR PERFORMANCE

// Initialize all functionality after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // DOM loaded
    
    // Initialize DOM elements
    userBtn = document.querySelector('.user-btn');
    userDropdown = document.querySelector('.user-dropdown');
    userBtn2 = document.querySelector('.user-btn-2');
    userDropdown2 = document.querySelector('.user-dropdown-2');
    followBtns = document.querySelectorAll('.follow-btn');
    categoryItems = document.querySelectorAll('.category-item');
    
    // Console log kaldırıldı
    
    // Edit Mode kaldırıldı
    
    // Balance Button (no dropdown, just balance loading action)
    if (userBtn) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Bakiye yükleme işlemi burada olacak
            console.log('Bakiye yükleme butonuna tıklandı');
            // İkinci dropdown'ı kapat
            if (userDropdown2) userDropdown2.style.display = 'none';
        });
    }
    
    // Handle first dropdown links (if it has dropdown functionality)
    if (userDropdown) {
        const dropdownLinks = userDropdown.querySelectorAll('.dropdown-item');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow normal link behavior for external links
                if (link.getAttribute('href') !== '#') {
                    // Close dropdown
                    userDropdown.style.display = 'none';
                    // Let the browser handle the navigation
                    return true;
                }
                e.preventDefault();
            });
        });
    }

    // Second User Menu Toggle
    if (userBtn2 && userDropdown2) {
        userBtn2.addEventListener('click', () => {
            userDropdown2.style.display = userDropdown2.style.display === 'block' ? 'none' : 'block';
            // İlk dropdown'ı kapat
            if (userDropdown) userDropdown.style.display = 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userBtn2.contains(e.target) && !userDropdown2.contains(e.target)) {
                userDropdown2.style.display = 'none';
            }
        });
        
        // Handle dropdown links
        const dropdownLinks2 = userDropdown2.querySelectorAll('.dropdown-item');
        dropdownLinks2.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow normal link behavior for external links
                if (link.getAttribute('href') !== '#') {
                    // Close dropdown
                    userDropdown2.style.display = 'none';
                    // Let the browser handle the navigation
                    return true;
                }
                e.preventDefault();
            });
        });
    }

    // Category Items Functionality
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryName = item.querySelector('span')?.textContent || 'Kategori';
                
                // Add active state
                categoryItems.forEach(cat => cat.classList.remove('active'));
                item.classList.add('active');
                
                // Filter content by category
                filterContentByCategory(categoryName);
            });
        });
    }

    // Follow Button Functionality
    if (followBtns.length > 0) {
        followBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const artistCard = btn.closest('.artist-card');
                const artistName = artistCard?.querySelector('.artist-name')?.textContent || 'Sanatçı';
                
                if (btn.textContent.includes('Takip Et')) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Takip Ediliyor';
                    btn.style.background = '#10b981';
                    // showNotification(`${artistName} takip ediliyor`, 'success');
                } else {
                    btn.innerHTML = '<i class="fas fa-plus"></i> Takip Et';
                    btn.style.background = 'var(--primary-blue)';
                    // showNotification(`${artistName} takipten çıkarıldı`, 'info');
                }
            });
        });
    }

        // Beğeni sistemi kaldırıldı

        // Save Button Functionality
        const saveBtns = document.querySelectorAll('.save-btn');
        if (saveBtns.length > 0) {
            saveBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const musicId = btn.getAttribute('data-music-id');
                    const contentCard = btn.closest('.content-card');
                    const musicTitle = contentCard?.querySelector('h3')?.textContent || 'Mük';
                    
                    if (!btn.classList.contains('saved')) {
                        // Save music
                        btn.classList.add('saved');
                        
                        // Add to localStorage
                        const savedMusic = JSON.parse(localStorage.getItem('savedMusic') || '[]');
                        const musicImage = contentCard?.querySelector('.content-image img')?.src || '';
                        savedMusic.push({
                            id: musicId,
                            title: musicTitle,
                            image: musicImage,
                            timestamp: new Date().toISOString()
                        });
                        localStorage.setItem('savedMusic', JSON.stringify(savedMusic));
                        
                        // showNotification(`${musicTitle} kaydedildi`, 'success');
                    } else {
                        // Remove from saved
                        btn.classList.remove('saved');
                        
                        // Remove from localStorage
                        const savedMusic = JSON.parse(localStorage.getItem('savedMusic') || '[]');
                        const updatedMusic = savedMusic.filter(music => music.id !== musicId);
                        localStorage.setItem('savedMusic', JSON.stringify(updatedMusic));
                        
                        // showNotification(`${musicTitle} kaydedilenlerden kaldırıldı`, 'info');
                    }
                });
            });
        }
    
    // All functionality initialized
    
    // Initialize trending content management
    initializeTrendingContent();
    
    // Initialize music genre filtering
    initializeMusicGenreFiltering();
    
    // Initialize search functionality
    initializeSearch();
    

    
            // Restore saved states only
        restoreLikedAndSavedStates();
});

// Music Genre Filtering System
function initializeMusicGenreFiltering() {
    // Add click event listeners to music genre categories in cards
    const musicGenreCategories = document.querySelectorAll('.category-info .category');
    
    musicGenreCategories.forEach(category => {
        category.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const genreName = category.textContent;
            filterContentByGenre(genreName);
            
            // Update sidebar category selection
            updateSidebarCategorySelection(genreName);
        });
    });
}

function filterContentByGenre(genreName) {
    const contentCards = document.querySelectorAll('.content-card');
    const sectionTitle = document.querySelector('#recent-uploads .section-header h2');
    
    // Update section title
    if (sectionTitle) {
        sectionTitle.textContent = `${genreName} Müzikleri`;
    }
    
    contentCards.forEach(card => {
        const cardGenres = card.querySelectorAll('.category-info .category');
        let hasGenre = false;
        
        cardGenres.forEach(genre => {
            if (genre.textContent === genreName) {
                hasGenre = true;
            }
        });
        
        if (hasGenre) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show "Show All" button
    showShowAllButton();
}

function filterContentByCategory(categoryName) {
    if (categoryName === 'Tümü') {
        showAllContent();
        return;
    }
    
    const contentCards = document.querySelectorAll('.content-card');
    const sectionTitle = document.querySelector('#recent-uploads .section-header h2');
    
    // Update section title
    if (sectionTitle) {
        sectionTitle.textContent = `${categoryName} Kategorisi`;
    }
    
    contentCards.forEach(card => {
        const cardGenres = card.querySelectorAll('.category-info .category');
        let hasCategory = false;
        
        cardGenres.forEach(genre => {
            if (genre.textContent === categoryName) {
                hasCategory = true;
            }
        });
        
        if (hasCategory) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show "Show All" button
    showShowAllButton();
}

function showAllContent() {
    const contentCards = document.querySelectorAll('.content-card');
    const sectionTitle = document.querySelector('#recent-uploads .section-header h2');
    
    // Reset section title
    if (sectionTitle) {
        sectionTitle.textContent = 'Son Yüklenenler';
    }
    
    contentCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
    });
    
    // Hide "Show All" button
    hideShowAllButton();
    
    // Reset sidebar category selection
    resetSidebarCategorySelection();
}

function updateSidebarCategorySelection(genreName) {
    const categoryItems = document.querySelectorAll('.sidebar .category-item');
    
    categoryItems.forEach(item => {
        const itemText = item.querySelector('span').textContent;
        if (itemText === genreName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function resetSidebarCategorySelection() {
    const categoryItems = document.querySelectorAll('.sidebar .category-item');
    
    categoryItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Set "Tümü" as active
    const allCategory = document.querySelector('.sidebar .category-item:first-child');
    if (allCategory) {
        allCategory.classList.add('active');
    }
}

function showShowAllButton() {
    let showAllBtn = document.querySelector('.show-all-btn');
    
    if (!showAllBtn) {
        showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-btn';
        showAllBtn.innerHTML = '<i class="fas fa-list"></i> Tümünü Göster';
        showAllBtn.addEventListener('click', showAllContent);
        
        const sectionHeader = document.querySelector('#recent-uploads .section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(showAllBtn);
        }
    }
    
    showAllBtn.style.display = 'block';
}

function hideShowAllButton() {
    const showAllBtn = document.querySelector('.show-all-btn');
    if (showAllBtn) {
        showAllBtn.style.display = 'none';
    }
}

// Search System
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBar = document.querySelector('.search-bar');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (!searchInput) return;
    
    // Search input event listeners
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', showSearchSuggestions);
    searchInput.addEventListener('blur', hideSearchSuggestions);
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
    

}

function handleSearchInput(e) {
    const query = e.target.value.trim().toLowerCase();
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (query.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    // Get search results
    const results = searchContent(query);
    
    // Display results
    displaySearchResults(results);
    showSearchSuggestions();
}

function searchContent(query) {
    const results = [];
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        // Search in music title
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        if (title.includes(query)) {
            results.push({
                type: 'music',
                title: card.querySelector('h3')?.textContent || '',
                artist: card.querySelector('.creator')?.textContent?.replace('by ', '') || '',
                card: card
            });
        }
        
        // Search in artist name
        const artist = card.querySelector('.creator')?.textContent?.toLowerCase().replace('by ', '') || '';
        if (artist.includes(query)) {
            results.push({
                type: 'artist',
                title: card.querySelector('.creator')?.textContent?.replace('by ', '') || '',
                subtitle: card.querySelector('h3')?.textContent || '',
                card: card
            });
        }
        
        // Search in music genres
        const genres = card.querySelectorAll('.category-info .category');
        genres.forEach(genre => {
            const genreText = genre.textContent.toLowerCase();
            if (genreText.includes(query)) {
                results.push({
                    type: 'genre',
                    title: genre.textContent,
                    subtitle: '', // No subtitle for genres
                    card: card // Add the card reference
                });
            }
        });
    });
    
    // Remove duplicates based on title and type
    const uniqueResults = results.filter((result, index, self) => 
        index === self.findIndex(r => r.title === result.title && r.type === result.type)
    );
    
    return uniqueResults.slice(0, 8); // Limit to 8 results
}

function displaySearchResults(results) {
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (results.length === 0) {
        searchSuggestions.innerHTML = `
            <div class="suggestion-item no-results">
                <div class="suggestion-text">
                    <div class="suggestion-title">Sonuç bulunamadı</div>
                    <div class="suggestion-subtitle">Farklı kelimeler deneyin</div>
                </div>
            </div>
        `;
        return;
    }
    
    searchSuggestions.innerHTML = results.map(result => `
        <div class="suggestion-item" data-type="${result.type}" data-title="${result.title}">
            <div class="suggestion-text">
                <div class="suggestion-title">${result.title}</div>
                ${result.subtitle ? `<div class="suggestion-subtitle">${result.subtitle}</div>` : ''}
            </div>
        </div>
    `).join('');
    
    // Add click event listeners to suggestions
    addSuggestionClickListeners(results);
}

function addSuggestionClickListeners(results) {
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    
    suggestionItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const result = results[index];
            
            if (result) {
                if (result.type === 'genre') {
                    // If it's a genre, filter by that genre like sidebar categories
                    filterContentByGenre(result.title);
                    
                    // Update sidebar category selection
                    updateSidebarCategorySelection(result.title);
                    
                    // Update section title
                    updateSectionTitle(`${result.title} Müzikleri`);
                    
                    // Show "Show All" button
                    showShowAllButton();
                } else if (result.card) {
                    // For music and artist results, just scroll to the card
                    result.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    highlightCard(result.card);
                }
                
                // Clear search
                clearSearch();
            }
        });
    });
}

function highlightCard(card) {
    card.style.boxShadow = '0 0 20px rgba(110, 175, 223, 0.8)';
    card.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        card.style.boxShadow = '';
        card.style.transform = '';
    }, 2000);
}

function showSearchSuggestions() {
    const searchBar = document.querySelector('.search-bar');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (searchSuggestions.children.length > 0) {
        searchBar.classList.add('active');
        searchSuggestions.style.display = 'block';
    }
}

function hideSearchSuggestions() {
    const searchBar = document.querySelector('.search-bar');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => {
        searchBar.classList.remove('active');
        searchSuggestions.style.display = 'none';
    }, 200);
}

function clearSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    searchInput.value = '';
    searchSuggestions.innerHTML = '';
    hideSearchSuggestions();
}

function updateSectionTitle(title) {
    const sectionTitle = document.querySelector('#recent-uploads .section-header h2');
    if (sectionTitle) {
        sectionTitle.textContent = title;
    }
}



// Trending Content Management System
function initializeTrendingContent() {
    const trendingContent = document.getElementById('trending-content');
    const allContent = document.getElementById('all-content');
    
    if (!trendingContent || !allContent) return;
    
    // Check all content cards for trending eligibility
    const allCards = allContent.querySelectorAll('.content-card');
    const trendingCards = trendingContent.querySelectorAll('.content-card');
    
    // Move cards with 1000+ likes to trending
    allCards.forEach(card => {
        const likes = parseInt(card.dataset.likes) || 0;
        if (likes >= 1000) {
            // Add trending badge
            const badge = document.createElement('div');
            badge.className = 'trending-badge';
            badge.textContent = '🔥';
            card.appendChild(badge);
            
            // Move to trending section
            trendingContent.appendChild(card.cloneNode(true));
            card.remove();
        }
    });
    
    // Remove trending cards that don't meet criteria
    trendingCards.forEach(card => {
        const likes = parseInt(card.dataset.likes) || 0;
        if (likes < 1000) {
            // Move back to all content
            allContent.appendChild(card.cloneNode(true));
            card.remove();
        }
    });
    
    // Update trending section message
    const trendingCardsCount = trendingContent.querySelectorAll('.content-card').length;
    const noTrendingMessage = trendingContent.querySelector('.no-trending-message');
    
    if (trendingCardsCount === 0 && !noTrendingMessage) {
        const message = document.createElement('div');
        message.className = 'no-trending-message';
        message.innerHTML = `
            <p>Henüz trend olan içerik yok</p>
            <small>1000+ beğeni alan içerikler burada görünür</small>
        `;
        trendingContent.appendChild(message);
    } else if (trendingCardsCount > 0 && noTrendingMessage) {
        noTrendingMessage.remove();
    }
}

// Restore Saved States Only
function restoreLikedAndSavedStates() {
    // Kaydetme durumları geri yükleniyor
    
    // Kaydedilen müzikleri geri yükle
    const savedMusic = JSON.parse(localStorage.getItem('savedMusic') || '[]');
            // Kaydedilen müzikler bulundu
    
    savedMusic.forEach(saved => {
        const saveBtn = document.querySelector(`.save-btn[data-music-id="${saved.id}"]`);
        if (saveBtn) {
            // Kaydetme durumu geri yükleniyor
            saveBtn.classList.add('saved');
        } else {
            // Kaydet butonu bulunamadı
        }
    });
    
    // Geri yükleme tamamlandı
}

// Keyboard Shortcuts - REMOVED FOR PERFORMANCE

// Load saved theme from lobi page
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('theme-dark');
    }
}



// Initialize theme
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
    initializeCardDetails();
    initializeAudioControls();
});

// Audio Controls Functionality
function initializeAudioControls() {
    const audio = document.getElementById('midnightVibesAudio');
    const longCardPlayBtn = document.getElementById('longCardPlayBtn');
    const progressSlider = document.getElementById('progressSlider');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');
    const currentTimeDisplay = document.querySelector('.current-time');
    const totalTimeDisplay = document.querySelector('.total-time');
    
    if (!audio || !longCardPlayBtn) return;
    
    // Set initial volume
    audio.volume = 1.0; // %100 volume
    volumeSlider.value = 100;
    updateVolumeIcon(100);
    
    // Play/Pause functionality
    longCardPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Uzun kartın kapanmasını engelle
        
        if (audio.paused) {
            audio.play();
            // Tüm play butonlarını güncelle
            updateAllPlayButtons('pause');
        } else {
            audio.pause();
            // Tüm play butonlarını güncelle
            updateAllPlayButtons('play');
        }
    });
    
    // Update progress bar and time display
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
        
        // Update progress bar visual
        progressSlider.style.setProperty('--progress-width', progress + '%');
        
        // Update time display
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
    
    // Update total time when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(audio.duration);
    });
    
    // Progress slider functionality
    progressSlider.addEventListener('input', (e) => {
        e.stopPropagation(); // Uzun kartın kapanmasını engelle
        
        const time = (progressSlider.value / 100) * audio.duration;
        audio.currentTime = time;
        
        // Update progress bar visual
        progressSlider.style.setProperty('--progress-width', progressSlider.value + '%');
    });
    
    // Progress slider click event
    progressSlider.addEventListener('click', (e) => {
        e.stopPropagation(); // Uzun kartın kapanmasını engelle
    });
    
    // Volume slider functionality
    volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation(); // Uzun kartın kapanmasını engelle
        
        audio.volume = volumeSlider.value / 100;
        updateVolumeIcon(volumeSlider.value);
        
        // Update volume bar visual
        volumeSlider.style.setProperty('--volume-width', volumeSlider.value + '%');
    });
    
    // Volume slider click event
    volumeSlider.addEventListener('click', (e) => {
        e.stopPropagation(); // Uzun kartın kapanmasını engelle
    });
    
    // Volume button functionality
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Uzun kartın kapanmasını engelle
        
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeSlider.value = 0;
            updateVolumeIcon(0);
            // Update volume bar visual
            volumeSlider.style.setProperty('--volume-width', '0%');
        } else {
            audio.volume = 1.0;
            volumeSlider.value = 100;
            updateVolumeIcon(100);
            // Update volume bar visual
            volumeSlider.style.setProperty('--volume-width', '100%');
        }
    });
    
    // Audio ended event
    audio.addEventListener('ended', () => {
        progressSlider.value = 0;
        progressSlider.style.setProperty('--progress-width', '0%');
        currentTimeDisplay.textContent = '0:00';
        // Tüm play butonlarını güncelle
        updateAllPlayButtons('play');
    });
}

// Format time in MM:SS format
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update volume icon based on volume level
function updateVolumeIcon(volume) {
    const volumeBtn = document.getElementById('volumeBtn');
    if (!volumeBtn) return;
    
    let icon = 'fa-volume-up';
    let colorClass = '';
    
    if (volume == 0) {
        icon = 'fa-volume-mute';
        colorClass = 'volume-mute';
    } else if (volume <= 5) {
        colorClass = 'volume-5';
    } else if (volume <= 10) {
        colorClass = 'volume-10';
    } else if (volume <= 15) {
        colorClass = 'volume-15';
    } else if (volume <= 20) {
        colorClass = 'volume-20';
    } else if (volume <= 25) {
        colorClass = 'volume-25';
    } else if (volume <= 30) {
        colorClass = 'volume-30';
    } else if (volume <= 35) {
        colorClass = 'volume-35';
    } else if (volume <= 40) {
        colorClass = 'volume-40';
    } else if (volume <= 45) {
        colorClass = 'volume-45';
    } else if (volume <= 50) {
        colorClass = 'volume-50';
    } else if (volume <= 55) {
        colorClass = 'volume-55';
    } else if (volume <= 60) {
        colorClass = 'volume-60';
    } else if (volume <= 65) {
        colorClass = 'volume-65';
    } else if (volume <= 70) {
        colorClass = 'volume-70';
    } else if (volume <= 75) {
        colorClass = 'volume-75';
    } else if (volume <= 80) {
        colorClass = 'volume-80';
    } else if (volume <= 85) {
        colorClass = 'volume-85';
    } else if (volume <= 90) {
        colorClass = 'volume-90';
    } else if (volume <= 95) {
        colorClass = 'volume-95';
    } else {
        colorClass = 'volume-100';
    }
    
    // Remove all previous color classes
    volumeBtn.classList.remove('volume-mute', 'volume-5', 'volume-10', 'volume-15', 'volume-20', 'volume-25', 'volume-30', 'volume-35', 'volume-40', 'volume-45', 'volume-50', 'volume-55', 'volume-60', 'volume-65', 'volume-70', 'volume-75', 'volume-80', 'volume-85', 'volume-90', 'volume-95', 'volume-100');
    
    // Add new color class
    volumeBtn.classList.add(colorClass);
    
    volumeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
}

// Listen for theme changes from lobi page - REMOVED FOR PERFORMANCE

// Basit Senkronizasyon Fonksiyonu
function updateAllPlayButtons(state) {
    // Fotoğrafın üstündeki play butonu (overlay)
    const overlayPlayBtn = document.querySelector('[data-music-id="1"] .play-btn i');
    if (overlayPlayBtn) {
        if (state === 'pause') {
            overlayPlayBtn.classList.remove('fa-play');
            overlayPlayBtn.classList.add('fa-pause');
        } else {
            overlayPlayBtn.classList.remove('fa-pause');
            overlayPlayBtn.classList.add('fa-play');
        }
    }
    
    // Uzun karttaki play butonu
    const longCardPlayBtn = document.getElementById('longCardPlayBtn');
    if (longCardPlayBtn) {
        if (state === 'pause') {
            longCardPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            longCardPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

// Müzik Çalma/Durdurma Fonksiyonu
function togglePlayPause(btn, title, event) {
    // Event'in card'a yayılmasını engelle
    event.stopPropagation();
    
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fa-play')) {
        // Müziği çal
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        showNotification(`Çalıyor`, 'success');
        
        // Diğer tüm play butonlarını pause yap
        document.querySelectorAll('.play-pause-btn i.fa-pause').forEach(pauseIcon => {
            if (pauseIcon !== icon) {
                pauseIcon.classList.remove('fa-pause');
                pauseIcon.classList.add('fa-play');
            }
        });
    } else {
        // Müziği durdur
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        showNotification(`Durduruldu`, 'info');
    }
}






