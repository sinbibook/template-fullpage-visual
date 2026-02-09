/**
 * Header Component Script
 * - Loads header HTML into the page
 * - Handles header scroll behavior
 */

(function() {
    'use strict';

    // Load header HTML
    function loadHeader() {
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) return;

        fetch('/common/header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;
                initHeaderBehavior();
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }

    // Initialize header behavior
    function initHeaderBehavior() {
        const header = document.querySelector('.site-header');
        if (!header) return;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
