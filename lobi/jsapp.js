// Ripplab Music Application JavaScript

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressFill = document.querySelector('.progress-fill');
const ctaButton = document.querySelector('.cta-button');
const themeToggleBtn = document.querySelector('.theme-toggle');

// Sample Music Data
const musicData = [
    {
        title: "Lobi Müziği",
        artist: "Dalga",
        cover: "assets/album-cover.jpg",
        audio: "assets/deniz.mp3"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let currentTime = 0;
let duration = 100;
let audioElement = null;
let isAudioLoaded = false;

// Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}   

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Force save music state before leaving page
document.querySelectorAll('a[href*="login"]').forEach(link => {
    link.addEventListener('click', function() {
        if (audioElement && isPlaying) {
            try {
                localStorage.setItem('musicPlaying', 'true');
                localStorage.setItem('musicVolume', audioElement.volume.toString());
                localStorage.setItem('musicLastSaved', Date.now().toString());
                localStorage.setItem('musicForceSave', 'true');
                // Music state force saved before navigation
            } catch (e) {
                // Could not force save music state
            }
        }
    });
});

// Music Player Controls
if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
}

if (prevBtn) {
    prevBtn.addEventListener('click', playPrevious);
}

if (nextBtn) {
    nextBtn.addEventListener('click', playNext);
}

// Play/Pause Toggle
function togglePlay() {
    if (!audioElement) {
        loadAudio();
    }
    
    if (!isAudioLoaded) return;
    
    isPlaying = !isPlaying;
    const icon = playBtn.querySelector('i');
    
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        audioElement.play();
        startProgress();
        // Save music state for login page with timestamp
        try {
            localStorage.setItem('musicPlaying', 'true');
            localStorage.setItem('musicStartTime', Date.now().toString());
            localStorage.setItem('musicVolume', audioElement.volume.toString());
        } catch (e) {
            // Could not save music state
        }
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        audioElement.pause();
        stopProgress();
        // Save music state for login page
        try {
            localStorage.setItem('musicPlaying', 'false');
            localStorage.removeItem('musicStartTime');
        } catch (e) {
            // Could not save music state
        }
    }
}

// Play Previous Track
function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + musicData.length) % musicData.length;
    updateTrackInfo();
    resetProgress();
}

// Play Next Track
function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % musicData.length;
    updateTrackInfo();
    resetProgress();
}

// Update Track Information
function updateTrackInfo() {
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    
    if (trackTitle && trackArtist) {
        trackTitle.textContent = musicData[currentTrackIndex].title;
        trackArtist.textContent = musicData[currentTrackIndex].artist;
    }
    
    // Load new audio file
    loadAudio();
}

// Load and setup audio
function loadAudio() {
    if (audioElement) {
        audioElement.pause();
        audioElement = null;
    }
    
    isAudioLoaded = false;
    const currentTrack = musicData[currentTrackIndex];
    
    if (currentTrack.audio) {
        audioElement = new Audio(currentTrack.audio);
        audioElement.addEventListener('loadedmetadata', () => {
            duration = audioElement.duration;
            isAudioLoaded = true;
            updateTimeDisplay();
        });
        audioElement.addEventListener('timeupdate', () => {
            currentTime = audioElement.currentTime;
            updateProgress();
        });
        audioElement.addEventListener('ended', () => {
            playNext();
        });
        audioElement.addEventListener('error', () => {
            // Audio file not found
            isAudioLoaded = false;
        });
    }
}

// Progress Bar Animation
let progressInterval;

function startProgress() {
    // Real audio progress is handled by audioElement timeupdate event
    // This function is kept for compatibility but doesn't need to do anything
}

function stopProgress() {
    // Real audio progress is handled by audioElement timeupdate event
    // This function is kept for compatibility but doesn't need to do anything
}

function resetProgress() {
    currentTime = 0;
    if (audioElement) {
        audioElement.currentTime = 0;
    }
    updateProgress();
}

function updateProgressBar() {
    // This function is replaced by updateProgress()
    // Kept for compatibility
}

