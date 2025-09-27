// Ripplab Auth JavaScript - Oturum Açma Sayfası

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const authForms = document.querySelectorAll('.auth-form');
const backgroundMusic = document.getElementById('background-music');

// Music error handling
if (backgroundMusic) {
    backgroundMusic.addEventListener('error', function(e) {
        // Audio error
        // Try to reload audio
        setTimeout(() => {
            backgroundMusic.load();
        }, 1000);
    });
    
    backgroundMusic.addEventListener('ended', function() {
        // If music ends, restart it if it should be playing
        if (localStorage.getItem('musicPlaying') === 'true' || localStorage.getItem('musicForceSave') === 'true') {
            backgroundMusic.play().catch(e => { /* Restart failed */ });
        }
    });
    
    // Also monitor for any audio interruptions
    backgroundMusic.addEventListener('pause', function() {
        const shouldPlay = localStorage.getItem('musicPlaying') === 'true' || localStorage.getItem('musicForceSave') === 'true';
        if (shouldPlay) {
            // Music paused unexpectedly, restarting
            setTimeout(() => {
                                  backgroundMusic.play().catch(e => { /* Restart after pause failed */ });
            }, 100);
        }
    });
}



// Tab Switching
function switchTab(tabName) {
    // Remove active class from all tabs and forms
    tabBtns.forEach(btn => btn.classList.remove('active'));
    authForms.forEach(form => form.classList.remove('active'));
    
    // Add active class to selected tab and form
    if (tabName === 'login') {
        tabBtns[0].classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else if (tabName === 'register') {
        tabBtns[1].classList.add('active');
        document.getElementById('register-form').classList.add('active');
    }
}

// Theme initialization from lobby page
function initializeTheme() {
    // Get theme from localStorage (set by lobby page)
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (_) {
        savedTheme = null;
    }

    const themeToApply = savedTheme || 'light';
    
    // Apply theme without saving (lobby page handles saving)
    const isDarkMode = themeToApply === 'dark';
    document.body.classList.toggle('theme-dark', isDarkMode);
    document.body.classList.toggle('theme-light', !isDarkMode);
}

// Language Toggle
let currentLanguage = 'tr';

const translations = {
    tr: {
        // Header
        'auth-title': 'Hoş Geldiniz',
        'auth-subtitle': 'Müzik dünyasına giriş yapın',
        'login-tab': 'Giriş Yap',
        'register-tab': 'Kayıt Ol',
        
        // Login Form
        'email-label': 'E-posta',
        'password-label': 'Şifre',
        'remember-me': 'Beni hatırla',
        'forgot-password': 'Şifremi unuttum',
        'login-btn': 'Giriş Yap',
        
        // Register Form
        'name-label': 'Ad Soyad',
        'confirm-password': 'Şifre Tekrar',
        'accept-terms': 'Kullanım şartlarını',
        'accept-terms-suffix': 'kabul ediyorum',
        'register-btn': 'Kayıt Ol',
        
        // Footer
        'back-home': 'Ana Sayfaya Dön',
        
        // Social Media
        'or-divider': 'veya',
        'facebook-login': 'Facebook',
        'google-login': 'Google'
    },
    en: {
        // Header
        'auth-title': 'Welcome',
        'auth-subtitle': 'Sign in to the music world',
        'login-tab': 'Sign In',
        'register-tab': 'Sign Up',
        
        // Login Form
        'email-label': 'Email',
        'password-label': 'Password',
        'remember-me': 'Remember me',
        'forgot-password': 'Forgot password',
        'login-btn': 'Sign In',
        
        // Register Form
        'name-label': 'Full Name',
        'confirm-password': 'Confirm Password',
        'accept-terms': 'terms of use',
        'accept-terms-suffix': 'I accept',
        'register-btn': 'Sign Up',
        
        // Footer
        'back-home': 'Back to Home',
        
        // Social Media
        'or-divider': 'or',
        'facebook-login': 'Facebook',
        'google-login': 'Google'
    }
};

function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update auth header
    document.querySelector('.auth-title').textContent = translations[lang]['auth-title'];
    document.querySelector('.auth-subtitle').textContent = translations[lang]['auth-subtitle'];
    
    // Update tab buttons
    tabBtns[0].innerHTML = `<i class="fas fa-sign-in-alt"></i>${translations[lang]['login-tab']}`;
    tabBtns[1].innerHTML = `<i class="fas fa-user-plus"></i>${translations[lang]['register-tab']}`;
    
    // Update login form
    document.querySelector('label[for="login-email"]').textContent = translations[lang]['email-label'];
    document.querySelector('label[for="login-password"]').textContent = translations[lang]['password-label'];
    document.querySelector('#remember-me-text').textContent = translations[lang]['remember-me'];
    document.querySelector('#forgot-password-link').textContent = translations[lang]['forgot-password'];
    document.querySelector('#login-form .auth-btn').innerHTML = `<i class="fas fa-sign-in-alt"></i>${translations[lang]['login-btn']}`;
    
    // Update register form
    document.querySelector('label[for="register-name"]').textContent = translations[lang]['name-label'];
    document.querySelector('label[for="register-email"]').textContent = translations[lang]['email-label'];
    document.querySelector('label[for="register-password"]').textContent = translations[lang]['password-label'];
    document.querySelector('label[for="register-confirm"]').textContent = translations[lang]['confirm-password'];
    document.querySelector('#terms-link').textContent = translations[lang]['accept-terms'];
    document.querySelector('#accept-terms-suffix-text').textContent = translations[lang]['accept-terms-suffix'];
    document.querySelector('#register-form .auth-btn').innerHTML = `<i class="fas fa-user-plus"></i>${translations[lang]['register-btn']}`;
    
    // Update footer
    document.querySelector('#back-home-text').textContent = translations[lang]['back-home'];
    
    // Update social media elements
    const socialDividers = document.querySelectorAll('.social-divider span');
    socialDividers.forEach(divider => {
        divider.textContent = translations[lang]['or-divider'];
    });
    
    // Update Facebook and Google login buttons
    const facebookLoginBtn = document.querySelector('#login-form .facebook-btn');
    const googleLoginBtn = document.querySelector('#login-form .google-btn');
    if (facebookLoginBtn) facebookLoginBtn.innerHTML = `<i class="fab fa-facebook-f"></i>${translations[lang]['facebook-login']}`;
    if (googleLoginBtn) googleLoginBtn.innerHTML = `<i class="fab fa-google"></i>${translations[lang]['google-login']}`;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Note: Language preference is saved by lobby page, not here
}

