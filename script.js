// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#667eea', '#764ba2', '#ff6b6b']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#667eea',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add animation classes
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
            if (entry.target.classList.contains('pricing-card')) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
            if (entry.target.classList.contains('testimonial-card')) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
        }
    });
}, observerOptions);

// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 16);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on load
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .problem-item, .solution-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe all counter elements
    const counterElements = document.querySelectorAll('[data-target]');
    counterElements.forEach(el => {
        counterObserver.observe(el);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg-animation');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (heroBg) {
            heroBg.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add floating animation to dashboard mockup
    const dashboardMockup = document.querySelector('.dashboard-mockup');
    if (dashboardMockup) {
        setInterval(() => {
            dashboardMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(-5px)';
            setTimeout(() => {
                dashboardMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(0)';
            }, 1000);
        }, 3000);
    }

    // Add glow effect to buttons on hover
    const glowButtons = document.querySelectorAll('.btn-glow');
    glowButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(() => {
                typeWriter();
            }, index * 1000);
        });
    }

    // Add notification popup animation
    const notification = document.querySelector('.notification-popup');
    if (notification) {
        setTimeout(() => {
            notification.style.animation = 'notificationSlide 0.5s ease-out forwards';
        }, 2000);
    }

    // Add scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add pulse animation to stats
    const statItems = document.querySelectorAll('.stat-item.pulse');
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'statPulse 2s ease-in-out infinite';
        }, index * 500);
    });

    // Add floating animation to review card
    const reviewCard = document.querySelector('.review-card.floating');
    if (reviewCard) {
        setInterval(() => {
            reviewCard.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                reviewCard.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }

    // Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setInterval(() => {
            scrollIndicator.style.animation = 'scrollBounce 2s ease-in-out infinite';
        }, 2000);
    }

    // Add demo modal functionality
    const demoButtons = document.querySelectorAll('.btn-secondary');
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            showDemoModal();
        });
    });

    // Add trial button functionality
    const trialButtons = document.querySelectorAll('.btn-primary');
    trialButtons.forEach(button => {
        button.addEventListener('click', () => {
            showTrialModal();
        });
    });
});

// Demo Modal Function
function showDemoModal() {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Watch ReviewFlow Demo</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Demo video will play here</p>
                </div>
                <p>See how ReviewFlow helps local businesses get more 5-star reviews automatically.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease;
        }
        
        .modal-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .modal-header h3 {
            color: #fff;
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .video-placeholder {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 3rem;
            text-align: center;
            margin-bottom: 1rem;
            border: 2px dashed rgba(255, 255, 255, 0.3);
        }
        
        .video-placeholder i {
            font-size: 3rem;
            color: #667eea;
            margin-bottom: 1rem;
        }
        
        .video-placeholder p {
            color: #94a3b8;
            margin: 0;
        }
        
        .modal-body p {
            color: #cbd5e1;
            line-height: 1.6;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// Trial Modal Function
function showTrialModal() {
    const modal = document.createElement('div');
    modal.className = 'trial-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Start Your Free Trial</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="trial-benefits">
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>14-day free trial</span>
                    </div>
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>No credit card required</span>
                    </div>
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>Setup in 5 minutes</span>
                    </div>
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>Cancel anytime</span>
                    </div>
                </div>
                <form class="trial-form">
                    <input type="text" placeholder="Business Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <input type="tel" placeholder="Phone Number" required>
                    <button type="submit" class="btn-primary">Start Free Trial</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .trial-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease;
        }
        
        .trial-modal .modal-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: modalSlideIn 0.3s ease;
        }
        
        .trial-benefits {
            margin-bottom: 2rem;
        }
        
        .benefit {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 1rem;
            color: #cbd5e1;
        }
        
        .benefit i {
            color: #10b981;
            font-size: 1.2rem;
        }
        
        .trial-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .trial-form input {
            padding: 12px 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            font-size: 1rem;
        }
        
        .trial-form input::placeholder {
            color: #94a3b8;
        }
        
        .trial-form input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .trial-form button {
            margin-top: 1rem;
        }
    `;
    
    document.head.appendChild(style);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
    
    // Form submission
    const form = modal.querySelector('.trial-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your trial will be set up shortly. We\'ll send you an email with next steps.');
        modal.remove();
        style.remove();
    });
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
        50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes rotateIn {
        from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.3);
        }
        to {
            opacity: 1;
            transform: rotate(0) scale(1);
        }
    }
    
    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes flipInX {
        from {
            opacity: 0;
            transform: perspective(400px) rotateX(90deg);
        }
        40% {
            transform: perspective(400px) rotateX(-20deg);
        }
        60% {
            transform: perspective(400px) rotateX(10deg);
        }
        80% {
            transform: perspective(400px) rotateX(-5deg);
        }
        to {
            opacity: 1;
            transform: perspective(400px) rotateX(0deg);
        }
    }
    
    @keyframes flipInY {
        from {
            opacity: 0;
            transform: perspective(400px) rotateY(90deg);
        }
        40% {
            transform: perspective(400px) rotateY(-20deg);
        }
        60% {
            transform: perspective(400px) rotateY(10deg);
        }
        80% {
            transform: perspective(400px) rotateY(-5deg);
        }
        to {
            opacity: 1;
            transform: perspective(400px) rotateY(0deg);
        }
    }
    
    @keyframes lightSpeedIn {
        from {
            opacity: 0;
            transform: translateX(-100%) skewX(-30deg);
        }
        60% {
            transform: translateX(20%) skewX(30deg);
        }
        80% {
            transform: translateX(-5%) skewX(-15deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) skewX(0deg);
        }
    }
    
    @keyframes rollIn {
        from {
            opacity: 0;
            transform: translateX(-100%) rotate(-120deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
        }
    }
    
    @keyframes jackInTheBox {
        from {
            opacity: 0;
            transform: scale(0.1) rotate(30deg);
            transform-origin: center bottom;
        }
        50% {
            transform: rotate(-10deg);
        }
        70% {
            transform: rotate(3deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes hinge {
        0% {
            transform: rotate(0);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }
        20%, 60% {
            transform: rotate(80deg);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }
        40% {
            transform: rotate(60deg);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }
        80% {
            transform: rotate(60deg) translateY(0);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }
        100% {
            transform: translateY(700px);
        }
    }
    
    @keyframes bounceIn {
        from {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes bounceInDown {
        from {
            opacity: 0;
            transform: translateY(-3000px);
        }
        60% {
            opacity: 1;
            transform: translateY(25px);
        }
        75% {
            transform: translateY(-10px);
        }
        90% {
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceInLeft {
        from {
            opacity: 0;
            transform: translateX(-3000px);
        }
        60% {
            opacity: 1;
            transform: translateX(25px);
        }
        75% {
            transform: translateX(-10px);
        }
        90% {
            transform: translateX(5px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes bounceInRight {
        from {
            opacity: 0;
            transform: translateX(3000px);
        }
        60% {
            opacity: 1;
            transform: translateX(-25px);
        }
        75% {
            transform: translateX(10px);
        }
        90% {
            transform: translateX(-5px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes bounceInUp {
        from {
            opacity: 0;
            transform: translateY(3000px);
        }
        60% {
            opacity: 1;
            transform: translateY(-25px);
        }
        75% {
            transform: translateY(10px);
        }
        90% {
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(animationStyles);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize loading state
document.body.style.opacity = '0';
