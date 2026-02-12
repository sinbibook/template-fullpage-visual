// Main page JavaScript
(function() {
    'use strict';

    // ==========================================
    // Main Hero Slideshow (from index.js)
    // ==========================================
    function initMainSlideshow() {
        var slides = document.querySelectorAll('.main-slide');
        if (slides.length < 2) return;

        var progress = document.querySelector('.title-divider .bar-progress');
        var arrowNums = document.querySelectorAll('.main-arrow .arrow-number');
        var arrowLeft = document.querySelector('.main-arrow .arrow-left');
        var arrowRight = document.querySelector('.main-arrow .arrow-right');
        var current = 0;
        var total = slides.length;

        function padNum(n) {
            return n < 10 ? '0' + n : '' + n;
        }

        function updateNumbers() {
            if (arrowNums.length >= 2) {
                arrowNums[0].textContent = padNum(current + 1);
                arrowNums[1].textContent = padNum(total);
            }
        }

        function goTo(index) {
            slides[current].classList.remove('active');
            slides[current].classList.remove('zoom-in');
            current = (index + total) % total;
            slides[current].classList.add('active');
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    slides[current].classList.add('zoom-in');
                });
            });
            updateNumbers();
        }

        function restartProgress() {
            if (!progress) return;
            progress.style.animation = 'none';
            progress.offsetHeight;
            progress.style.animation = '';
        }

        updateNumbers();

        slides[0].classList.add('active');
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                slides[0].classList.add('zoom-in');
            });
        });

        if (progress) {
            progress.addEventListener('animationiteration', function() {
                goTo(current + 1);
            });
        }

        if (arrowLeft) {
            arrowLeft.style.cursor = 'pointer';
            arrowLeft.addEventListener('click', function() {
                goTo(current - 1);
                restartProgress();
            });
        }

        if (arrowRight) {
            arrowRight.style.cursor = 'pointer';
            arrowRight.addEventListener('click', function() {
                goTo(current + 1);
                restartProgress();
            });
        }
    }

    // ==========================================
    // Gallery Interaction (Accordion / Mobile Rolling)
    // ==========================================
    function initGalleryInteraction() {
        var isMobile = window.innerWidth <= 768;

        document.querySelectorAll('.img-grid').forEach(function(grid) {
            var items = grid.querySelectorAll('.img-item');

            if (isMobile) {
                // 모바일: 자동 롤링 슬라이드
                var current = 0;
                var total = items.length;
                var itemWidth = grid.offsetWidth;

                setInterval(function() {
                    current = (current + 1) % total;
                    grid.scrollTo({
                        left: current * itemWidth,
                        behavior: 'smooth'
                    });
                }, 3000);
            } else {
                // 데스크톱: hover + click 아코디언 (항상 1개 active 유지)
                function setActive(target) {
                    items.forEach(function(i) { i.classList.remove('is-active'); });
                    target.classList.add('is-active');
                }

                items.forEach(function(item) {
                    item.addEventListener('mouseenter', function() {
                        setActive(item);
                    });
                    item.addEventListener('click', function() {
                        setActive(item);
                    });
                });
            }
        });
    }

    // DOM ready event
    document.addEventListener('DOMContentLoaded', function() {

        // 메인 슬라이드쇼 초기화
        initMainSlideshow();

        // 갤러리 인터랙션 초기화
        initGalleryInteraction();

    });
})();