// CTA Button Animation
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Button is currently passive - will be used for login module later
        // Mağazayı Keşfet button clicked - login module will be added here
        
        // Add click animation
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
        }, 150);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.playlist-card, .player-container, .about-content').forEach(el => {
    observer.observe(el);
});

// Card flip functionality
document.addEventListener('DOMContentLoaded', () => {
    // DOM loaded, setting up card flip
    
    const cards = document.querySelectorAll('.playlist-card');
    // Found cards
    
    cards.forEach((card, index) => {
        // Setting up card
        
        // Flip card when clicked
        card.addEventListener('click', () => {
            // Card clicked
            card.classList.toggle('flipped');
                          // Card flipped
        });
    });
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .playlist-card, .player-container, .about-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: var(--shadow);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Wave Animation Enhancement
function enhanceWaveAnimation() {
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        wave.addEventListener('mouseenter', () => {
            wave.style.borderColor = 'var(--accent-blue)';
            wave.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        
        wave.addEventListener('mouseleave', () => {
            wave.style.borderColor = 'var(--light-blue)';
            wave.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Initialize Wave Animation Enhancement
document.addEventListener('DOMContentLoaded', () => {
    enhanceWaveAnimation();
    updateTrackInfo();
    initializeTheme();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize browser notification
    initializeBrowserNotification();
});

// Add loading animation CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .wave {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(loadingStyle);

// Playlist Card Interactions
document.querySelectorAll('.playlist-card').forEach(card => {
    card.addEventListener('click', () => {
        // Add click effect
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
        
        // Simulate playlist opening
        // Opening playlist
    });
});

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':
            playPrevious();
            break;
        case 'ArrowRight':
            playNext();
            break;
    }
});

// Page Interaction Control Functions
function disablePageInteractions() {
    // Add event listeners to prevent all interactions
    document.addEventListener('click', preventInteraction, true);
    document.addEventListener('touchstart', preventInteraction, true);
    document.addEventListener('touchmove', preventInteraction, true);
    document.addEventListener('keydown', preventInteraction, true);
    document.addEventListener('scroll', preventInteraction, true);
    document.addEventListener('wheel', preventInteraction, true);
    
    // Add visual indicator
    document.body.style.pointerEvents = 'none';
    
    // Re-enable only the notification modal
    const notification = document.getElementById('browser-notification');
    if (notification) {
        notification.style.pointerEvents = 'auto';
    }
}

function enablePageInteractions() {
    // Remove all interaction prevention listeners
    document.removeEventListener('click', preventInteraction, true);
    document.removeEventListener('touchstart', preventInteraction, true);
    document.removeEventListener('touchmove', preventInteraction, true);
    document.removeEventListener('keydown', preventInteraction, true);
    document.removeEventListener('scroll', preventInteraction, true);
    document.removeEventListener('wheel', preventInteraction, true);
    
    // Re-enable all pointer events
    document.body.style.pointerEvents = 'auto';
}

function preventInteraction(event) {
    // Allow only the "Anladım" button to work
    const understoodBtn = document.getElementById('btn-understood');
    if (understoodBtn && (event.target === understoodBtn || understoodBtn.contains(event.target))) {
        return; // Allow the button to work
    }
    
    // Prevent all other interactions
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
}

// Browser Notification Functions
function initializeBrowserNotification() {
    console.log('Initializing browser notification...'); // Debug log
    
    const notification = document.getElementById('browser-notification');
    const understoodBtn = document.getElementById('btn-understood');
    
    if (!notification) {
        console.error('Notification element not found!'); // Debug log
        return;
    }
    
    console.log('Notification element found:', notification); // Debug log
    
    // Check if user has already seen the notification
    const hasSeenNotification = localStorage.getItem('browserNotificationSeen');
    console.log('Has seen notification:', hasSeenNotification); // Debug log
    
    if (hasSeenNotification) {
        console.log('User has seen notification, hiding...'); // Debug log
        notification.style.display = 'none';
        return;
    }
    
    console.log('Showing notification for the first time...'); // Debug log
    
    console.log('Showing notification...'); // Debug log
    
    // Show notification after a short delay
    setTimeout(() => {
        console.log('Setting notification display to block...'); // Debug log
        notification.classList.add('show');
        
        // Disable page scrolling when notification is shown
        const scrollY = window.scrollY;
        document.documentElement.classList.add('notification-active');
        document.body.classList.add('notification-active');
        
        // Store scroll position for later restoration
        document.body.dataset.scrollY = scrollY;
        
        // Disable all page interactions
        disablePageInteractions();
    }, 1000);
    
    // Understood button functionality
    if (understoodBtn) {
        understoodBtn.addEventListener('click', () => {
            hideNotification(notification);
            // Mark as seen in localStorage
            try {
                localStorage.setItem('browserNotificationSeen', 'true');
                console.log('Notification marked as seen in localStorage'); // Debug log
            } catch (e) {
                console.error('Could not save to localStorage:', e); // Debug log
            }
        });
    }
    
    // localStorage kontrolü aktif - bildirim sadece bir kez gösterilir
}

function hideNotification(notification) {
    if (!notification) return;
    
    notification.classList.add('hiding');
    
    // Re-enable page scrolling when notification is hidden
    const scrollY = document.body.dataset.scrollY;
    document.documentElement.classList.remove('notification-active');
    document.body.classList.remove('notification-active');
    
    // Re-enable all page interactions
    enablePageInteractions();
    
    // Restore scroll position
    if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
    }
    
    // Clean up stored scroll position
    delete document.body.dataset.scrollY;
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 300);
}

// Console Welcome Message kaldırıldı

// Volume Control Functions
let isMuted = false;
let previousVolume = 50;

function toggleMute() {
    const volumeIcon = document.getElementById('volume-icon-i');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (isMuted) {
        // Unmute
        volumeSlider.value = previousVolume;
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
        isMuted = false;
        updateVolumeFill(previousVolume);
    } else {
        // Mute
        previousVolume = volumeSlider.value;
        volumeSlider.value = 0;
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
        isMuted = true;
        updateVolumeFill(0);
    }
}

// Volume slider change event
document.addEventListener('DOMContentLoaded', function() {
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            if (this.value > 0) {
                isMuted = false;
                const volumeIcon = document.getElementById('volume-icon-i');
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            }
            // Update volume fill
            updateVolumeFill(this.value);
        });
    }
    
    // Initialize time display and volume fill
    updateTimeDisplay();
    updateVolumeFill(0.2); // Default volume (0.2 out of 3)
    
    // Reset progress bar to 0%
    const progressFill = document.querySelector('.progress-section .progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
});

