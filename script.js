// --- Navigation Menu Toggle Function ---

// This function controls the visibility of the navigation links on smaller screens (mobile).
function toggleMenu() {
    // Selects the HTML element with the class 'nav-links'. This is our list of navigation items.
    const navLinks = document.querySelector('.nav-links');
    // Toggles the 'show' class on the 'nav-links' element.
    // If 'show' is present, it removes it (hides the menu).
    // If 'show' is absent, it adds it (shows the menu).
    navLinks.classList.toggle('show');
}


// --- Project Card Intersection Observer for Animations ---

// Selects all HTML elements that have the class 'project-card'.
// These are the individual cards displaying your projects.
const cards = document.querySelectorAll('.project-card');

// Creates a new IntersectionObserver. This API allows us to know when an element
// enters or exits the viewport (the visible part of the browser window).
const observer = new IntersectionObserver(entries => {
    // Loops through each 'entry' observed by the IntersectionObserver.
    // An 'entry' represents a 'project-card' element.
    entries.forEach(entry => {
        // Checks if the current 'entry' (project card) is currently intersecting the viewport.
        if (entry.isIntersecting) {
            // If the card is visible, add the 'visible' class to it.
            // This 'visible' class will trigger the CSS animation to make the card appear.
            entry.target.classList.add('visible');
            // Stop observing this specific card after it has become visible.
            // We only want the animation to run once.
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 }); // The animation will trigger when 30% of the element is visible in the viewport.

// For each 'project-card' found, start observing it with our IntersectionObserver.
cards.forEach(card => observer.observe(card));


// --- Mobile Project Card Animation Logic ---

// Selects all HTML elements that have the class 'project-card' again for mobile specific animations.
const mobiCards = document.querySelectorAll('.project-card');
// Checks if the current window width is less than or equal to 991 pixels.
// This is used to determine if the user is on a mobile-like screen size.
const isMobile = window.innerWidth <= 991;

// Loops through each 'project-card' element, along with its index.
mobiCards.forEach((card, index) => {
    // Determine the animation direction ('slide-in-left' or 'slide-in-right') only if on mobile.
    // If it's a mobile device, odd-indexed cards slide from the right, even-indexed from the left.
    // If not mobile, the direction is an empty string, so no mobile-specific animation class is added.
    const direction = isMobile ? (index % 2 === 0 ? 'slide-in-left' : 'slide-in-right') : '';
    // If it's a mobile device, add the determined direction class to the card.
    if (isMobile) card.classList.add(direction);

    // Creates a new IntersectionObserver specifically for mobile card animations.
    // This is similar to the first observer but might be configured differently or for different effects.
    const mobiObserver = new IntersectionObserver(entries => {
        // Loops through each 'entry' observed by this mobile IntersectionObserver.
        entries.forEach(entry => {
            // Checks if the current 'entry' (project card) is currently intersecting the viewport.
            if (entry.isIntersecting) {
                // If visible, add the 'visible' class to trigger the mobile animation.
                entry.target.classList.add('visible');
                // Stop observing this card after its animation has played.
                mobiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Animation triggers when 30% of the element is visible.

    // Start observing each mobile project card with the mobile-specific IntersectionObserver.
    mobiObserver.observe(card);
});


// --- Contact Form Validation Logic (Day 3 Main Task) ---

// Get references to the HTML elements we need for validation.
// Selects the form element by its class.
const contactForm = document.querySelector('.contact-form');
// Selects the name input field.
const nameInput = document.querySelector('input[type="text"]');
// Selects the email input field.
const emailInput = document.querySelector('input[type="email"]');
// Selects the message textarea.
const messageInput = document.querySelector('textarea');

// Add an event listener to the contact form.
// When the form is 'submit'ted (e.g., by clicking the Send button), this function runs.
contactForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior.
    // Without this, the browser would try to refresh the page, and our JavaScript validation wouldn't be seen.
    event.preventDefault();
    // Call our custom validation function.
    validateForm();
});

// Function to validate the entire contact form.
function validateForm() {
    // A flag to keep track if the entire form is valid.
    // We assume it's valid until we find an error.
    let isValid = true;

    // --- Validate Name Field ---
    // .trim() removes any extra spaces from the beginning or end of the input.
    if (nameInput.value.trim() === '') {
        // If the name field is empty, display an error message.
        displayErrorMessage(nameInput, 'Name cannot be empty.');
        // Set the isValid flag to false because we found an error.
        isValid = false;
    } else {
        // If the name field is NOT empty, clear any previous error messages.
        clearErrorMessage(nameInput);
    }

    // --- Validate Email Field ---
    if (emailInput.value.trim() === '') {
        // If the email field is empty, display an error message.
        displayErrorMessage(emailInput, 'Email cannot be empty.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        // If the email is not empty but doesn't look like a valid email address, display an error.
        displayErrorMessage(emailInput, 'Please enter a valid email address.');
        isValid = false;
    } else {
        // If the email is valid, clear any previous error messages.
        clearErrorMessage(emailInput);
    }

    // --- Validate Message Field ---
    if (messageInput.value.trim() === '') {
        // If the message field is empty, display an error message.
        displayErrorMessage(messageInput, 'Message cannot be empty.');
        isValid = false;
    } else {
        // If the message field is NOT empty, clear any previous error messages.
        clearErrorMessage(messageInput);
    }

    // --- Final Check and Submission ---
    // If the isValid flag is still true after checking all fields, then the form is ready to be 'submitted'.
    if (isValid) {
        // In a real application, you would send this data to a server here.
        // For now, we'll just show an alert to simulate successful submission.
        alert('Form submitted successfully!');
        // Clear all the form fields after a successful 'submission'.
        contactForm.reset();
    }
}

// Helper function to display an error message next to an input field.
function displayErrorMessage(inputElement, message) {
    // Finds the next HTML element right after the input field.
    // In our HTML, this is the <span> tag we added for error messages.
    const errorSpan = inputElement.nextElementSibling;
    // Checks if we actually found a span and if it has the 'error-message' class.
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        // Puts the error message text into the span.
        errorSpan.textContent = message;
        // Adds the 'invalid' class to the input field. This class will add a red border via CSS.
        inputElement.classList.add('invalid');
    }
}

// Helper function to clear an error message and remove the invalid styling.
function clearErrorMessage(inputElement) {
    // Finds the next HTML element right after the input field (our error span).
    const errorSpan = inputElement.nextElementSibling;
    // Checks if we found a span and if it has the 'error-message' class.
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        // Clears the text content of the error span.
        errorSpan.textContent = '';
        // Removes the 'invalid' class from the input field, removing the red border.
        inputElement.classList.remove('invalid');
    }
}

// Helper function to check if an email address is in a valid format using a regular expression.
function isValidEmail(email) {
    // This is a simple regular expression (regex) for email validation.
    // It checks for: characters, then an '@' symbol, then more characters, then a '.', then characters.
    // It's not perfect but good enough for basic frontend validation.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}