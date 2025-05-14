document.addEventListener('DOMContentLoaded', function() {
    // ===== COUNTDOWN TIMER =====
    function startCountdown(duration, display) {
        let timer = duration, minutes, seconds;
        const interval = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            // Animation
            display.style.transform = 'scale(1.1)';
            setTimeout(() => {
                display.style.transform = 'scale(1)';
            }, 200);

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    const timerDisplay = document.querySelector('#timer');
    if (timerDisplay) {
        startCountdown(60 * 5, timerDisplay);
    }

    // ===== TESTIMONIAL SLIDER =====
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    if (cards.length > 0 && dotsContainer) {
        const dotCount = Math.ceil(cards.length / 4); // 4 cards visible at once
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // width + gap
        track.style.transform = `translateX(-${currentIndex * cardWidth * 4}px)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % Math.ceil(cards.length / 4);
            updateSlider();
        }, 5000);
    }

    // Initialize slider
    if (track && cards.length > 0) {
        resetAutoSlide();
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        track.addEventListener('mouseleave', resetAutoSlide);
    }

    // ===== JOIN BUTTON ANIMATION =====
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-3px)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0)';
        });
    }
});
