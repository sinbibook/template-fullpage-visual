// Room 페이지 JavaScript
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
    // Room Preview Carousel (from index.js)
    // ==========================================
    function initRoomPreviewCarousel() {
        var track = document.querySelector('.room-scroll-track');
        if (!track) return;

        var prevBtn = document.querySelector('.nav-btn.prev');
        var nextBtn = document.querySelector('.nav-btn.next');

        var speed = 1;
        var position = 0;
        var halfWidth = 0;
        var cardWidth = 0;
        var isManualMoving = false;

        function measure() {
            halfWidth = track.scrollWidth / 2;
            var firstCard = track.querySelector('.room-card');
            if (firstCard) {
                cardWidth = firstCard.offsetWidth + 40;
            }
        }

        measure();

        function tick() {
            if (!isManualMoving) {
                position -= speed;
                if (position <= -halfWidth) {
                    position += halfWidth;
                }
                track.style.transform = 'translateX(' + position + 'px)';
            }
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);

        function manualMove(direction) {
            isManualMoving = true;
            var target = position + (direction * cardWidth);

            var start = position;
            var distance = target - start;
            var duration = 400;
            var startTime = null;

            function animate(time) {
                if (!startTime) startTime = time;
                var elapsed = time - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var ease = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                position = start + distance * ease;

                if (position <= -halfWidth) {
                    position += halfWidth;
                } else if (position > 0) {
                    position -= halfWidth;
                }

                track.style.transform = 'translateX(' + position + 'px)';

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    isManualMoving = false;
                }
            }

            requestAnimationFrame(animate);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (!isManualMoving) manualMove(1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (!isManualMoving) manualMove(-1);
            });
        }

        window.addEventListener('resize', measure);
    }

    // ==========================================
    // Room Thumbnail Interaction
    // ==========================================
    function setupRoomThumbnailInteraction() {
        var thumbnails = document.querySelectorAll('.room-thumb');
        var mainImg = document.getElementById('room-main-img');

        if (!mainImg || thumbnails.length === 0) return;

        thumbnails.forEach(function(thumb) {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');

                var thumbImg = this.querySelector('img');
                if (thumbImg && thumbImg.src) {
                    mainImg.src = thumbImg.src;
                    mainImg.alt = thumbImg.alt;
                }
            });
        });
    }

    // ==========================================
    // Room Slider (5장 이미지 롤링 + 탭 연동)
    // ==========================================
    function initRoomSlider() {
        var slides = document.querySelectorAll('.room-slide');
        var tabs = document.querySelectorAll('.slider-tabs .tab-item');
        var progress = document.querySelector('.section-room .bar-progress');
        var prevBtn = document.querySelector('.room-prev');
        var nextBtn = document.querySelector('.room-next');

        if (slides.length < 2) return;

        var current = 0;
        var total = slides.length;

        function goTo(index) {
            slides[current].classList.remove('active');
            if (tabs[current]) tabs[current].classList.remove('active');

            current = (index + total) % total;

            slides[current].classList.add('active');
            if (tabs[current]) tabs[current].classList.add('active');
        }

        function restartProgress() {
            if (!progress) return;
            progress.style.animation = 'none';
            progress.offsetHeight;
            progress.style.animation = '';
        }

        // 프로그레스 바 자동 전환
        if (progress) {
            progress.addEventListener('animationiteration', function() {
                goTo(current + 1);
            });
        }

        // 화살표 버튼
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goTo(current - 1);
                restartProgress();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goTo(current + 1);
                restartProgress();
            });
        }

        // 탭 클릭
        tabs.forEach(function(tab, index) {
            tab.addEventListener('click', function() {
                goTo(index);
                restartProgress();
            });
        });
    }

    // ==========================================
    // Info Accordion (모바일 전용)
    // ==========================================
    function initInfoAccordion() {
        if (window.innerWidth > 768) return;

        var titles = document.querySelectorAll('.section-info .block-title');
        titles.forEach(function(title) {
            title.addEventListener('click', function() {
                var block = this.closest('.info-block');
                if (block.classList.contains('active')) {
                    block.classList.remove('active');
                } else {
                    block.classList.add('active');
                }
            });
        });
    }

    // DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initMainSlideshow();
        initRoomPreviewCarousel();
        initRoomSlider();
        setupRoomThumbnailInteraction();
        initInfoAccordion();
    });
})();
