/* ═══════════════════════════════════════════════
   ANMOL SANDHU — Portfolio Interactions
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollReveal();
    initCounters();
    initScrollProgress();
    initBackToTop();
    initContactForm();
});
// sandhu
/* ── Navigation ── */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
// sandhu
    // Scroll → navbar background
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                updateActiveLink(sections, navLinks);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }
// sandhu
    menuToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    }));

    // Smooth scroll for nav links (anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
// SANDHUUUUU JIIII
// ANMOL SINGH SANDHU
function updateActiveLink(sections, navLinks) {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}


// sandhu
/* ── Typing Effect ── */
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'Software Engineer',
        'Full-Stack Developer',
        'Problem Solver'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTime = 0;


// sandhu
    function tick() {
        const current = phrases[phraseIdx];

        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                pauseTime = 2000;
                deleting = true;
            } else {
                pauseTime = 60 + Math.random() * 40;
            }
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                pauseTime = 400;
            } else {
                pauseTime = 30;
            }
        }

        setTimeout(tick, pauseTime);
    }

    setTimeout(tick, 800);
}


// sandhu
/* ── Scroll Reveal ── */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}
// sandhu
/* ── Counter Animation ── */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const start = performance.now();

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}
// sandhu
/* ── Scroll Progress Bar ── */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

/* ── Back to Top ── */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// sandhu
/* ── Contact Form (basic handler) ── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origHTML = btn.innerHTML;

        btn.innerHTML = '<span>Sent!</span>';
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '.7';

        setTimeout(() => {
            btn.innerHTML = origHTML;
            btn.style.pointerEvents = '';
            btn.style.opacity = '';
            form.reset();
        }, 2500);
    });
}
// sandhu
// FINALLY COMPLETED THE PORTFOLIO WEBSITE, HOPE YOU LIKE IT! FEEL FREE TO REACH OUT IF YOU HAVE ANY QUESTIONS OR FEEDBACK. THANKS FOR CHECKING IT OUT!