// Update volume fill
function updateVolumeFill(volume) {
    const volumeFill = document.querySelector('.volume-fill');
    if (volumeFill) {
        // Convert 0-3 range to 0-100 for display
        const displayPercent = (volume / 3) * 100;
        volumeFill.style.width = displayPercent + '%';
    }
    
    // Set audio volume (0-1 range)
    if (audioElement) {
        audioElement.volume = volume / 3;
    }
}

// Seek volume function
function seekVolume(event) {
    const volumeSlider = event.currentTarget;
    const rect = volumeSlider.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const volumeSliderWidth = rect.width;
    const clickPosition = clickX / volumeSliderWidth;
    
    // Update volume slider value (0-3 range with precision)
    const volumeInput = volumeSlider.querySelector('.volume-range');
    const newVolume = Math.round(clickPosition * 300) / 100; // 0.01 precision
    volumeInput.value = newVolume;
    
    // Update volume fill
    updateVolumeFill(newVolume);
    
    // Update icon if needed
    if (newVolume > 0) {
        isMuted = false;
        const volumeIcon = document.getElementById('volume-icon-i');
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    }
}

// Volume slider drag functionality
let isDraggingVolume = false;

function startVolumeDrag(event) {
    isDraggingVolume = true;
    document.addEventListener('mousemove', dragVolume);
    document.addEventListener('mouseup', stopVolumeDrag);
    seekVolume(event);
}

