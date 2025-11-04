// Header JavaScript
(function() {
    'use strict';

    // Scroll Effect for Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (!header) return;

        // Check if we're on main.html - always keep scrolled state
        const isMainPage = window.location.pathname.includes('main.html') ||
                          window.location.pathname.endsWith('/main');

        if (isMainPage) {
            header.classList.add('scrolled');
        } else {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Toggle Mobile Menu
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        const body = document.body;

        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            body.style.overflow = 'auto';
        } else {
            mobileMenu.classList.add('active');
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            body.style.overflow = 'hidden';
        }
    };

    // Navigation function
    window.navigateTo = function(page) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }

        // Navigate to page
        let url = '';
        switch(page) {
            case 'home':
                url = 'index.html';
                break;
            case 'main':
                url = 'main.html';
                break;
            case 'directions':
                url = 'directions.html';
                break;
            case 'reservation-info':
                url = 'reservation.html';
                break;
            default:
                url = page + '.html';
        }

        if (url) {
            window.location.href = url;
        }
    };

    // Submenu hover effect
    function initSubmenuHover() {
        const menuItems = document.querySelectorAll('.menu-item-wrapper');

        menuItems.forEach(item => {
            let hoverTimeout;

            item.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
            });

            item.addEventListener('mouseleave', function() {
                hoverTimeout = setTimeout(() => {
                    // Optional: Add any cleanup code here
                }, 100);
            });
        });
    }

    // Check if logo image exists and hide text
    function checkLogoImage() {
        const logoImage = document.querySelector('.logo-image');
        const logoText = document.querySelector('.logo-text');

        if (logoImage && logoText) {
            // Check if logo image src exists and is not empty
            if (logoImage.src && !logoImage.src.includes('undefined') && !logoImage.src.endsWith('/')) {
                logoText.style.display = 'none';
            }
        }
    }

    // Check and set header state based on scroll position
    function checkInitialScroll() {
        const header = document.querySelector('.header');
        if (header) {
            // Check if we're on main.html - always keep scrolled state
            const isMainPage = window.location.pathname.includes('main.html') ||
                              window.location.pathname.endsWith('/main');

            if (isMainPage) {
                header.classList.add('scrolled');
            } else {
                if (window.scrollY > 50 || window.pageYOffset > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        }
    }

    // Initialize header on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Check initial scroll position
        checkInitialScroll();

        // Initialize submenu hover
        initSubmenuHover();

        // Check logo image
        checkLogoImage();
    });

    // Also check when window loads (for refresh scenarios)
    window.addEventListener('load', function() {
        checkInitialScroll();
    });

    // Immediate check for page refresh scenarios
    checkInitialScroll();

})();