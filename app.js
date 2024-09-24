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
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch('submit_form.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const feedback = document.querySelector('.form-feedback');
            if (data.status === 'success') {
                feedback.textContent = data.message;
                feedback.classList.add('success');
                form.reset(); // Clear the form
            } else {
                feedback.textContent = data.message;
                feedback.classList.add('error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