function dragVolume(event) {
    if (!isDraggingVolume) return;
    
    const volumeSlider = document.querySelector('.volume-slider');
    if (volumeSlider) {
        const rect = volumeSlider.getBoundingClientRect();
        const mouseX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const clickPosition = mouseX / rect.width;
        
        // Update volume slider value (0-3 range with precision)
        const volumeInput = volumeSlider.querySelector('.volume-range');
        const newVolume = Math.round(clickPosition * 300) / 100; // 0.01 precision
        volumeInput.value = newVolume;
        
        // Update volume fill
        updateVolumeFill(newVolume);
        
        // Update icon if needed
        if (newVolume > 0) {
            isMuted = false;
            const volumeIcon = document.getElementById('volume-icon-i');
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
        }
    }
}

function stopVolumeDrag() {
    isDraggingVolume = false;
    document.removeEventListener('mousemove', dragVolume);
    document.removeEventListener('mouseup', stopVolumeDrag);
}

// Seek to position function for progress bar
function seekToPosition(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progressBarWidth = rect.width;
    const clickPosition = clickX / progressBarWidth;
    
    // Update progress fill
    const progressFill = progressBar.querySelector('.progress-fill');
    progressFill.style.width = (clickPosition * 100) + '%';
    
    // Update current time and seek audio
    if (audioElement && duration > 0) {
        currentTime = clickPosition * duration;
        audioElement.currentTime = currentTime;
        updateTimeDisplay();
    }
}

// Progress bar drag functionality
let isDraggingProgress = false;

function startProgressDrag(event) {
    isDraggingProgress = true;
    document.addEventListener('mousemove', dragProgress);
    document.addEventListener('mouseup', stopProgressDrag);
    seekToPosition(event);
}

function dragProgress(event) {
    if (!isDraggingProgress) return;
    
    const progressBar = document.querySelector('.progress-section .progress-bar');
    if (progressBar) {
        const rect = progressBar.getBoundingClientRect();
        const mouseX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const clickPosition = mouseX / rect.width;
        
        // Update progress fill
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = (clickPosition * 100) + '%';
        
        // Update current time and seek audio
        if (audioElement && duration > 0) {
            currentTime = clickPosition * duration;
            audioElement.currentTime = currentTime;
            updateTimeDisplay();
        }
    }
}

function stopProgressDrag() {
    isDraggingProgress = false;
    document.removeEventListener('mousemove', dragProgress);
    document.removeEventListener('mouseup', stopProgressDrag);
}

// Update progress bar
function updateProgress() {
    if (audioElement && duration > 0) {
        const progressFill = document.querySelector('.progress-section .progress-fill');
        if (progressFill) {
            const progressPercent = (currentTime / duration) * 100;
            progressFill.style.width = progressPercent + '%';
        }
        updateTimeDisplay();
    }
}

// Update time display
function updateTimeDisplay() {
    const currentTimeElement = document.getElementById('current-time');
    
    if (currentTimeElement) {
        currentTimeElement.textContent = formatTime(currentTime);
    }
}

// Format time to MM:SS (no milliseconds)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// THEME: Dark/Light toggle support
function updateLogosForTheme(theme) {
    // Logolar kaldırıldı, sadece tema değişikliği yapılıyor
            // Theme changed
}

function applyTheme(theme) {
    const isDarkMode = theme === 'dark';
    const isLightMode = theme === 'light';
    document.body.classList.toggle('theme-dark', isDarkMode);
    document.body.classList.toggle('theme-light', isLightMode);

    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    if (icon) {
        icon.classList.toggle('fa-moon', isLightMode);
        icon.classList.toggle('fa-sun', isDarkMode);
    }

    try {
        localStorage.setItem('theme', theme);
    } catch (_) {}

    updateLogosForTheme(theme);
}

function initializeTheme() {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (_) {
        savedTheme = null;
    }

    if (savedTheme) {
        applyTheme(savedTheme);
    }
}



if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        // Theme switching
        applyTheme(nextTheme);
    });
}

// LANGUAGE: Turkish/English toggle support
let currentLanguage = 'tr';

