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
});