function initializeLanguage() {
    // Get language from localStorage (set by lobby page)
    let savedLanguage = null;
    try {
        savedLanguage = localStorage.getItem('language');
    } catch (_) {
        savedLanguage = null;
    }
    
    const languageToApply = savedLanguage || 'tr';
    updateLanguage(languageToApply);
}

// Form Handling
function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const remember = document.querySelector('input[name="remember"]').checked;
    
            // Login attempt
    // TODO: Implement actual login logic
    alert('Giriş yapılıyor... (Demo)');
}

function handleRegisterSubmit(event) {
            // Register form submitted
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const terms = document.querySelector('input[name="terms"]').checked;
    
            // Form data
    // Terms checkbox checked
    
    if (password !== confirm) {
        alert('Şifreler eşleşmiyor!');
        return;
    }
    
    if (!terms) {
        // Terms not accepted, form submission blocked
        
        // Just block the form submission, no visual effects
        return;
    }
    
    // Register attempt
    // TODO: Implement actual registration logic
    alert('Kayıt yapılıyor... (Demo)');
}

// Terms checkbox behavior is now handled in initializeTermsCheckbox

// Initialize terms checkbox behavior
function initializeTermsCheckbox() {
    const termsCheckbox = document.querySelector('input[name="terms"]');
    const termsLabel = document.querySelector('.checkbox input[name="terms"]').closest('.checkbox');
    
    if (termsCheckbox && termsLabel) {
        // Every click: redirect to terms page
        const handleClick = function(event) {
            event.preventDefault();
            event.stopPropagation();
            window.location.href = 'terms.html';
            return false;
        };
        
        // Add event listeners
        termsCheckbox.addEventListener('click', handleClick);
        termsLabel.addEventListener('click', handleClick);
        
        // Terms checkbox listeners added
    }
}

