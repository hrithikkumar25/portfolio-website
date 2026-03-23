// Toggle menu icon and navbar
let menuIcon = document.querySelector('.hamburger');
let navbar = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('active');
    navbar.classList.toggle('active');
    
    // Change icon between bars and close
    let icon = menuIcon.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
};

// Scroll sections active link & Sticky Navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav ul li a');

window.onscroll = () => {
    // Add sticky class to navbar
    let header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Active link toggle on scroll
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            document.querySelectorAll('.nav-links li a').forEach(links => {
                links.classList.remove('active');
                document.querySelector('.nav-links li a[href*=' + id + ']').classList.add('active');
            });
            
            // Trigger skill bars animation when reaching Skills section
            if (id === 'skills') {
                const bars = document.querySelectorAll('.skill-card .progress-bar');
                bars.forEach(bar => {
                    // Extract width from the element's direct inline style, 
                    // since we now directly use inline styles for the width.
                    // To re-trigger we just ensure it's not 0.
                    if (bar.style.width === '0px' || bar.style.width === '0%') {
                        const originalWidth = bar.getAttribute('data-width');
                        if (originalWidth) {
                            bar.style.width = originalWidth;
                        }
                    }
                });
            }
        }
    });

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('active');
    navbar.classList.remove('active');
    let icon = menuIcon.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
};

// Skills Filtering & Initialization
document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.skill-card .progress-bar');
    bars.forEach(bar => {
        // Save original width for animation payload
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0'; // Hide initially for animation effect
    });

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    // Retrigger animation
                    const bar = card.querySelector('.progress-bar');
                    if (bar) {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = '0'; // reset
                        setTimeout(() => { bar.style.width = targetWidth; }, 50);
                    }
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
    // Projects Filter Logic
    const projFilterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid-new .project-card');

    projFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // Interactive Figma-Style Background Spotlight
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    });
});

// Typed JS Configuration
const typed = new Typed('.typing', {
    strings: ['Computer Science Student.', 'Java Developer.', 'Data Enthusiast.', 'Frontend Developer.'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

// Scroll Reveal Effect Configuration
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Add initial styles for animation elements
document.querySelectorAll('.heading, .skills-box, .portfolio-box, .activity-container, .timeline-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Vanta.js 3D WebGL configuration for Data Science Theme
if (document.getElementById('particles-js')) {
    VANTA.NET({
        el: "#particles-js",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xb026ff,       // The main neon purple theme color
        backgroundColor: 0x000000,
        backgroundAlpha: 0.00, // Make transparent so the Figma Spotlight CSS can shine through
        points: 15.00,         // Data nodes quantity
        maxDistance: 22.00,    // Neural network edge connection distance
        spacing: 16.00         // Network grid density
    });
}
