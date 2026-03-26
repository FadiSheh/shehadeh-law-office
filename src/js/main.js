/**
 * Shehadeh Law Office — Main JavaScript
 */

/* ============================================
   1. Mobile Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (event) {
            const outside = !navMenu.contains(event.target) && !navToggle.contains(event.target);
            if (outside && navMenu.classList.contains('open')) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }
});

/* ============================================
   2. Contact Form — EmailJS
   ============================================ */

const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID   = 'service_shehadeh';
const EMAILJS_TEMPLATE_ID  = 'template_contact';

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const messages = getContactFormMessages();

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName     = (document.getElementById('firstName') || {}).value || '';
        const lastName      = (document.getElementById('lastName') || {}).value || '';
        const email         = (document.getElementById('email') || {}).value || '';
        const phone         = (document.getElementById('phone') || {}).value || '';
        const subject       = (document.getElementById('subject') || {}).value || '';
        const message       = (document.getElementById('message') || {}).value || '';
        const consent       = document.getElementById('privacyConsent');

        // Basic validation
        let valid = true;

        if (!firstName.trim()) { showFieldError('firstNameError', messages.firstNameRequired); valid = false; }
        else clearFieldError('firstNameError');

        if (!lastName.trim()) { showFieldError('lastNameError', messages.lastNameRequired); valid = false; }
        else clearFieldError('lastNameError');

        if (!email.trim() || !isValidEmail(email)) { showFieldError('emailError', messages.emailInvalid); valid = false; }
        else clearFieldError('emailError');

        if (!subject) { showFieldError('subjectError', messages.subjectRequired); valid = false; }
        else clearFieldError('subjectError');

        if (!message.trim()) { showFieldError('messageError', messages.messageRequired); valid = false; }
        else clearFieldError('messageError');

        if (consent && !consent.checked) {
            showFormStatus(messages.privacyConsentRequired, 'error');
            valid = false;
        }

        if (!valid) return;

        const formData = {
            name: firstName.trim() + ' ' + lastName.trim(),
            email: email.trim(),
            phone: phone.trim() || 'Not provided',
            subject: subject,
            message: message.trim(),
        };

        sendMessage(formData, messages);
    });
});

function sendMessage(formData, messages) {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = messages.sending; }

    if (typeof emailjs === 'undefined') {
        showFormStatus(messages.unavailable, 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = messages.send; }
        return;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  formData.name,
        from_email: formData.email,
        phone:      formData.phone,
        subject:    formData.subject,
        message:    formData.message,
        to_email:   'sami@shehadehlawoffice.com',
    })
    .then(function () {
        showFormStatus(messages.success, 'success');
        document.getElementById('contactForm').reset();
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = messages.send; }
    }, function (error) {
        console.error('EmailJS error:', error);
        showFormStatus(messages.failure, 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = messages.send; }
    });
}

function getContactFormMessages() {
    if ((document.documentElement.lang || '').startsWith('ar')) {
        return {
            firstNameRequired: 'الاسم الأول مطلوب.',
            lastNameRequired: 'اسم العائلة مطلوب.',
            emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
            subjectRequired: 'يرجى اختيار الموضوع.',
            messageRequired: 'يرجى إدخال الرسالة.',
            privacyConsentRequired: 'يرجى الموافقة على إشعار الخصوصية للمتابعة.',
            send: 'إرسال الرسالة',
            sending: 'جارٍ الإرسال...',
            unavailable: 'تعذر إرسال الرسالة حاليا. يرجى التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.',
            success: 'تم إرسال رسالتكم بنجاح. سنتواصل معكم في أقرب وقت ممكن.',
            failure: 'حدث خطأ أثناء الإرسال. يرجى التواصل معنا مباشرة على الرقم +970-2-274 3543.'
        };
    }

    return {
        firstNameRequired: 'First name is required.',
        lastNameRequired: 'Last name is required.',
        emailInvalid: 'Please enter a valid email address.',
        subjectRequired: 'Please select a subject.',
        messageRequired: 'Please enter your message.',
        privacyConsentRequired: 'Please acknowledge the privacy notice to proceed.',
        send: 'Send Message',
        sending: 'Sending…',
        unavailable: 'Message could not be sent. Please contact us by phone or email directly.',
        success: 'Your message has been sent. We will respond as soon as possible.',
        failure: 'An error occurred. Please try contacting us directly at +970-2-274 3543.'
    };
}

function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function clearFieldError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
}

function showFormStatus(msg, type) {
    const el = document.getElementById('formStatus');
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-status ' + type;
    el.style.display = 'block';
    if (type === 'success') {
        setTimeout(function () { el.style.display = 'none'; }, 6000);
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================
   3. Scroll Reveal Animation
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll(
        '.practice-card, .member-card, .approach-step, .service-entry'
    ).forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        observer.observe(el);
    });
});
