/**
 * Internationalization Support
 * Provides language switching between English and Arabic
 */

const i18n = {
    en: {
        darkModeToggle: 'Dark Mode',
        skipToMain: 'Skip to main content',
        home: 'Home',
        about: 'About',
        practiceAreas: 'Practice Areas',
        our_team: 'Our Team',
        contact: 'Contact'
    },
    ar: {
        darkModeToggle: 'الوضع الداكن',
        skipToMain: 'انتقل إلى المحتوى الرئيسي',
        home: 'الرئيسية',
        about: 'من نحن',
        practiceAreas: 'مجالات الممارسة',
        our_team: 'فريقنا',
        contact: 'اتصل بنا'
    }
};

function getCurrentLanguage() {
    const stored = localStorage.getItem('language');
    if (stored) return stored;
    
    const htmlLang = document.documentElement.lang || 'en';
    return htmlLang.startsWith('ar') ? 'ar' : 'en';
}

function setLanguage(lang) {
    const validLang = (lang === 'ar' || lang === 'en') ? lang : 'en';
    localStorage.setItem('language', validLang);
    document.documentElement.lang = validLang;
    
    if (validLang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.style.direction = 'rtl';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.body.style.direction = 'ltr';
        document.body.classList.remove('rtl');
    }
    
    localStorage.setItem('currentLanguage', validLang);
}

function t(key) {
    const lang = getCurrentLanguage();
    return (i18n[lang] && i18n[lang][key]) || (i18n['en'] && i18n['en'][key]) || key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function () {
    const lang = getCurrentLanguage();
    setLanguage(lang);
});
