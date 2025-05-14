document.addEventListener('DOMContentLoaded', function() {
  // ============== ANIMATED JOIN BUTTON ==============
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    // Pulse animation
    ctaButton.style.animation = 'pulse 2s infinite';
    
    // Hover effects
    ctaButton.addEventListener('mouseenter', () => {
      ctaButton.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      ctaButton.style.transform = 'translateY(0) scale(1)';
    });
    
    // Click animation
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      ctaButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        ctaButton.style.transform = 'scale(1)';
        window.location.href = ctaButton.href; // Proceed after animation
      }, 200);
    });
  }

  // ============== TESTIMONIAL SLIDER ==============
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dot');
  let currentIndex = 0;
  const cardCount = cards.length;
  let autoSlideInterval;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    track.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Animate cards
    cards.forEach((card, index) => {
      card.style.opacity = index === currentIndex ? '1' : '0.5';
      card.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
      card.style.transition = 'all 0.6s ease';
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cardCount;
      updateSlider();
    }, 5000);
  }

  // Initialize slider
  if (track && cards.length > 0) {
    updateSlider();
    startAutoSlide();
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    track.addEventListener('mouseleave', startAutoSlide);
    
    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        currentIndex = index;
        updateSlider();
        startAutoSlide();
      });
    });
  }

  // ============== COUNTDOWN TIMER ==============
  function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Add animation when time updates
      display.style.transform = 'scale(1.1)';
      display.style.color = '#ff6b6b';
      setTimeout(() => {
        display.style.transform = 'scale(1)';
        display.style.color = '#0088cc';
      }, 300);

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

  // ============== LOGO ANIMATION ==============
  const logo = document.querySelector('.logo');
  if (logo) {
    setTimeout(() => {
      logo.style.transform = 'rotate(15deg)';
      setTimeout(() => {
        logo.style.transform = 'rotate(-10deg)';
        setTimeout(() => {
          logo.style.transform = 'rotate(0)';
        }, 200);
      }, 200);
    }, 1000);
  }
});

// Add CSS animations to the page dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.7); }
    70% { box-shadow: 0 0 0 12px rgba(0, 136, 204, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 136, 204, 0); }
  }
  
  @keyframes flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  .cta-button {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(style);
