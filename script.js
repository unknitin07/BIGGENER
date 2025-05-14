// Countdown Timer
function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            // Reset timer when it reaches 0
            timer = duration;
            // You could add a notification here
        }
    }, 1000);
}

// Initialize the countdown when the page loads
window.onload = function () {
    const fiveMinutes = 60 * 5; // 5 minutes in seconds
    const display = document.querySelector('#timer');
    startCountdown(fiveMinutes, display);
};

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});