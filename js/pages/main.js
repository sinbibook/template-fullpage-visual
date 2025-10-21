/**
 * Main Page Slider Functionality
 * Hero 슬라이더 관련 함수들
 */

// 동적으로 생성된 슬라이드를 사용 (MainMapper에서 생성)
let currentSlide = 0;
let autoSlideTimer;

function updateSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicatorCurrent = document.querySelector('.indicator-current');
  const indicatorProgress = document.querySelector('.indicator-progress');

  // 슬라이드가 없으면 리턴
  if (slides.length === 0) return;

  // currentSlide가 범위를 벗어나면 수정
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  const totalSlides = slides.length;
  if (indicatorCurrent) {
    indicatorCurrent.textContent = String(currentSlide + 1).padStart(2, '0');
  }
  if (indicatorProgress) {
    indicatorProgress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
  }
}

function nextSlide() {
  const totalSlides = document.querySelectorAll('.hero-slide').length;
  if (totalSlides === 0) return;

  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
  resetAutoSlide();
}

function prevSlide() {
  const totalSlides = document.querySelectorAll('.hero-slide').length;
  currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
  updateSlider();
  resetAutoSlide();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  resetAutoSlide();
}

function startAutoSlide() {
  // 기존 타이머가 있다면 먼저 정리
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
  }

  autoSlideTimer = setInterval(() => {
    nextSlide();
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = null;
  startAutoSlide();
}

// 슬라이더 초기화 함수 (hero 슬라이드 생성 후 호출)
function initializeSlider() {
  // 기존 타이머 정리
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }

  // currentSlide 리셋
  currentSlide = 0;

  // 슬라이더 업데이트 및 자동 재생 시작
  updateSlider();
  startAutoSlide();
}

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleSwipe() {
  const swipeThreshold = 50; // 최소 스와이프 거리 (px)
  const horizontalDistance = touchEndX - touchStartX;
  const verticalDistance = Math.abs(touchEndY - touchStartY);

  // 수평 스와이프가 수직 스와이프보다 클 때만 처리
  if (Math.abs(horizontalDistance) > verticalDistance) {
    if (horizontalDistance > swipeThreshold) {
      // 오른쪽으로 스와이프 → 이전 슬라이드
      prevSlide();
    } else if (horizontalDistance < -swipeThreshold) {
      // 왼쪽으로 스와이프 → 다음 슬라이드
      nextSlide();
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Initialize touch swipe for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
  }

  // Initialize MainMapper (PreviewHandler가 없을 때만)
  if (!window.previewHandler) {
    const mainMapper = new MainMapper();
    mainMapper.initialize().then(() => {
      // 슬라이더 초기화는 MainMapper 초기화 후에
      setTimeout(initializeSlider, 100);
    }).catch(error => {
      console.error('❌ MainMapper initialization failed:', error);
    });
  }
});