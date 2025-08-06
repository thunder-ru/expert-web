// code.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.style.display = 'none';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"], .nav-link, .mobile-nav-link, .btn-primary[data-section], .btn-secondary[data-section]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href') || this.getAttribute('data-section');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                mobileNav.style.display = 'none';
                
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to clicked link
                if (this.classList.contains('nav-link') || this.classList.contains('mobile-nav-link')) {
                    this.classList.add('active');
                } else {
                    document.querySelector(`.nav-link[data-section="${targetId.substring(1)}"]`)?.classList.add('active');
                    document.querySelector(`.mobile-nav-link[data-section="${targetId.substring(1)}"]`)?.classList.add('active');
                }
                
                // Scroll to section
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Here you would typically send the data to a server
        // For demo purposes, we'll just show an alert
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize the first section as active
    document.querySelector('.nav-link').classList.add('active');
    document.querySelector('.mobile-nav-link').classList.add('active');
});