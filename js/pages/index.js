/**
 * Index Page - With Hero Slider and Room Tabs
 */

(function() {
    'use strict';

    // Hero Slider
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const currentNum = document.querySelector('.hero-slider-current');
        const totalNum = document.querySelector('.hero-slider-total');
        const progressFill = document.querySelector('.hero-slider-line-fill');

        if (slides.length === 0) return;

        let currentSlide = 0;
        const slideInterval = 5000; // 5초마다 전환
        const totalSlides = slides.length;

        // Update total number
        if (totalNum) {
            totalNum.textContent = String(totalSlides).padStart(2, '0');
        }

        function updateProgress() {
            if (currentNum) {
                currentNum.textContent = String(currentSlide + 1).padStart(2, '0');
            }
            // Reset progress bar to 0 and animate to 100%
            if (progressFill) {
                progressFill.style.transition = 'none';
                progressFill.style.width = '0%';

                setTimeout(() => {
                    progressFill.style.transition = `width ${slideInterval}ms linear`;
                    progressFill.style.width = '100%';
                }, 50);
            }
        }

        function nextSlide() {
            // 현재 슬라이드 숨기기
            slides[currentSlide].classList.remove('active');

            // 다음 슬라이드 계산
            currentSlide = (currentSlide + 1) % slides.length;

            // 다음 슬라이드 보이기
            slides[currentSlide].classList.add('active');

            // Update progress bar
            updateProgress();
        }

        // Initialize progress
        updateProgress();

        // 자동 슬라이드 시작 (로고 애니메이션 후)
        setTimeout(() => {
            setInterval(nextSlide, slideInterval);
        }, 5000); // 5초 후 슬라이더 시작
    }

    // Room Tabs
    function initRoomTabs() {
        const tabs = document.querySelectorAll('.room-tab');
        const images = document.querySelectorAll('.room-image-item');
        const descItems = document.querySelectorAll('.room-desc-item');

        if (tabs.length === 0 || images.length === 0) return;

        tabs.forEach(tab => {
            // Hover event
            tab.addEventListener('mouseenter', () => {
                const roomType = tab.dataset.room;

                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update active image
                images.forEach(img => {
                    if (img.dataset.room === roomType) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });

                // Update active description item
                descItems.forEach(item => {
                    if (item.dataset.room === roomType) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            });
        });

        // Set default active state on load
        const defaultTab = document.querySelector('.room-tab[data-room="standard"]');
        if (defaultTab) {
            defaultTab.classList.add('active');
        }
    }

    // Scroll-triggered animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Essence section animations
        document.querySelectorAll('.essence-left-image, .essence-center-content, .essence-right-image').forEach(el => {
            observer.observe(el);
        });

        // Room preview section animations
        document.querySelectorAll('.room-preview-left, .room-preview-right').forEach(el => {
            observer.observe(el);
        });

        // Special Offers section animations (header only)
        document.querySelectorAll('.experience-header').forEach(el => {
            observer.observe(el);
        });

        // General fade animations
        document.querySelectorAll('.fade-in-up, .fade-in-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // Essence section border radius animation
    function initEssenceBorderAnimation() {
        const essenceSection = document.querySelector('.essence-section');
        const leftImage = document.querySelector('.essence-left-image img');
        const rightImage = document.querySelector('.essence-right-image img');

        if (!essenceSection || !leftImage || !rightImage) return;

        // 초기값 설정
        leftImage.style.borderTopLeftRadius = '0';
        rightImage.style.borderTopRightRadius = '0';

        // Track animation state
        let animationTriggered = false;

        // IntersectionObserver로 섹션 감지
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    // 섹션이 30% 이상 보일 때 애니메이션 실행
                    if (!animationTriggered) {
                        animationTriggered = true;
                        setTimeout(() => {
                            leftImage.style.borderTopLeftRadius = '100px';
                            rightImage.style.borderTopRightRadius = '100px';
                        }, 300); // 0.3초 딜레이 후 실행
                    }
                } else if (!entry.isIntersecting) {
                    // 섹션이 뷰포트에서 완전히 벗어나면 리셋
                    animationTriggered = false;
                    leftImage.style.borderTopLeftRadius = '0';
                    rightImage.style.borderTopRightRadius = '0';
                }
            });
        }, { threshold: [0, 0.3, 1] });

        observer.observe(essenceSection);
    }

    // Room preview section border radius animation
    function initRoomPreviewAnimation() {
        const roomSection = document.querySelector('.room-preview-section');
        const roomImages = document.querySelectorAll('.room-image-item img');

        if (!roomSection || roomImages.length === 0) return;

        // 초기값 설정
        roomImages.forEach(img => {
            img.style.borderTopLeftRadius = '0';
        });

        // IntersectionObserver로 섹션 감지
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    // 섹션이 30% 이상 보일 때 애니메이션 실행
                    setTimeout(() => {
                        roomImages.forEach(img => {
                            img.style.borderTopLeftRadius = '100px';
                        });
                    }, 300);
                } else if (!entry.isIntersecting) {
                    // 섹션이 뷰포트에서 벗어나면 리셋
                    roomImages.forEach(img => {
                        img.style.borderTopLeftRadius = '0';
                    });
                }
            });
        }, { threshold: [0.3] });

        observer.observe(roomSection);
    }

    // Experience Gallery Accordion
    function initExperienceAccordion() {
        // No active class needed anymore, pure CSS hover effect
        // JavaScript can be used for additional functionality if needed
    }

    // Signature Section Border Animation
    function initSignatureBorderAnimation() {
        const signatureSection = document.querySelector('.signature-section');
        const itemGroups = document.querySelectorAll('.signature-item-group');

        if (!signatureSection || itemGroups.length === 0) return;

        // Track animation state for each item
        const animationStates = new Array(itemGroups.length).fill(false);

        function handleScroll() {
            // Animate each group individually based on its visibility
            itemGroups.forEach((group, index) => {
                const groupTop = group.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const triggerPoint = windowHeight * 0.7; // Trigger earlier for better visibility

                const imagesArea = group.querySelector('.signature-images-area');
                if (!imagesArea) return;

                if (groupTop < triggerPoint && !animationStates[index]) {
                    animationStates[index] = true;

                    if (index % 2 === 0) {
                        // Even index (0, 2, 4...) - left-aligned
                        // First image gets top-left radius
                        const firstImage = imagesArea.querySelector('.signature-image:first-child img');
                        if (firstImage) {
                            firstImage.style.borderTopLeftRadius = '100px';
                        }
                    } else {
                        // Odd index (1, 3, 5...) - right-aligned
                        // Horizontal image gets top-right radius
                        const horizontalImage = imagesArea.querySelector('.signature-image.horizontal img');
                        if (horizontalImage) {
                            horizontalImage.style.borderTopRightRadius = '100px';
                        }
                    }
                } else if (groupTop > windowHeight && animationStates[index]) {
                    animationStates[index] = false;

                    // Reset animations
                    if (index % 2 === 0) {
                        // Reset first image
                        const firstImage = imagesArea.querySelector('.signature-image:first-child img');
                        if (firstImage) {
                            firstImage.style.borderTopLeftRadius = '0';
                        }
                    } else {
                        // Reset horizontal image
                        const horizontalImage = imagesArea.querySelector('.signature-image.horizontal img');
                        if (horizontalImage) {
                            horizontalImage.style.borderTopRightRadius = '0';
                        }
                    }
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position
    }

    // Section Navigation
    function initSectionNavigation() {
        const dots = document.querySelectorAll('.section-dot');
        const sections = document.querySelectorAll('section');
        const nav = document.querySelector('.section-nav');
        const closingSection = document.querySelector('.index-closing');

        if (dots.length === 0 || sections.length === 0) return;

        // Dot click event
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.section);
                if (index >= 0 && index < sections.length) {
                    // For closing section, use normal scroll
                    if (sections[index] === closingSection) {
                        window.scrollTo({
                            top: sections[index].offsetTop,
                            behavior: 'smooth'
                        });
                    } else {
                        sections[index].scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Update active dot on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const index = Array.from(sections).indexOf(entry.target);

                    // Update active dot
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) {
                        dots[index].classList.add('active');
                    }

                    // Change nav color for light sections
                    if (index === 1 || index === 2 || index === 3 || index === 4) {
                        nav.classList.add('dark');
                    } else {
                        nav.classList.remove('dark');
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Fullpage Scroll
    function initFullpageScroll() {
        const sections = document.querySelectorAll('section:not(.index-closing)'); // Exclude closing section
        const closingSection = document.querySelector('.index-closing');
        let currentSectionIndex = 0;
        let isScrolling = false;
        let normalScrollArea = false;

        function scrollToSection(index) {
            if (index < 0 || index >= sections.length || isScrolling) return;

            isScrolling = true;
            currentSectionIndex = index;

            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }

        // Check if we're in normal scroll area (closing section and below)
        function checkScrollPosition() {
            if (!closingSection) return;

            const closingRect = closingSection.getBoundingClientRect();

            // If closing section is visible at all
            if (closingRect.top < window.innerHeight) {
                normalScrollArea = true;
            } else if (closingRect.top > window.innerHeight) {
                normalScrollArea = false;
            }
        }

        // Mouse wheel event
        let lastScrollTime = 0;
        const scrollThrottle = 1000; // Throttle scroll events

        window.addEventListener('wheel', (e) => {
            checkScrollPosition();

            // Allow normal scrolling in closing section and below
            if (normalScrollArea) {
                // If scrolling up and closing section is at the top of viewport
                const closingRect = closingSection.getBoundingClientRect();
                if (e.deltaY < 0 && closingRect.top >= 0 && closingRect.top < 10) {
                    e.preventDefault();
                    normalScrollArea = false;
                    scrollToSection(sections.length - 1);
                    return;
                }
                // Otherwise allow normal scrolling
                return;
            }

            e.preventDefault();

            const now = Date.now();
            if (now - lastScrollTime < scrollThrottle) return;
            lastScrollTime = now;

            if (e.deltaY > 0) {
                // Scroll down
                if (currentSectionIndex === sections.length - 1) {
                    // If at last fullpage section, allow normal scroll to closing
                    normalScrollArea = true;
                    window.scrollTo({
                        top: closingSection.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    scrollToSection(currentSectionIndex + 1);
                }
            } else {
                // Scroll up
                scrollToSection(currentSectionIndex - 1);
            }
        }, { passive: false });

        // Touch events for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        window.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;

            const diff = touchStartY - touchEndY;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swipe up - scroll down
                    scrollToSection(currentSectionIndex + 1);
                } else {
                    // Swipe down - scroll up
                    scrollToSection(currentSectionIndex - 1);
                }
            }
        });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                scrollToSection(currentSectionIndex - 1);
            }
        });

        // Update current section on scroll
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    if (index !== -1) {
                        currentSectionIndex = index;
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Signature Section Slider
    function initSignatureSlider() {
        const slides = document.querySelectorAll('.signature-slide');
        const signatureSection = document.querySelector('.signature-section');
        const slideImages = document.querySelectorAll('.signature-slide-image img');

        if (slides.length === 0) return;

        let currentSlide = 0;
        const slideInterval = 4000; // 4초마다 전환

        // 첫 번째 슬라이드 활성화
        slides[0].classList.add('active');

        // 초기값 설정
        slideImages.forEach(img => {
            img.style.borderTopLeftRadius = '0';
            img.style.transition = 'border-radius 0.8s ease';
        });

        function nextSlide() {
            // 현재 슬라이드 숨기기
            slides[currentSlide].classList.remove('active');

            // 다음 슬라이드 계산
            currentSlide = (currentSlide + 1) % slides.length;

            // 다음 슬라이드 보이기
            slides[currentSlide].classList.add('active');
        }

        // 자동 슬라이드 시작
        setInterval(nextSlide, slideInterval);

        // 스크롤 시 border-radius 애니메이션
        if (signatureSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        // 섹션이 30% 이상 보일 때 애니메이션 실행
                        setTimeout(() => {
                            slideImages.forEach(img => {
                                img.style.borderTopLeftRadius = '100px';
                            });
                        }, 300);
                    } else if (!entry.isIntersecting) {
                        // 섹션이 뷰포트에서 벗어나면 리셋
                        slideImages.forEach(img => {
                            img.style.borderTopLeftRadius = '0';
                        });
                    }
                });
            }, { threshold: [0.3] });

            observer.observe(signatureSection);
        }
    }

    // Check if logo animation should be shown
    function shouldShowLogoAnimation() {
        // Check if this is a first visit (no session storage flag)
        const hasVisited = sessionStorage.getItem('hasVisitedHero');

        // Show animation only if user hasn't visited during this session
        if (!hasVisited) {
            sessionStorage.setItem('hasVisitedHero', 'true');
            return true;
        }

        return false;
    }

    // Initialize logo animation
    function initLogoAnimation() {
        const logoReveal = document.getElementById('hero-logo-reveal');
        const heroContent = document.getElementById('hero-content');
        const brandName = document.getElementById('brand-name');

        if (!logoReveal) return;

        if (!shouldShowLogoAnimation()) {
            // Skip animation - hide logo reveal immediately
            logoReveal.style.display = 'none';

            // Remove animation classes so content appears immediately
            if (heroContent) {
                heroContent.classList.remove('with-animation');
                heroContent.classList.add('no-animation');
            }
            if (brandName) {
                brandName.classList.remove('with-animation');
                brandName.classList.add('no-animation');
            }
        } else {
            // Show animation as normal
            logoReveal.style.display = 'flex';

            // Keep animation classes
            if (heroContent) {
                heroContent.classList.add('with-animation');
                heroContent.classList.remove('no-animation');
            }
            if (brandName) {
                brandName.classList.add('with-animation');
                brandName.classList.remove('no-animation');
            }
        }
    }

    // Initialize everything
    function init() {
        initLogoAnimation();
        initHeroSlider();
        initRoomTabs();
        initScrollAnimations();
        initEssenceBorderAnimation();
        initRoomPreviewAnimation();
        initExperienceAccordion();
        initSignatureBorderAnimation();
        initSignatureSlider();
        initSectionNavigation();
        initFullpageScroll();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();