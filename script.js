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
            display.style.color = '#ff6b6b';
            setTimeout(() => {
                display.style.transform = 'scale(1)';
                display.style.color = '#0088cc';
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
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    if (testimonials.length > 0 && dotsContainer) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        // Hide current testimonial
        testimonials[currentIndex].classList.remove('active');
        
        // Show new testimonial
        currentIndex = index;
        testimonials[currentIndex].classList.add('active');
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            goToSlide(nextIndex);
        }, 5000);
    }

    // Initialize slider
    if (testimonials.length > 0) {
        // Show first testimonial
        testimonials[0].classList.add('active');
        resetAutoSlide();
    }

    // ===== JOIN BUTTON ANIMATION =====
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Pulse animation
        ctaButton.style.animation = 'pulse 2s infinite';
        
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(0, 136, 204, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 136, 204, 0); }
        }
    `;
    document.head.appendChild(style);
});
