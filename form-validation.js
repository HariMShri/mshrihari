<script>
        // Real-time form validation
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('#contact-form');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            // Email validation regex pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^\+?[0-9\s\-]+$/; // Simple pattern for phone numbers

            form.addEventListener('submit', function(e) {
                // Clear previous error messages
                clearErrors();

                let isValid = true;

                // Name validation
                if (nameInput.value.trim() === '') {
                    showError(nameInput, 'Full Name is required.');
                    isValid = false;
                }

                // Email validation
                if (!emailPattern.test(emailInput.value.trim())) {
                    showError(emailInput, 'Please enter a valid email address.');
                    isValid = false;
                }

                // Phone validation
                if (!phonePattern.test(phoneInput.value.trim())) {
                    showError(phoneInput, 'Please enter a valid phone number.');
                    isValid = false;
                }

                // Message validation
                if (messageInput.value.trim() === '') {
                    showError(messageInput, 'Message cannot be empty.');
                    isValid = false;
                }

                // Prevent form submission if there are errors
                if (!isValid) {
                    e.preventDefault();
                }
            });

            // Display error message below the input field
            function showError(input, message) {
                const error = document.createElement('div');
                error.classList.add('error-message');
                error.textContent = message;
                input.parentNode.insertBefore(error, input.nextSibling);
            }

            // Clear all error messages
            function clearErrors() {
                const errors = document.querySelectorAll('.error-message');
                errors.forEach(error => error.remove());
            }

            // Real-time validation for each field
            nameInput.addEventListener('input', () => clearErrors());
            emailInput.addEventListener('input', () => clearErrors());
            phoneInput.addEventListener('input', () => clearErrors());
            messageInput.addEventListener('input', () => clearErrors());
        });
    </script>
