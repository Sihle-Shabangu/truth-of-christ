document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. COUNTDOWN TIMER
    // -------------------------------------------------------------
    // Set target date to 90 days in the future to keep the countdown active
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);
    
    // DOM Elements for countdown
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            clearInterval(countdownInterval);
            return;
        }

        // Time calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update DOM with leading zeros
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Run immediately and set interval
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // -------------------------------------------------------------
    // 2. NEWSLETTER FORM HANDLER
    // -------------------------------------------------------------
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');
    const inputGroup = emailInput.closest('.input-group');

    // Handle focus/blur styles on input-group container
    emailInput.addEventListener('focus', () => {
        inputGroup.classList.add('focused');
    });

    emailInput.addEventListener('blur', () => {
        inputGroup.classList.remove('focused');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailValue = emailInput.value.trim();
        
        // Simple but robust email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset feedback
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        if (!emailValue) {
            showFeedback('Please enter your email address.', 'error');
            return;
        }

        if (!emailRegex.test(emailValue)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // Simulating API call
        submitBtn.classList.add('loading');
        emailInput.disabled = true;
        submitBtn.disabled = true;

        setTimeout(() => {
            // Success State
            submitBtn.classList.remove('loading');
            emailInput.disabled = false;
            submitBtn.disabled = false;
            
            showFeedback('Thank you! You have been successfully subscribed.', 'success');
            form.reset();
        }, 1500);
    });

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.classList.add(type);
        feedback.classList.add('show-msg');
    }

    // -------------------------------------------------------------
    // 3. FLOATING GOLDEN PARTICLES SYSTEM
    // -------------------------------------------------------------
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 25;

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random styling for floating stars/particles
            const size = Math.random() * 5 + 2; // 2px to 7px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 12 + 8; // 8s to 20s
            const delay = Math.random() * -20; // negative delay so particles start midway
            const drift = (Math.random() * 60) - 30; // -30px to 30px drift

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.setProperty('--drift', `${drift}px`);

            particlesContainer.appendChild(particle);
        }
    }

    if (particlesContainer) {
        initParticles();
    }

    // -------------------------------------------------------------
    // 4. COPYRIGHT DYNAMIC YEAR
    // -------------------------------------------------------------
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
