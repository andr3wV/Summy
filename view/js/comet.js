document.addEventListener('DOMContentLoaded', function() {
    const cometBg = document.querySelector('.comet-bg');

    for (let i = 0; i < 50; i++) {
        const comet = document.createElement('div');
        comet.classList.add('comet');
        comet.style.left = Math.random() * 100 + 'vw';
        comet.style.top = Math.random() * 100 + 'vh';
        comet.style.animationDuration = (Math.random() * 3 + 2) + 's';
        comet.style.animationDelay = (Math.random() * 5) + 's';

        // New lines for random directions
        const direction = Math.random() >= 0.5 ? 1 : -1;
        const diagonal = direction * (Math.random() * 50 + 50);

        // Updating the animation of the comet
        comet.style.animation = `shoot 5s linear infinite, translateY(${diagonal}%)`;

        cometBg.appendChild(comet);
    }
});