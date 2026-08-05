// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.querySelectorAll('.dropdown').forEach(function(drop) {
                    drop.classList.remove('active');
                });
            }
        }
    });
    
    // Dropdown toggle on mobile with arrow rotation
    if (dropdownLinks.length) {
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    var parentLi = this.parentElement;
                    parentLi.classList.toggle('active');
                }
            });
        });
    }
    
    // ========== BACK TO TOP BUTTON ==========
    var backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== FAQ ACCORDION ==========
    var faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(function(item) {
            var question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                faqItems.forEach(function(other) {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
    }
    
    // ========== SLIDER ==========
    var slides = document.querySelectorAll('.slide');
    var sliderWrapper = document.getElementById('sliderWrapper');
    var currentIndex = 0;
    
    if (slides.length > 1 && sliderWrapper) {
        function moveSlider() {
            currentIndex = (currentIndex + 1) % slides.length;
            sliderWrapper.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        }
        setInterval(moveSlider, 4000);
    }
    
    // ========== NEWSLETTER FORM ==========
    var newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! You will receive updates soon.');
                this.reset();
            }
        });
    }
    
    // ========== CONTACT FORM ==========
    var contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for contacting us. We will get back to you soon.');
            this.reset();
        });
    }
    
    // ========== HEADER SHRINK EFFECT ==========
    var header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 80) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });
    }
});