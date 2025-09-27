// Ripplab Terms JavaScript - Kullanım Koşulları Sayfası

// Lobi'deki tema ve dil durumunu otomatik olarak al
function syncThemeAndLanguageWithLobi() {
    // Lobi sayfasından tema durumunu al
    const lobiTheme = localStorage.getItem('theme');
    if (lobiTheme === 'dark') {
        document.body.classList.add('theme-dark');
    } else {
        document.body.classList.remove('theme-dark');
    }
    
    // Lobi sayfasından dil durumunu al
    const lobiLanguage = localStorage.getItem('language');
    if (lobiLanguage) {
        // Dil değişkenlerini güncelle
        updateLanguageContent(lobiLanguage);
    }
}



// Dil içeriğini güncelle
function updateLanguageContent(language) {
    const languageData = {
        'tr': {
            title: 'Ripplab Kullanım Koşulları ve Üyelik Sözleşmesi',
            date: 'Son Güncelleme: 18 Ağustos 2025',
            section1: '1. Genel Hükümler',
            section1Content: 'İşbu Kullanım Koşulları ve Üyelik Sözleşmesi ("Sözleşme"), Ripplab ("Site", "Platform") ile Site\'ye üye olan veya herhangi bir şekilde Site\'yi kullanan gerçek ve tüzel kişiler ("Kullanıcı") arasında düzenlenmiştir.',
            section1Content2: 'Bu Sözleşme\'nin amacı, Site\'nin sunduğu hizmetlerden yararlanılmasına ilişkin koşulların, tarafların hak ve yükümlülüklerinin belirlenmesidir.',
            section1Content3: 'Site\'ye giriş yapan, üyelik oluşturan, içerik yükleyen veya herhangi bir hizmetten faydalanan tüm Kullanıcılar işbu sözleşmeyi kabul etmiş sayılır.',
            section2: '2. Üyelik ve Hesap Güvenliği',
            section2Content: 'Ripplab, kullanıcıların;',
            section2List1: 'Müzik, beat, ses efekti, albüm kapağı, görsel tasarım ve benzeri dijital içeriklerini yüklemelerine,',
            section2List2: 'Bu içerikleri satışa sunmalarına veya satın almalarına,',
            section2List3: 'İçeriklere ilişkin telif hakları, lisanslar ve kullanım izinleri ile ilgili bilgi edinmelerine,',
            section2List4: 'Kullanıcı profilleri oluşturmalarına, takip etmelerine ve etkileşimde bulunmalarına',
            section2Content2: 'imkân sağlayan bir dijital platformdur.',
            section2Content3: 'Ripplab, hizmetin kapsamını her zaman değiştirme, genişletme, sınırlandırma veya tamamen sonlandırma hakkını saklı tutar.',
            section3: '3. Hizmet Kullanımı',
            section3_1: '3.1 Hesap Açma',
            section3_1_list1: 'Kullanıcı, üyelik oluştururken doğru, güncel ve eksiksiz bilgi vermekle yükümlüdür.',
            section3_1_list2: 'Hesap bilgileri (kullanıcı adı, şifre vb.) yalnızca kullanıcıya aittir. Başkalarıyla paylaşılması yasaktır.',
            section3_1_list3: 'Kullanıcı, hesabının güvenliğini sağlamakla sorumludur.',
            section3_2: '3.2 İçerik Yükleme ve Paylaşım',
            section3_2_list1: 'Kullanıcı, yüklediği içeriklerin yasalara, ahlaka ve genel kamu düzenine aykırı olmadığını kabul eder.',
            section3_2_list2: 'Kullanıcı, yüklediği içeriklerin telif hakkı sahibi olduğunu veya yasal lisanslarını aldığını beyan eder.',
            section3_2_list3: 'Başkasına ait müzik, görsel, ses veya benzeri içerikleri izinsiz yüklemek kesinlikle yasaktır.',
            section3_2_list4: 'İçerikler, Ripplab tarafından incelenir ve şartlara aykırı görülen içerikler yayından kaldırılır.',
            section3_3: '3.3 Yasaklı Kullanımlar',
            section3_3_content: 'Aşağıdaki durumlar yasaktır:',
            section3_3_list1: 'Telif hakkı ihlali, korsan içerik yükleme veya satma,',
            section3_3_list2: 'Yasadışı, şiddet içerikli, hakaret içeren veya nefret söylemi barındıran içerik paylaşma,',
            section3_3_list3: 'Dolandırıcılık, sahtecilik veya yanıltıcı davranışlarda bulunma,',
            section3_3_list4: 'Yazılım, bot veya hack yöntemleriyle platforma müdahale etme,',
            section3_3_list5: 'Ripplab\'ın marka ve hizmetlerini kötüye kullanma.',
            section4: '4. Fikri Mülkiyet Hakları',
            section4_list1: 'Kullanıcı, Ripplab\'a yüklediği içerikler üzerinde tüm telif haklarını saklı tutar.',
            section4_list2: 'Ancak, içerik yüklenmesiyle birlikte Kullanıcı, Ripplab\'a içerikleri tanıtım, pazarlama ve hizmet sunma amacıyla sınırlı, devredilemez, geri alınabilir bir kullanım hakkı vermiş olur.',
            section4_list3: 'Kullanıcı, sattığı içeriklerin alıcı tarafından yalnızca belirtilen lisans koşullarına uygun şekilde kullanılacağını kabul eder.',
            section4_list4: 'Telif hakkı ihlali bildirimleri, "support@ripplab.com" adresine yapılmalıdır.',
            section5: '5. Ödeme ve İade Koşulları',
            section5_list1: 'Ripplab üzerinden yapılan satışlarda platform belirli bir komisyon oranı uygular. Bu oran önceden duyurulur ve değiştirilebilir.',
            section5_list2: 'Satıcı, satışa koyduğu içeriklerin fiyatlarını kendisi belirler.',
            section5_list3: 'Kullanıcılar, satış gelirlerini Ripplab\'ın belirlediği ödeme yöntemleri üzerinden tahsil edebilir.',
            section5_list4: 'Kullanıcı, elde ettiği gelirler üzerinden doğabilecek her türlü vergi, harç ve yasal yükümlülüklerden sorumludur. Ripplab bu yükümlülüklerden sorumlu tutulamaz.',
            section5_list5: 'Ripplab, ödeme işlemlerinde üçüncü taraf ödeme sağlayıcılarla çalışabilir. Kullanıcı, bu sağlayıcıların şartlarına uymak zorundadır.',
            section6: '6. Gizlilik ve Veri Güvenliği',
            section6_list1: 'Ripplab, kullanıcıların kişisel verilerini KVKK ve ilgili mevzuat kapsamında işler.',
            section6_list2: 'Kullanıcı bilgileri, üçüncü kişilerle paylaşılmaz; yalnızca yasal zorunluluk halinde resmi makamlarla paylaşılabilir.',
            section6_list3: 'Kullanıcı, verilerinin işlenmesine ve saklanmasına onay vermektedir.',
            section7: '7. Sorumluluk Sınırları',
            section7_list1: 'Ripplab, kullanıcılar tarafından yüklenen içeriklerden hukuken sorumlu değildir.',
            section7_list2: 'Ripplab, sistemin kesintisiz ve hatasız işlemesini sağlamak için gerekli çabayı gösterir ancak teknik aksaklıklardan dolayı sorumluluk kabul etmez.',
            section7_list3: 'Kullanıcı, Site\'yi kullanırken maruz kalabileceği veri kaybı, zarar veya üçüncü kişilerin eylemlerinden doğan kayıplardan bizzat sorumludur.',
            section8: '8. Uyuşmazlık Çözümü',
            section8_list1: 'İşbu sözleşmeden doğabilecek uyuşmazlıklarda Türk Hukuku uygulanır.',
            section8_list2: 'Taraflar, öncelikle iyi niyetli müzakerelerle çözüm arar.',
            section8_list3: 'Çözüm sağlanamazsa, İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.',
            section9: '9. Değişiklikler',
            section9_content: 'Ripplab, işbu kullanım koşullarını her zaman değiştirme hakkına sahiptir. Değişiklikler Site üzerinde yayınlandığı tarihten itibaren geçerlidir. Kullanıcı, güncel koşulları düzenli olarak takip etmekle yükümlüdür.',
            section10: '10. İletişim',
            section10_content: 'Her türlü soru, öneri ve şikâyet için:',
            section10_email: '📩 support@ripplab.com',
                agreeButton: 'Okudum Onaylıyorum',
    fastReaderMessage: 'Vay be! Ne kadar hızlı okuyorsun',
    confirmedText: 'Onaylandı!'
        },
        'en': {
            title: 'Ripplab Terms of Service and Membership Agreement',
            date: 'Last Update: August 18, 2025',
            section1: '1. General Provisions',
            section1Content: 'These Terms of Service and Membership Agreement ("Agreement") is established between Ripplab ("Site", "Platform") and real and legal persons ("User") who become members of the Site or use the Site in any way.',
            section1Content2: 'The purpose of this Agreement is to determine the conditions for benefiting from the services offered by the Site and the rights and obligations of the parties.',
            section1Content3: 'All Users who enter the Site, create membership, upload content or benefit from any service are deemed to have accepted this agreement.',
            section2: '2. Membership and Account Security',
            section2Content: 'Ripplab provides users with the opportunity to;',
            section2List1: 'Upload their digital content such as music, beats, sound effects, album covers, visual designs and similar,',
            section2List2: 'Sell or purchase these contents,',
            section2List3: 'Obtain information about copyrights, licenses and usage permissions related to content,',
            section2List4: 'Create user profiles, follow and interact with them',
            section2Content2: 'is a digital platform.',
            section2Content3: 'Ripplab reserves the right to change, expand, limit or completely terminate the scope of the service at any time.',
            section3: '3. Service Usage',
            section3_1: '3.1 Account Creation',
            section3_1_list1: 'The user is obliged to provide accurate, current and complete information when creating membership.',
            section3_1_list2: 'Account information (username, password, etc.) belongs solely to the user. Sharing with others is prohibited.',
            section3_1_list3: 'The user is responsible for ensuring the security of their account.',
            section3_2: '3.2 Content Upload and Sharing',
            section3_2_list1: 'The user accepts that the content they upload does not violate laws, morals and general public order.',
            section3_2_list2: 'The user declares that they own the copyright of the content they upload or have obtained legal licenses.',
            section3_2_list3: 'It is strictly forbidden to upload music, visual, audio or similar content belonging to others without permission.',
            section3_2_list4: 'Content is reviewed by Ripplab and content found to be contrary to the terms is removed from publication.',
            section3_3: '3.3 Prohibited Uses',
            section3_3_content: 'The following situations are prohibited:',
            section3_3_list1: 'Copyright infringement, uploading or selling pirated content,',
            section3_3_list2: 'Sharing content containing illegal, violent, offensive or hate speech,',
            section3_3_list3: 'Engaging in fraud, forgery or misleading behavior,',
            section3_3_list4: 'Interfering with the platform using software, bots or hack methods,',
            section3_3_list5: 'Misusing Ripplab\'s brands and services.',
            section4: '4. Intellectual Property Rights',
            section4_list1: 'The user retains all copyrights on the content they upload to Ripplab.',
            section4_list2: 'However, with the upload of content, the User grants Ripplab a limited, non-transferable, revocable right to use the content for promotional, marketing and service provision purposes.',
            section4_list3: 'The user accepts that the content they sell will be used by the buyer only in accordance with the specified license terms.',
            section4_list4: 'Copyright infringement notifications should be made to "support@ripplab.com".',
            section5: '5. Payment and Refund Terms',
            section5_list1: 'In sales made through Ripplab, the platform applies a certain commission rate. This rate is announced in advance and can be changed.',
            section5_list2: 'The seller determines the prices of the content they put up for sale.',
            section5_list3: 'Users can collect sales revenues through payment methods determined by Ripplab.',
            section5_list4: 'The user is responsible for all taxes, fees and legal obligations that may arise from the revenues they earn. Ripplab cannot be held responsible for these obligations.',
            section5_list5: 'Ripplab may work with third-party payment providers in payment transactions. The user must comply with the terms of these providers.',
            section6: '6. Privacy and Data Security',
            section6_list1: 'Ripplab processes users\' personal data within the scope of KVKK and relevant legislation.',
            section6_list2: 'User information is not shared with third parties; it can only be shared with official authorities in case of legal obligation.',
            section6_list3: 'The user consents to the processing and storage of their data.',
            section7: '7. Liability Limits',
            section7_list1: 'Ripplab is not legally responsible for content uploaded by users.',
            section7_list2: 'Ripplab makes the necessary effort to ensure uninterrupted and error-free operation of the system, but does not accept responsibility for technical failures.',
            section7_list3: 'The user is personally responsible for data loss, damage or losses arising from third parties\' actions that they may be exposed to while using the Site.',
            section8: '8. Dispute Resolution',
            section8_list1: 'Turkish Law applies to disputes that may arise from this agreement.',
            section8_list2: 'The parties first seek a solution through good faith negotiations.',
            section8_list3: 'If a solution cannot be reached, Istanbul Central Courts and Enforcement Offices are authorized.',
            section9: '9. Changes',
            section9_content: 'Ripplab has the right to change these terms of use at any time. Changes are valid from the date they are published on the Site. The user is obliged to regularly follow the current conditions.',
            section10: '10. Contact',
            section10_content: 'For all questions, suggestions and complaints:',
            section10_email: '📩 support@ripplab.com',
                agreeButton: 'I Have Read and Agree',
    fastReaderMessage: 'Wow! How fast you read',
    confirmedText: 'Confirmed!'
        }
    };
    
    const data = languageData[language];
    if (!data) return;
    
    // Başlık ve tarih
    const titleElement = document.getElementById('terms-title');
    const dateElement = document.getElementById('terms-date');
    if (titleElement) titleElement.textContent = data.title;
    if (dateElement) dateElement.textContent = data.date;
    
    // Bölüm 1
    const section1Element = document.getElementById('section-1');
    const section1ContentElement = document.getElementById('section-1-content');
    const section1Content2Element = document.getElementById('section-1-content-2');
    const section1Content3Element = document.getElementById('section-1-content-3');
    if (section1Element) section1Element.textContent = data.section1;
    if (section1ContentElement) section1ContentElement.textContent = data.section1Content;
    if (section1Content2Element) section1Content2Element.textContent = data.section1Content2;
    if (section1Content3Element) section1Content3Element.textContent = data.section1Content3;
    
    // Bölüm 2
    const section2Element = document.getElementById('section-2');
    const section2ContentElement = document.getElementById('section-2-content');
    const section2List1Element = document.getElementById('section-2-list-1');
    const section2List2Element = document.getElementById('section-2-list-2');
    const section2List3Element = document.getElementById('section-2-list-3');
    const section2List4Element = document.getElementById('section-2-list-4');
    const section2Content2Element = document.getElementById('section-2-content-2');
    const section2Content3Element = document.getElementById('section-2-content-3');
    if (section2Element) section2Element.textContent = data.section2;
    if (section2ContentElement) section2ContentElement.textContent = data.section2Content;
    if (section2List1Element) section2List1Element.textContent = data.section2List1;
    if (section2List2Element) section2List2Element.textContent = data.section2List2;
    if (section2List3Element) section2List3Element.textContent = data.section2List3;
    if (section2List4Element) section2List4Element.textContent = data.section2List4;
    if (section2Content2Element) section2Content2Element.textContent = data.section2Content2;
    if (section2Content3Element) section2Content3Element.textContent = data.section2Content3;
    
    // Bölüm 3
    const section3Element = document.getElementById('section-3');
    const section3_1Element = document.getElementById('section-3-1');
    const section3_1_list1Element = document.getElementById('section-3-1-list-1');
    const section3_1_list2Element = document.getElementById('section-3-1-list-2');
    const section3_1_list3Element = document.getElementById('section-3-1-list-3');
    const section3_2Element = document.getElementById('section-3-2');
    const section3_2_list1Element = document.getElementById('section-3-2-list-1');
    const section3_2_list2Element = document.getElementById('section-3-2-list-2');
    const section3_2_list3Element = document.getElementById('section-3-2-list-3');
    const section3_2_list4Element = document.getElementById('section-3-2-list-4');
    const section3_3Element = document.getElementById('section-3-3');
    const section3_3_contentElement = document.getElementById('section-3-3-content');
    const section3_3_list1Element = document.getElementById('section-3-3-list-1');
    const section3_3_list2Element = document.getElementById('section-3-3-list-2');
    const section3_3_list3Element = document.getElementById('section-3-3-list-3');
    const section3_3_list4Element = document.getElementById('section-3-3-list-4');
    const section3_3_list5Element = document.getElementById('section-3-3-list-5');
    
    if (section3Element) section3Element.textContent = data.section3;
    if (section3_1Element) section3_1Element.textContent = data.section3_1;
    if (section3_1_list1Element) section3_1_list1Element.textContent = data.section3_1_list1;
    if (section3_1_list2Element) section3_1_list2Element.textContent = data.section3_1_list2;
    if (section3_1_list3Element) section3_1_list3Element.textContent = data.section3_1_list3;
    if (section3_2Element) section3_2Element.textContent = data.section3_2;
    if (section3_2_list1Element) section3_2_list1Element.textContent = data.section3_2_list1;
    if (section3_2_list2Element) section3_2_list2Element.textContent = data.section3_2_list2;
    if (section3_2_list3Element) section3_2_list3Element.textContent = data.section3_2_list3;
    if (section3_2_list4Element) section3_2_list4Element.textContent = data.section3_2_list4;
    if (section3_3Element) section3_3Element.textContent = data.section3_3;
    if (section3_3_contentElement) section3_3_contentElement.textContent = data.section3_3_content;
    if (section3_3_list1Element) section3_3_list1Element.textContent = data.section3_3_list1;
    if (section3_3_list2Element) section3_3_list2Element.textContent = data.section3_3_list2;
    if (section3_3_list3Element) section3_3_list3Element.textContent = data.section3_3_list3;
    if (section3_3_list4Element) section3_3_list4Element.textContent = data.section3_3_list4;
    if (section3_3_list5Element) section3_3_list5Element.textContent = data.section3_3_list5;
    
    // Bölüm 4
    const section4Element = document.getElementById('section-4');
    const section4_list1Element = document.getElementById('section-4-list-1');
    const section4_list2Element = document.getElementById('section-4-list-2');
    const section4_list3Element = document.getElementById('section-4-list-3');
    const section4_list4Element = document.getElementById('section-4-list-4');
    
    if (section4Element) section4Element.textContent = data.section4;
    if (section4_list1Element) section4_list1Element.textContent = data.section4_list1;
    if (section4_list2Element) section4_list2Element.textContent = data.section4_list2;
    if (section4_list3Element) section4_list3Element.textContent = data.section4_list3;
    if (section4_list4Element) section4_list4Element.textContent = data.section4_list4;
    
    // Bölüm 5
    const section5Element = document.getElementById('section-5');
    const section5_list1Element = document.getElementById('section-5-list-1');
    const section5_list2Element = document.getElementById('section-5-list-2');
    const section5_list3Element = document.getElementById('section-5-list-3');
    const section5_list4Element = document.getElementById('section-5-list-4');
    const section5_list5Element = document.getElementById('section-5-list-5');
    
    if (section5Element) section5Element.textContent = data.section5;
    if (section5_list1Element) section5_list1Element.textContent = data.section5_list1;
    if (section5_list2Element) section5_list2Element.textContent = data.section5_list2;
    if (section5_list3Element) section5_list3Element.textContent = data.section5_list3;
    if (section5_list4Element) section5_list4Element.textContent = data.section5_list4;
    if (section5_list5Element) section5_list5Element.textContent = data.section5_list5;
    
    // Bölüm 6
    const section6Element = document.getElementById('section-6');
    const section6_list1Element = document.getElementById('section-6-list-1');
    const section6_list2Element = document.getElementById('section-6-list-2');
    const section6_list3Element = document.getElementById('section-6-list-3');
    
    if (section6Element) section6Element.textContent = data.section6;
    if (section6_list1Element) section6_list1Element.textContent = data.section6_list1;
    if (section6_list2Element) section6_list2Element.textContent = data.section6_list2;
    if (section6_list3Element) section6_list3Element.textContent = data.section6_list3;
    
    // Bölüm 7
    const section7Element = document.getElementById('section-7');
    const section7_list1Element = document.getElementById('section-7-list-1');
    const section7_list2Element = document.getElementById('section-7-list-2');
    const section7_list3Element = document.getElementById('section-7-list-3');
    
    if (section7Element) section7Element.textContent = data.section7;
    if (section7_list1Element) section7_list1Element.textContent = data.section7_list1;
    if (section7_list2Element) section7_list2Element.textContent = data.section7_list2;
    if (section7_list3Element) section7_list3Element.textContent = data.section7_list3;
    
    // Bölüm 8
    const section8Element = document.getElementById('section-8');
    const section8_list1Element = document.getElementById('section-8-list-1');
    const section8_list2Element = document.getElementById('section-8-list-2');
    const section8_list3Element = document.getElementById('section-8-list-3');
    
    if (section8Element) section8Element.textContent = data.section8;
    if (section8_list1Element) section8_list1Element.textContent = data.section8_list1;
    if (section8_list2Element) section8_list2Element.textContent = data.section8_list2;
    if (section8_list3Element) section8_list3Element.textContent = data.section8_list3;
    
    // Bölüm 9
    const section9Element = document.getElementById('section-9');
    const section9_contentElement = document.getElementById('section-9-content');
    
    if (section9Element) section9Element.textContent = data.section9;
    if (section9_contentElement) section9_contentElement.textContent = data.section9_content;
    
    // Bölüm 10
    const section10Element = document.getElementById('section-10');
    const section10_contentElement = document.getElementById('section-10-content');
    const section10_emailElement = document.getElementById('section-10-email');
    
    if (section10Element) section10Element.textContent = data.section10;
    if (section10_contentElement) section10_contentElement.textContent = data.section10_content;
    if (section10_emailElement) section10_emailElement.textContent = data.section10_email;
    
    // Buton metni
    const agreeTextElement = document.getElementById('agree-text');
    if (agreeTextElement) agreeTextElement.textContent = data.agreeButton;
    
    // Hızlı okuma mesajı
    const fastReaderMessageElement = document.getElementById('fast-reader-text');
    if (fastReaderMessageElement) fastReaderMessageElement.textContent = data.fastReaderMessage;
    
    // HTML lang attribute'ını güncelle
    document.documentElement.lang = language;
}

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

