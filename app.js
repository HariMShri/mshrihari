document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const bgVideo = document.getElementById('bg-video');
    const tiles = document.querySelectorAll('.tile');

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
   // const tiles = document.querySelectorAll('.tile');
    //tiles.forEach((tile, index) => {
      //  setTimeout(() => {
        //    tile.classList.add('fade-in');
        //}, 300 * index); // Staggered fade-in
   // });

     tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const popupId = tile.getAttribute('data-popup');
            document.getElementById(popupId).classList.add('active');
        });
    });

     // Close popups when clicking on the close button
    const closeButtons = document.querySelectorAll('.close-popup');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup-overlay');
            popup.classList.remove('active');
        });
    });

    // Close popup when clicking outside the content area
    const popups = document.querySelectorAll('.popup-overlay');
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });
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

