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
    // Gallery Interaction (Accordion)
    // ==========================================
    function initGalleryInteraction() {
        document.querySelectorAll('.img-grid').forEach(function(grid) {
            var items = grid.querySelectorAll('.img-item');
            items.forEach(function(item) {
                item.addEventListener('mouseenter', function() {
                    items.forEach(function(i) { i.classList.remove('is-active'); });
                    item.classList.add('is-active');
                });
            });
        });
    }

    // DOM ready event
    document.addEventListener('DOMContentLoaded', function() {

        // 메인 슬라이드쇼 초기화
        initMainSlideshow();

        // 갤러리 인터랙션 초기화
        initGalleryInteraction();

        // MainMapper가 데이터를 로드한 후에 애니메이션 초기화
        // setTimeout으로 약간의 지연을 줘서 DOM이 완전히 생성되도록 함
        setTimeout(function() {
            // ScrollAnimations 인스턴스 생성
            const scrollAnimator = new ScrollAnimations({
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // text-content 순차 애니메이션 등록
            const textContent = document.querySelector('.text-content');
            if (textContent) {
                // hero-content 요소를 sequential animation 대상으로 설정
                const heroContent = textContent.querySelector('.hero-content');
                if (heroContent) {
                    // 초기 상태 설정 - 각 자식 요소들
                    const logoLine = textContent.querySelector('.logo-line-container');
                    const heroTitle = heroContent.querySelector('.hero-title');
                    const heroDescription = heroContent.querySelector('.hero-description');

                    if (logoLine) {
                        logoLine.style.opacity = '0';
                        logoLine.style.transform = 'translateX(-50px)';
                        logoLine.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    if (heroTitle) {
                        heroTitle.style.opacity = '0';
                        heroTitle.style.transform = 'translateX(-50px)';
                        heroTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    if (heroDescription) {
                        heroDescription.style.opacity = '0';
                        heroDescription.style.transform = 'translateX(50px)';
                        heroDescription.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }

                    // IntersectionObserver로 text-content 감시
                    const textObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // 순차적 애니메이션 실행
                                if (logoLine) {
                                    setTimeout(() => {
                                        logoLine.style.opacity = '1';
                                        logoLine.style.transform = 'translateX(0)';
                                    }, 100);
                                }
                                if (heroTitle) {
                                    setTimeout(() => {
                                        heroTitle.style.opacity = '1';
                                        heroTitle.style.transform = 'translateX(0)';
                                    }, 300);
                                }
                                if (heroDescription) {
                                    setTimeout(() => {
                                        heroDescription.style.opacity = '1';
                                        heroDescription.style.transform = 'translateX(0)';
                                    }, 500);
                                }
                                textObserver.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.2 });

                    textObserver.observe(textContent);
                }
            }

            // About block 이미지와 텍스트 애니메이션
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // about-block 내의 이미지와 텍스트에 visible 클래스 추가
                        const image = entry.target.querySelector('.about-image');
                        const text = entry.target.querySelector('.about-text');

                        if (image) {
                            image.classList.add('visible');
                        }
                        if (text) {
                            setTimeout(() => {
                                text.classList.add('visible');
                            }, 200); // 텍스트는 이미지보다 조금 늦게
                        }
                    }
                });
            }, observerOptions);

            // about-block 요소들 관찰
            const aboutBlocks = document.querySelectorAll('.about-block');
            aboutBlocks.forEach(block => {
                observer.observe(block);
            });

            // full-banner fade 애니메이션
            scrollAnimator.fadeInAnimation('.full-banner', { delay: 200 });

            // Handle typing animation
            const typingText = document.querySelector('.typing-text');
            if (typingText) {
                setTimeout(() => {
                    typingText.classList.add('typed');
                }, 2700);
            }
        }, 500); // MainMapper가 DOM을 생성할 시간을 줌
    });
})();