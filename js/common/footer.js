/**
 * Footer Component Script
 * - Loads footer HTML into the page
 */

(function() {
    'use strict';

    // Load footer HTML
    function loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;

        fetch('/common/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();
