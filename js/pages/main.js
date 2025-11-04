/**
 * Main Page JavaScript - Scroll Animations
 */

(function() {
    'use strict';

    // Initialize scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe 50/50 sections (image and text halves)
        const imageHalves = document.querySelectorAll('.hero-image-half');
        const textHalves = document.querySelectorAll('.hero-text-half');

        imageHalves.forEach(element => {
            observer.observe(element);
        });

        textHalves.forEach(element => {
            observer.observe(element);
        });

        // Observe full width images
        const fullImages = document.querySelectorAll('.hero-bottom-section > img');
        fullImages.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
    });

})();