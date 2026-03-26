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

        if (!firstName.trim()) { showFieldError('firstNameError', 'First name is required.'); valid = false; }
        else clearFieldError('firstNameError');

        if (!lastName.trim()) { showFieldError('lastNameError', 'Last name is required.'); valid = false; }
        else clearFieldError('lastNameError');

        if (!email.trim() || !isValidEmail(email)) { showFieldError('emailError', 'Please enter a valid email address.'); valid = false; }
        else clearFieldError('emailError');

        if (!subject) { showFieldError('subjectError', 'Please select a subject.'); valid = false; }
        else clearFieldError('subjectError');

        if (!message.trim()) { showFieldError('messageError', 'Please enter your message.'); valid = false; }
        else clearFieldError('messageError');

        if (consent && !consent.checked) {
            showFormStatus('Please acknowledge the privacy notice to proceed.', 'error');
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

        sendMessage(formData);
    });
});

function sendMessage(formData) {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

    if (typeof emailjs === 'undefined') {
        showFormStatus('Message could not be sent. Please contact us by phone or email directly.', 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
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
        showFormStatus('Your message has been sent. We will respond as soon as possible.', 'success');
        document.getElementById('contactForm').reset();
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
    }, function (error) {
        console.error('EmailJS error:', error);
        showFormStatus('An error occurred. Please try contacting us directly at +970-2-274 3543.', 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
    });
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
