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

        // 모바일 Menu 버튼 클릭 시 드롭다운 토글
        const menuBtn = header.querySelector('.header-menu-btn');
        const dropdown = header.querySelector('.header-dropdown');
        if (!menuBtn || !dropdown) return;

        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = dropdown.classList.toggle('is-open');
            header.classList.toggle('menu-active', isOpen);
        });

        // 드롭다운 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target)) {
                dropdown.classList.remove('is-open');
                header.classList.remove('menu-active');
            }
        });

        // 데스크톱: 헤더 hover 시 드롭다운 표시
        var isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            header.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.pointerEvents = 'auto';
                header.style.background = 'rgba(40, 40, 40, 0.85)';
            });
            header.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.pointerEvents = 'none';
                header.style.background = '';
            });
        }

        // 모바일 아코디언: 타이틀 클릭 시 서브메뉴 접기/펼치기
        var colTitles = dropdown.querySelectorAll('.dropdown-col-title');
        colTitles.forEach(function(title) {
            title.addEventListener('click', function(e) {
                e.stopPropagation();
                var col = title.closest('.dropdown-col');
                col.classList.toggle('is-expanded');
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