// Sayfa yüklendiği zamanı kaydet
let pageLoadTime = Date.now();

// "Okudum Onaylıyorum" butonu işlevi
function agreeToTerms() {
    const agreeBtn = document.querySelector('.agree-btn');
    const agreeText = document.getElementById('agree-text');
    
    // Geçen süreyi hesapla (milisaniye cinsinden)
    const elapsedTime = Date.now() - pageLoadTime;
    const elapsedSeconds = elapsedTime / 1000;
    
    // Butonu devre dışı bırak
    agreeBtn.disabled = true;
    agreeBtn.style.opacity = '0.6';
    agreeBtn.style.cursor = 'not-allowed';
    
    if (elapsedSeconds < 10) {
        // 10 saniye içinde tıklandı - hızlı okuma uyarısı
        const currentLanguage = localStorage.getItem('language') || 'tr';
        const confirmedText = currentLanguage === 'en' ? 'Confirmed!' : 'Onaylandı!';
        agreeText.textContent = confirmedText;
        
        // Hızlı okuma mesajını göster
        const fastReaderMessage = document.getElementById('fast-reader-message');
        if (fastReaderMessage) {
            fastReaderMessage.classList.add('show');
        }
        
        // 3 saniye sonra kayıt ol kısmına yönlendir
        setTimeout(() => {
            window.location.href = 'login.html#register';
        }, 3000);
    } else {
        // 10 saniye geçti - direkt kayıt ol kısmına yönlendir
        const currentLanguage = localStorage.getItem('language') || 'tr';
        const confirmedText = currentLanguage === 'en' ? 'Confirmed!' : 'Onaylandı!';
        agreeText.textContent = confirmedText;
        
        // Hiç beklemeden direkt yönlendir
        window.location.href = 'login.html#register';
    }
}

// Scroll ve resize event'lerinde metre çubuklarını güncelle
window.addEventListener('scroll', updateMeters);
window.addEventListener('resize', updateMeters);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    syncThemeAndLanguageWithLobi(); // Tema ve dil senkronizasyonu
    updateMeters(); // Metre çubuklarını güncelle
    initInvisibleScroll(); // Görünmez scroll alanını başlat
    
    // Loading screen'i gizle
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 500); // 500ms sonra gizle
});

// Invisible Scroll Area - Meter Bar Feature
function initInvisibleScroll() {
    const scrollArea = document.querySelector('.meter-scroll-area');
    if (!scrollArea) return;

    let isDragging = false;
    let startY = 0;
    let startScroll = 0;

    // Mouse down - drag scroll başlat
    scrollArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        startScroll = window.scrollY;
        e.preventDefault();
        e.stopPropagation();
    });

    // Mouse move - drag scroll
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        const newScroll = startScroll + (deltaY * 3); // Reverse direction with sensitivity
        
        window.scrollTo({
            top: newScroll,
            behavior: 'instant'
        });
    });

    // Mouse up - drag scroll bitir
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Text selection'ı engelle
    scrollArea.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
}