const translations = {
    tr: {
        // Navigation
        'nav-home': 'Ana Sayfa',
        'nav-featured': 'Öne Çıkanlar',
        'nav-about': 'Hakkında',
        
        // Hero Section
        'hero-title': 'Müziğin Dalgalarında Yolculuk',
        'hero-subtitle': 'Ripplab ile müziğin büyülü dünyasını keşfedin',
        'cta-button': 'Mağazayı Keşfet',
        
        // Music Player
        'track-title': 'Lobi',
        'track-artist': 'Deniz',
        
        // Playlists Section
        'section-title': 'Öne Çıkanlar',
        'beat': 'Beat',
        'sound-effects': 'Ses Efektleri',
        'album-covers': 'Albüm Kapakları',
        'instruments': 'Enstrümanlar',
        'lyrics': 'Film Müziği',
        'rhythms': 'Klasik',
        'not-available': 'henüz mevcut değil',
        
        // About Section
        'about-title': 'Ripplab Hakkında',
        'about-text-1': 'Ripplab, müziğin özgürce üretilip paylaşılabileceği, sanatçıların ve dinleyicilerin aynı çatı altında buluşabileceği modern bir dijital pazar alanıdır.',
        'about-text-2': 'Amacımız; prodüktörlerin, bestecilerin ve tasarımcıların oluşturduğu eserleri kolayca sergileyebileceği, dinleyicilerin ise ihtiyaç duydukları müzikleri, beat\'leri, kapak tasarımlarını veya ses efektlerini güvenle edinebileceği bir ekosistem kurmaktır.',
        'about-text-3': 'Ripplab\'de sadece bir ürün değil, bir deneyim satın alırsınız. Her sanatçı kendi tarzını özgürce yansıtırken, alıcılar da ihtiyaçlarına en uygun çözümleri tek tıkla keşfeder.',
        'about-text-4': 'Misyonumuz; müziğin değerini artırmak, üreticilerin emeklerini korumak ve dünya çapında erişilebilir bir platform sunmaktır.',
        'about-text-5': 'Vizyonumuz ise; müzik üretimi ve paylaşımında ilham veren, güvenilir ve yenilikçi bir merkez olmaktır.',
        'about-text-6': 'Ripplab',
        'about-text-7': 'Müziğin ve yaratıcılığın dalgalarını birlikte büyütelim.',
        
        // Footer
        'footer-copyright': 'Tüm hakları saklıdır.'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-featured': 'Featured',
        'nav-about': 'About',
        
        // Hero Section
        'hero-title': 'Journey Through the Waves of Music',
        'hero-subtitle': 'Discover the magical world of music with Ripplab',
        'cta-button': 'Explore Store',
        
        // Music Player
        'track-title': 'Lobby',
        'track-artist': 'Sea',
        
        // Playlists Section
        'section-title': 'Featured',
        'beat': 'Beat',
        'sound-effects': 'Sound Effects',
        'album-covers': 'Album Covers',
        'instruments': 'Instruments',
        'lyrics': 'Film Music',
        'rhythms': 'Classical',
        'not-available': 'not available yet',
        
        // About Section
        'about-title': 'About Ripplab',
        'about-text-1': 'Ripplab is a modern digital marketplace where music can be freely produced and shared, and artists and listeners can come together under the same roof.',
        'about-text-2': 'Our goal is to create an ecosystem where producers, composers, and designers can easily showcase their works, and listeners can safely acquire the music, beats, cover designs, or sound effects they need.',
        'about-text-3': 'At Ripplab, you don\'t just buy a product, you buy an experience. While each artist freely reflects their own style, buyers also discover solutions that best suit their needs with a single click.',
        'about-text-4': 'Our mission is to increase the value of music, protect the efforts of producers, and provide a globally accessible platform.',
        'about-text-5': 'Our vision is to be an inspiring, reliable, and innovative center in music production and sharing.',
        'about-text-6': 'Ripplab',
        'about-text-7': 'Let\'s grow the waves of music and creativity together.',
        
        // Footer
        'footer-copyright': 'All rights reserved.'
    }
};