// Event Listeners - Theme and language are handled by lobby page

// Form submit handlers are now added in DOMContentLoaded

// Social Media Login Functions
function loginWithFacebook() {
    // Facebook login initiated
    // TODO: Implement Facebook Login SDK
    alert('Facebook girişi başlatılıyor... (Demo)');
    
    // Simulate Facebook login process
    setTimeout(() => {
        const userData = {
            name: 'Facebook Kullanıcısı',
            email: 'facebook@example.com',
            provider: 'facebook'
        };
        
        // Facebook login successful
        alert(`Hoş geldin ${userData.name}! Facebook ile giriş yapıldı.`);
        
        // Redirect to main page or dashboard
        // window.location.href = '../lobi/index.html';
    }, 2000);
}

function loginWithGoogle() {
    // Google login initiated
    // TODO: Implement Google Login SDK
    alert('Google girişi başlatılıyor... (Demo)');
    
    // Simulate Google login process
    setTimeout(() => {
        const userData = {
            name: 'Google Kullanıcısı',
            email: 'google@example.com',
            provider: 'google'
        };
        
        // Google login successful
        alert(`Hoş geldin ${userData.name}! Google ile giriş yapıldı.`);
        
        // Redirect to main page or dashboard
        // window.location.href = '../lobi/index.html';
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM loaded, initializing
    
    initializeTheme();
    initializeLanguage();
    initializeTermsCheckbox();
    
    // Add form submit handlers
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');
    
    // Found forms
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
        // Added submit listener to login form
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
        // Added submit listener to register form
        
        // Also add click listener to the submit button as backup
        const registerBtn = registerForm.querySelector('.auth-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', function(e) {
                // Register button clicked
                // Don't prevent default, let the form submit handler work
            });
            // Added click listener to register button
        }
    }
    
    // Check if coming from terms page
    if (window.location.hash === '#register') {
        switchTab('register');
        // Check the terms checkbox
        const termsCheckbox = document.querySelector('input[name="terms"]');
        if (termsCheckbox) {
            termsCheckbox.checked = true;
        }
    } else {
        // Set default tab
        switchTab('login');
    }
    
    // Auto-continue music if it was playing in lobby
    try {
        const wasPlaying = localStorage.getItem('musicPlaying');
        const musicVolume = localStorage.getItem('musicVolume');
        const forceSave = localStorage.getItem('musicForceSave');
        
        // Music state check
        
        if ((wasPlaying === 'true' || forceSave === 'true') && backgroundMusic) {
            // Set volume to match lobby settings
            backgroundMusic.volume = musicVolume ? parseFloat(musicVolume) : 0.2;
            
            // Start playing automatically with aggressive retry mechanism
            const startMusic = () => {
                backgroundMusic.play().then(() => {
                    console.log('Music started successfully');
                    // Clear force save flag
                    localStorage.removeItem('musicForceSave');
                }).catch(e => {
                    console.log('Auto-play prevented, retrying...', e);
                    // Retry multiple times
                    setTimeout(() => startMusic(), 500);
                    setTimeout(() => startMusic(), 1000);
                    setTimeout(() => startMusic(), 2000);
                });
            };
            
            // Try to start immediately
            startMusic();
            
            // Also try on first user interaction
            const startOnInteraction = () => {
                if (backgroundMusic.paused) {
                    startMusic();
                }
                document.removeEventListener('click', startOnInteraction);
                document.removeEventListener('keydown', startOnInteraction);
                document.removeEventListener('mousemove', startOnInteraction);
            };
            
            document.addEventListener('click', startOnInteraction);
            document.addEventListener('keydown', startOnInteraction);
            document.addEventListener('mousemove', startOnInteraction);
            
            // Continuous monitoring to ensure music keeps playing
            setInterval(() => {
                if (backgroundMusic.paused && (wasPlaying === 'true' || forceSave === 'true')) {
                    console.log('Music stopped, restarting...');
                    startMusic();
                }
            }, 1000); // Check every 1 second for better reliability
        }
    } catch (e) {
        console.log('Could not check music state:', e);
    }
});
