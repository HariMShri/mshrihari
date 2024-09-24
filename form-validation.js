document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    form.addEventListener('submit', function (e) {
        let isValid = true;

        inputs.forEach(input => {
            const errorSpan = input.nextElementSibling; // Assuming the error <span> is the next sibling
            if (!input.value.trim()) {
                errorSpan.textContent = `${input.placeholder} is required.`;
                input.classList.add('error-border'); // Adding class for visual error indication
                isValid = false;
            } else {
                errorSpan.textContent = '';
                input.classList.remove('error-border');
            }
        });

        if (!isValid) {
            e.preventDefault(); // Prevent form submission if validation fails
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errorSpan = input.nextElementSibling;
            if (input.value.trim()) {
                errorSpan.textContent = '';
                input.classList.remove('error-border');
            }
        });
    });
});
