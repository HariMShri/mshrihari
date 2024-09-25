document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const bgVideo = document.getElementById('bg-video');
    const tiles = document.querySelectorAll('.tile');

    // Ensure hero content fades in smoothly
    window.addEventListener('load', () => {
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    });

    // Lazy-load background video for optimization
    if (bgVideo) {
        bgVideo.addEventListener('loadedmetadata', () => {
            bgVideo.play();
        });
    }

    // Fade-in effect for tiles with staggered delay
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('fade-in');
        }, 300 * index); // Staggered fade-in with 300ms intervals
    });

    // Event listeners for opening the respective popup when tile is clicked
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const popupId = tile.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add('active');
                trapFocus(popup);  // Trap focus when popup is opened
            }
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

        // Close popup on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        });
    });

    // Focus trapping function
    function trapFocus(popup) {
        const focusableElements = popup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        firstElement.focus();

        popup.addEventListener('keydown', (e) => {
            const isTabPressed = e.key === 'Tab';

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                // Shift + Tab: if focus is on the first element, move to the last element
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: if focus is on the last element, move to the first element
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
});

// Fetch the navigation bar and inject it into the document
fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load navbar');
        }
        return response.text();
    })
    .then(data => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = data;
        }
    })
    .catch(error => {
        console.error('Error loading navbar:', error);
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = '<p>Navbar could not be loaded</p>';
        }
    });
