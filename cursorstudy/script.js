// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScrolling();
    initParallaxEffects();
    initCustomCursor();
    initMouseInteractions();
    initParticleSystem();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('모든 필드를 입력해주세요.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('메시지가 전송되었습니다!', 'success');
            form.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Typing animation for hero title
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-title .title-line:first-child');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 500);
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                const displayValue = Math.floor(current);
                if (counter.textContent.includes('억')) {
                    counter.textContent = `${displayValue}억+`;
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = `${displayValue}+`;
                } else {
                    counter.textContent = displayValue;
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Keep original format
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Project card hover effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize project card effects
document.addEventListener('DOMContentLoaded', initProjectCardEffects);

// Mobile menu toggle (for future mobile navigation)
function initMobileMenu() {
    // This would be implemented if a mobile menu is added
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Add loading animation
function initLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    `;
    
    // Add loading styles
    const loadingStyles = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #f0fdf4;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #dcfce7;
            border-top: 4px solid #22c55e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
    
    // Add to DOM
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', initLoadingAnimation);

// Add CSS for active navigation link
const activeLinkStyles = `
    .nav-link.active {
        color: var(--primary-600);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Add active link styles
const activeStyleSheet = document.createElement('style');
activeStyleSheet.textContent = activeLinkStyles;
document.head.appendChild(activeStyleSheet);

// Custom Cursor System
function initCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    const cursorText = document.createElement('div');
    cursorText.className = 'cursor-text';
    document.body.appendChild(cursorText);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const diffX = mouseX - followerX;
        const diffY = mouseY - followerY;
        
        followerX += diffX * 0.1;
        followerY += diffY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-item, .experience-item, .skill-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
            
            // Add text for specific elements
            if (element.classList.contains('project-item')) {
                cursorText.textContent = 'View';
                cursorText.classList.add('show');
            } else if (element.classList.contains('experience-item')) {
                cursorText.textContent = 'Read';
                cursorText.classList.add('show');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
            cursorText.classList.remove('show');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
}

// Advanced Mouse Interactions
function initMouseInteractions() {
    // Magnetic effect
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            element.style.setProperty('--mouse-x', `${x * strength}px`);
            element.style.setProperty('--mouse-y', `${y * strength}px`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--mouse-x', '0px');
            element.style.setProperty('--mouse-y', '0px');
        });
    });
    
    // Tilt effect
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.setProperty('--tilt-x', `${rotateX}deg`);
            element.style.setProperty('--tilt-y', `${rotateY}deg`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--tilt-x', '0deg');
            element.style.setProperty('--tilt-y', '0deg');
        });
    });
    
    // Glow effect on hover
    const glowElements = document.querySelectorAll('.glow-effect');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 30px var(--accent)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    });
}

// Particle System
function initParticleSystem() {
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(particle);
        
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 100 + 100
        });
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0) {
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.life = Math.random() * 100 + 100;
            }
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = Math.min(particle.life / 100, 0.3);
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Mouse Trail Effect
function initMouseTrail() {
    let trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        trailElement.style.left = e.clientX + 'px';
        trailElement.style.top = e.clientY + 'px';
        
        document.body.appendChild(trailElement);
        trail.push(trailElement);
        
        if (trail.length > maxTrailLength) {
            const oldTrail = trail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        // Remove trail element after animation
        setTimeout(() => {
            if (trailElement.parentNode) {
                trailElement.parentNode.removeChild(trailElement);
            }
        }, 600);
    });
}

// Initialize mouse trail
document.addEventListener('DOMContentLoaded', initMouseTrail);

// Interactive Background
function initInteractiveBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        const gridItems = hero.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            const delay = index * 0.1;
            setTimeout(() => {
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }, delay * 1000);
        });
    });
    
    hero.addEventListener('mouseleave', () => {
        const gridItems = hero.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.style.transform = '';
        });
    });
}

// Initialize interactive background
document.addEventListener('DOMContentLoaded', initInteractiveBackground);

// Text Animation on Scroll
function initTextAnimations() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'textReveal 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// Add text reveal animation
const textRevealStyles = `
    @keyframes textReveal {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const textStyleSheet = document.createElement('style');
textStyleSheet.textContent = textRevealStyles;
document.head.appendChild(textStyleSheet);

// Initialize text animations
document.addEventListener('DOMContentLoaded', initTextAnimations);