function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update navigation
    document.querySelector('a[href="#home"]').textContent = translations[lang]['nav-home'];
    document.querySelector('a[href="#playlists"]').textContent = translations[lang]['nav-featured'];
    document.querySelector('a[href="#about"]').textContent = translations[lang]['nav-about'];
    
    // Update hero section
    document.querySelector('.hero-title').textContent = translations[lang]['hero-title'];
    document.querySelector('.hero-subtitle').textContent = translations[lang]['hero-subtitle'];
    document.querySelector('.cta-button').textContent = translations[lang]['cta-button'];
    
    // Update music player
    document.querySelector('.track-title').textContent = translations[lang]['track-title'];
    document.querySelector('.track-artist').textContent = translations[lang]['track-artist'];
    
    // Update playlists section
    document.querySelector('.section-title').textContent = translations[lang]['section-title'];
    
    // Update about section
    document.querySelector('.about-title').textContent = translations[lang]['about-title'];
    
    // Update playlist cards
    const playlistNames = document.querySelectorAll('.playlist-name');
    const playlistCounts = document.querySelectorAll('.playlist-count');
    
    if (playlistNames.length >= 6) {
        playlistNames[0].textContent = translations[lang]['beat'];
        playlistNames[1].textContent = translations[lang]['sound-effects'];
        playlistNames[2].textContent = translations[lang]['album-covers'];
        playlistNames[3].textContent = translations[lang]['instruments'];
        playlistNames[4].textContent = translations[lang]['lyrics'];
        playlistNames[5].textContent = translations[lang]['rhythms'];
    }
    
    playlistCounts.forEach(count => {
        count.textContent = translations[lang]['not-available'];
    });
    
    // Update about section
    const aboutTexts = document.querySelectorAll('.about-text');
    if (aboutTexts.length >= 7) {
        aboutTexts[0].textContent = translations[lang]['about-text-1'];
        aboutTexts[1].textContent = translations[lang]['about-text-2'];
        aboutTexts[2].textContent = translations[lang]['about-text-3'];
        aboutTexts[3].textContent = translations[lang]['about-text-4'];
        aboutTexts[4].textContent = translations[lang]['about-text-5'];
        aboutTexts[5].textContent = translations[lang]['about-text-6'];
        aboutTexts[6].textContent = translations[lang]['about-text-7'];
    }
    
    // Update footer
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) {
        footerCopyright.innerHTML = `&copy; 2025 Ripplab. ${translations[lang]['footer-copyright']}`;
    }
    
    // Update language icon
    const languageIcon = document.getElementById('language-icon');
    if (languageIcon) {
        languageIcon.className = lang === 'tr' ? 'fas fa-globe' : 'fas fa-globe';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save language preference
    try {
        localStorage.setItem('language', lang);
    } catch (_) {}
}

function toggleLanguage() {
    const nextLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    updateLanguage(nextLanguage);
}

// Initialize language
function initializeLanguage() {
    let savedLanguage = null;
    try {
        savedLanguage = localStorage.getItem('language');
    } catch (_) {
        savedLanguage = null;
    }
    
    const languageToApply = savedLanguage || 'tr';
    updateLanguage(languageToApply);
}

// Add event listener for language toggle
const languageToggleBtn = document.querySelector('.language-toggle');
if (languageToggleBtn) {
    languageToggleBtn.addEventListener('click', toggleLanguage);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    
    // Update time display and volume fill with initial values
    updateTimeDisplay();
    updateVolumeFill(0.2);
    
    // Reset progress bar width to 0%
    const progressFill = document.querySelector('.progress-section .progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    
    // Continuous music state saving
    setInterval(() => {
        if (audioElement && isPlaying) {
            try {
                localStorage.setItem('musicPlaying', 'true');
                localStorage.setItem('musicVolume', audioElement.volume.toString());
                localStorage.setItem('musicLastSaved', Date.now().toString());
            } catch (e) {
                // Could not save music state continuously
            }
        }
    }, 1000); // Save every 1 second for better reliability
});

