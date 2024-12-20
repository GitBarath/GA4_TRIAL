document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const toggleButton = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Smooth scrolling
    window.scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Dynamic form validation on the contact page
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent form submission
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const errorBox = document.getElementById("form-errors");

            // Clear previous errors
            errorBox.innerHTML = "";

            if (!name || !email || !message) {
                errorBox.textContent = "All fields are required.";
                return;
            }

            if (!validateEmail(email)) {
                errorBox.textContent = "Please enter a valid email address.";
                return;
            }

            // If validation passes
            alert("Form submitted successfully!");
            contactForm.reset();
        });
    }

    // Email validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Dynamic feature animation on the home page
    const features = document.querySelectorAll(".feature-item");
    if (features) {
        features.forEach((feature, index) => {
            feature.style.animationDelay = `${index * 0.3}s`;
            feature.classList.add("animate-feature");
        });
    }
});
