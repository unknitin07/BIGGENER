document.addEventListener('DOMContentLoaded', function() {
    // ============== COUNTDOWN TIMER ==============
    function startCountdown(duration, display) {
        let timer = duration, minutes, seconds;
        const interval = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            // Animation when time updates
            display.style.transform = 'scale(1.1)';
            display.style.color = '#ff6b6b';
            setTimeout(() => {
                display.style.transform = 'scale(1)';
                display.style.color = '#0088cc';
            }, 200);

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                // Flash animation when timer resets
                display.style.animation = 'flash 0.5s 3';
                timer = duration;
                setTimeout(() => {
                    display.style.animation = '';
                }, 1500);
            }
        }, 1000);
    }

    const timerDisplay = document.querySelector('#timer');
    if (timerDisplay) {
        startCountdown(60 * 5, timerDisplay); // 5 minutes countdown
    }

    // ============== TESTIMONIAL SLIDER ==============
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    if (cards.length > 0 && dotsContainer) {
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
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

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
});
