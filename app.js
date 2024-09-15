javascript
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const bgVideo = document.getElementById('bg-video');

    // Ensure hero content fades in smoothly
    window.addEventListener('load', () => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    });

    // Lazy-load video for optimization
    bgVideo.addEventListener('loadedmetadata', () => {
        bgVideo.play();
    });

    // Fade-in effect for tiles
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('fade-in');
        }, 300 * index); // Staggered fade-in
    });
});
