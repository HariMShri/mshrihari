// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
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

    // Fetch the navigation bar
    fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load navbar');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading navbar:', error);
        document.getElementById('navbar').innerHTML = '<p>Navbar could not be loaded</p>';
    });
});