// Prevent music from stopping when page changes
window.addEventListener('beforeunload', function() {
    // Don't stop the music when leaving the page
    if (audioElement && isPlaying) {
        // Keep the music playing in background
        audioElement.volume = 0.1; // Lower volume for background
        // Force save current state
        try {
            localStorage.setItem('musicPlaying', 'true');
            localStorage.setItem('musicStartTime', Date.now().toString());
            localStorage.setItem('musicVolume', audioElement.volume.toString());
        } catch (e) {
            // Could not save music state
        }
    }
});

// Also save music state when page becomes hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden && audioElement && isPlaying) {
        try {
            localStorage.setItem('musicPlaying', 'true');
            localStorage.setItem('musicStartTime', Date.now().toString());
            localStorage.setItem('musicVolume', audioElement.volume.toString());
        } catch (e) {
            // Could not save music state on visibility change
        }
    }
});

// Metre çubuklarını mavi çizgiye göre güncelle
function updateMeters() {
    const meters = document.querySelectorAll('.meter');
    const centerLineY = window.innerHeight / 2; /* Mavi çizginin Y pozisyonu */
    
    let closestMeter = null;
    let closestDistance = Infinity;
    
    // Önce tüm metre çubuklarını pasif yap
    meters.forEach(meter => {
        meter.classList.remove('active');
        meter.classList.remove('active-1');
        meter.classList.remove('active-2');
        meter.classList.remove('active-3');
    });
    
    // En yakın metre çubuğunu bul
    meters.forEach((meter, index) => {
        const rect = meter.getBoundingClientRect();
        const meterCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(meterCenterY - centerLineY);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestMeter = { element: meter, index: index };
        }
    });
    
    // Ana aktif çubuğu ve etrafındakileri kademeli olarak uzat
    if (closestMeter) {
        const mainIndex = closestMeter.index;
        
        // Ana çubuk (en uzun)
        closestMeter.element.classList.add('active');
        
        // Ana çubuğun etrafındaki çubuklar (ana çubuğun pozisyonuna göre)
        // Üstteki 3 çubuk
        if (mainIndex > 0) {
            meters[mainIndex - 1].classList.add('active-1');
        }
        if (mainIndex > 1) {
            meters[mainIndex - 2].classList.add('active-2');
        }
        if (mainIndex > 2) {
            meters[mainIndex - 3].classList.add('active-3');
        }
        
        // Alttaki 3 çubuk
        if (mainIndex < meters.length - 1) {
            meters[mainIndex + 1].classList.add('active-1');
        }
        if (mainIndex < meters.length - 2) {
            meters[mainIndex + 2].classList.add('active-2');
        }
        if (mainIndex < meters.length - 3) {
            meters[mainIndex + 3].classList.add('active-3');
        }
    }
}

// Scroll ve resize event'lerinde metre çubuklarını güncelle
window.addEventListener('scroll', updateMeters);
window.addEventListener('resize', updateMeters);

// Simple Scroll Area Functionality
function initInvisibleScroll() {
    const scrollArea = document.querySelector('.meter-scroll-area');
    if (!scrollArea) return;

            // Scroll area found

    // Mouse wheel event listener
    scrollArea.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Wheel event
        
        // Force scroll
        const currentScroll = window.pageYOffset;
        const newScroll = currentScroll + e.deltaY;
        
        window.scrollTo({
            top: newScroll,
            behavior: 'instant'
        });
        
        // Scrolled
    });

    // Also add mousedown and mousemove for drag scroll
    let isDragging = false;
    let startY = 0;
    let startScroll = 0;

    scrollArea.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        startY = e.clientY;
        startScroll = window.pageYOffset;
        // Mouse down, starting drag
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        const newScroll = startScroll + (deltaY * 3); // Tersine çevrildi, 3x hassas
        
        window.scrollTo({
            top: newScroll,
            behavior: 'instant'
        });
        
        // Dragging, scroll to
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        // Mouse up, drag ended
    });

    // Prevent text selection
    scrollArea.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

            // Wheel and drag event listeners added
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateMeters(); // Metre çubuklarını güncelle
    initInvisibleScroll(); // Görünmez scroll fonksiyonunu başlat
    initializeTheme(); // Tema başlangıcını ayarla
});