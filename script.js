// ===================================
// ROOTS - Interactive Behaviors
// ===================================

// === Scroll Reveal Animation ===
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with 'reveal' class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

// === Navbar Scroll Effect ===
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// === Smooth Scroll for Navigation Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === Product Card Hover Effect ===
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// === Stat Counter Animation ===
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(current));
        }
    }, 16);
};

const formatStatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let targetValue;

                if (text.includes('M')) {
                    targetValue = parseFloat(text) * 1000000;
                    animateCounter(stat, targetValue);
                } else if (text.includes('+')) {
                    targetValue = parseInt(text);
                    const timer = setInterval(() => {
                        let current = parseInt(stat.textContent) || 0;
                        if (current >= targetValue) {
                            stat.textContent = targetValue + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = current + 10;
                        }
                    }, 30);
                } else if (text.includes('₹')) {
                    stat.textContent = '₹0';
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.why-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}


// === Sample Kit Button Handler ===
const sampleKitBtn = document.querySelector('.form-actions .btn-secondary');

if (sampleKitBtn) {
    sampleKitBtn.addEventListener('click', () => {
        alert('Sample kit request feature coming soon! Please fill out the form and mention "Sample Kit" in your message.');
    });
}

// === Parallax Effect for Hero ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// === Dynamic Product Image Placeholder ===
// This adds a subtle pattern to product images
const productImages = document.querySelectorAll('.product-image');

productImages.forEach((img, index) => {
    const pattern = document.createElement('div');
    pattern.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%);
        pointer-events: none;
    `;
    img.appendChild(pattern);
});

// === Hover Effect for Process Steps ===
const processSteps = document.querySelectorAll('.process-step');

processSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', function () {
        this.style.background = 'linear-gradient(135deg, var(--color-soft-cream) 0%, var(--color-pastel-petal) 100%)';
    });

    step.addEventListener('mouseleave', function () {
        this.style.background = 'var(--color-soft-cream)';
    });
});

// === Add texture overlay to hero on load ===
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');

    // Add animated grain effect
    const grainOverlay = document.createElement('div');
    grainOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('data:image/svg+xml,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.05"/></svg>');
        pointer-events: none;
        opacity: 0.3;
        z-index: 1;
    `;
    hero.appendChild(grainOverlay);
});

// === Console Message ===
console.log('%c🌾 Pravaahya - From Bharat\'s fields to India\'s tables', 'font-size: 16px; color: #b29361; font-weight: bold;');
console.log('%cTransforming agricultural waste into engineered luxury.', 'font-size: 12px; color: #10443e;');
