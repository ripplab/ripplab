// Gerçek Zamanlı Tarih ve Saat İşlemleri
class TimeUtils {
    constructor() {
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.startRealTimeUpdates();
    }

    // Gerçek zamanlı güncellemeleri başlat
    startRealTimeUpdates() {
        // Her saniye güncelle
        this.updateInterval = setInterval(() => {
            this.updateAllTimeElements();
        }, 1000);
    }

    // Tüm zaman elementlerini güncelle
    updateAllTimeElements() {
        const timeElements = document.querySelectorAll('.time-badge');
        timeElements.forEach(element => {
            // Yayın tarihini al - DEĞİŞTİRME!
            const publishTime = element.dataset.publishTime;
            if (!publishTime) {
                // Eğer publish time yoksa, hiçbir şey yapma
                return;
            }
            
            // Sadece süreyi hesapla ve göster - yayın tarihini değiştirme!
            const timeAgo = this.calculateTimeAgo(publishTime);
            const publishDate = this.formatPublishDate(publishTime);
            element.textContent = `${timeAgo} • ${publishDate}`;
        });
    }

    // Yayınlanma zamanından şu ana kadar geçen süreyi hesapla
    calculateTimeAgo(publishTime) {
        if (!publishTime) return 'Az önce';
        
        const now = new Date();
        const publishDate = new Date(publishTime);
        const diffMs = now - publishDate;
        
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffSeconds < 60) {
            return 'Az önce';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} dakika önce`;
        } else if (diffHours < 24) {
            return `${diffHours} saat önce`;
        } else if (diffDays < 7) {
            return `${diffDays} gün önce`;
        } else if (diffWeeks < 4) {
            return `${diffWeeks} hafta önce`;
        } else if (diffMonths < 12) {
            return `${diffMonths} ay önce`;
        } else {
            return `${diffYears} yıl önce`;
        }
    }

    // Yayınlanma tarihini formatla
    formatPublishDate(publishTime) {
        if (!publishTime) return 'Tarih bilgisi yok';
        
        const date = new Date(publishTime);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return date.toLocaleDateString('tr-TR', options);
    }

    // Yeni içerik eklerken zaman bilgisini ayarla
    setPublishTime(element, publishTime) {
        if (element.classList.contains('time-badge')) {
            element.dataset.publishTime = publishTime;
            const timeAgo = this.calculateTimeAgo(publishTime);
            const publishDate = this.formatPublishDate(publishTime);
            element.textContent = `${timeAgo} • ${publishDate}`;
        }
    }

    // Şu anki zamanı ayarla - ARTIK KULLANILMIYOR
    // setCurrentTime(element) {
    //     const now = new Date().toISOString();
    //     this.setPublishTime(element, now);
    // }

    // Gerçek zamanlı güncellemeleri durdur
    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Global olarak erişilebilir yap
window.TimeUtils = TimeUtils;

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    window.timeUtils = new TimeUtils();
    
    // LocalStorage'dan yayın tarihlerini geri yükle
    const timeElements = document.querySelectorAll('.time-badge');
    timeElements.forEach(element => {
        const musicId = element.closest('.content-card')?.getAttribute('data-music-id') || 'default';
        const savedPublishTime = localStorage.getItem(`publishTime_${musicId}`);
        
        if (savedPublishTime) {
            // LocalStorage'dan yayın tarihini geri yükle - DEĞİŞTİRME!
            element.dataset.publishTime = savedPublishTime;
        } else {
            // SADECE İLK KEZ - Eğer kaydedilmiş tarih yoksa, şu anki zamanı ayarla
            const currentTime = new Date().toISOString();
            element.dataset.publishTime = currentTime;
            
            // LocalStorage'a kaydet ki bir daha değişmesin
            localStorage.setItem(`publishTime_${musicId}`, currentTime);
        }
    });
});
