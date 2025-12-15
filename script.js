/* ===================================
   PORTFOLIO JAVASCRIPT
   Abdulhameed Sherif Portfolio Website
   =================================== */

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// ===================================
// NAVBAR FUNCTIONALITY
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Active nav link on scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===================================
// DARK MODE TOGGLE
// ===================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ===================================
// PROJECT FILTERING
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                // Re-trigger animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===================================
// SKILL BARS ANIMATION
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.getElementById('skills');

function animateSkillBars() {
    const sectionTop = skillSection.offsetTop;
    const sectionHeight = skillSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (scrollPosition > sectionTop + sectionHeight / 4) {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
            bar.closest('.skill-item').classList.add('animate');
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateSkillBars);
    }
}

window.addEventListener('scroll', animateSkillBars);

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.project-card, .skill-item, .about-content, .contact-content');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state
document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// DESIGN MODAL
// ===================================
const modal = document.getElementById('designModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = modal.querySelector('.modal-overlay');
const previewBtns = document.querySelectorAll('.preview-btn');

// Design content data
const designContent = {
    design1: {
        title: 'Tech Startup Brand Identity',
        description: 'Complete brand identity package including logo design, color palette, typography system, and comprehensive brand guidelines. The modern, trustworthy design combines tech-forward aesthetics with approachability.',
        objective: 'Create a cohesive brand identity that positions the fintech startup as innovative yet trustworthy, appealing to both tech-savvy users and traditional finance professionals.',
        results: 'The brand identity helped secure $2M in seed funding and achieved 95% brand recognition in user testing.',
        images: [
            'https://via.placeholder.com/800x600/fa709a/ffffff?text=Logo+Variations',
            'https://via.placeholder.com/800x600/fa709a/ffffff?text=Color+Palette',
            'https://via.placeholder.com/800x600/fa709a/ffffff?text=Brand+Guidelines'
        ]
    },
    design2: {
        title: 'Social Media Marketing Kit',
        description: 'Comprehensive set of social media templates for Instagram, Facebook, and Twitter. Includes story templates, post designs, carousel layouts, and promotional graphics with a cohesive design system.',
        objective: 'Develop a flexible template system that maintains brand consistency while allowing for diverse content types and quick customization.',
        results: 'Increased social media engagement by 85%, follower growth by 120%, and reduced design time by 70%.',
        images: [
            'https://via.placeholder.com/800x600/fee140/333333?text=Instagram+Stories',
            'https://via.placeholder.com/800x600/fee140/333333?text=Feed+Posts',
            'https://via.placeholder.com/800x600/fee140/333333?text=Promotional+Graphics'
        ]
    },
    design3: {
        title: 'Fitness App UI Design',
        description: 'User-friendly mobile app interface design focused on motivation and accessibility. Features include workout tracking, progress visualization, social features, and personalized recommendations.',
        objective: 'Design an intuitive, motivating interface that makes fitness tracking enjoyable and encourages consistent app usage.',
        results: 'Achieved 4.8/5 user satisfaction rating, 40% increase in daily active users, and 60% improvement in user retention.',
        images: [
            'https://via.placeholder.com/800x600/30cfd0/ffffff?text=Home+Screen',
            'https://via.placeholder.com/800x600/30cfd0/ffffff?text=Workout+Tracking',
            'https://via.placeholder.com/800x600/30cfd0/ffffff?text=Progress+Dashboard'
        ]
    }
};

// Open modal
previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const designId = btn.getAttribute('data-design');
        const design = designContent[designId];
        
        if (design) {
            // Build modal content
            let imagesHTML = design.images.map(img => 
                `<img src="${img}" alt="${design.title}">`
            ).join('');
            
            modalBody.innerHTML = `
                <h2 style="margin-bottom: 1rem; color: var(--text-primary);">${design.title}</h2>
                <p style="color: var(--text-tertiary); margin-bottom: 1.5rem; line-height: 1.8;">${design.description}</p>
                
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 0.5rem; font-size: 1.125rem;">Design Objective</h3>
                    <p style="color: var(--text-secondary); line-height: 1.6;">${design.objective}</p>
                </div>
                
                <div style="background: var(--gradient-primary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
                    <h3 style="color: white; margin-bottom: 0.5rem; font-size: 1.125rem;">Results</h3>
                    <p style="color: white; line-height: 1.6; opacity: 0.95;">${design.results}</p>
                </div>
                
                <div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
                    ${imagesHTML}
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // In a real application, you would send this data to a server
    // For now, we'll show a success message
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <strong style="display: block; margin-bottom: 0.25rem;">Message Sent!</strong>
                <span style="font-size: 0.875rem; opacity: 0.9;">Thank you for reaching out. I'll get back to you soon.</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 5000);
    
    // Reset form
    contactForm.reset();
    
    // Log form data (for development)
    console.log('Form submitted:', formData);
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    setActiveNavLink();
    revealOnScroll();
}, 20);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// PRELOADER (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// ===================================
// COPY TO CLIPBOARD
// ===================================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied to clipboard!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add click event to email
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.style.cssText = `
        margin-left: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: var(--bg-secondary);
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    copyBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const email = link.href.replace('mailto:', '');
        copyToClipboard(email);
    };
    link.parentNode.appendChild(copyBtn);
});

// ===================================
// ANALYTICS (Placeholder)
// ===================================
function trackEvent(category, action, label) {
    // Integrate with Google Analytics or other analytics service
    console.log('Event tracked:', { category, action, label });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track project clicks
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const projectTitle = link.closest('.project-card').querySelector('.project-title').textContent;
        trackEvent('Projects', 'Click', projectTitle);
    });
});

// Track contact form submission
contactForm.addEventListener('submit', () => {
    trackEvent('Contact', 'Submit', 'Contact Form');
});

// ===================================
// EASTER EGG (Optional Fun Element)
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add some fun animation or effect
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🎉 Konami Code activated! You found the easter egg!');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Hey there, developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking at the code? I appreciate your curiosity!', 'font-size: 14px; color: #764ba2;');
console.log('%cFeel free to reach out if you want to collaborate: abdulhameed.sherif@example.com', 'font-size: 12px; color: #4a5568;');

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! 🚀');
    
    // Set initial active nav link
    setActiveNavLink();
    
    // Trigger initial reveal
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});
