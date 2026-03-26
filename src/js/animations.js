/**
 * Scroll Animations
 * Subtle fade-in and slide animations on scroll
 */

document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to these elements
    const elementsToAnimate = [
        '.team-card',
        '.practice-card',
        '.pillar-list li',
        '.contact-form-wrap',
        '.service-entry',
        '.approach-step',
        '.about-body section'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    });

    // Stagger animations for lists
    const lists = document.querySelectorAll('.practice-grid, .team-grid, .pillar-list');
    lists.forEach(list => {
        const items = list.querySelectorAll('.scroll-animate');
        items.forEach((item, index) => {
            item.style.animationDelay = (index * 100) + 'ms';
        });
    });
});

