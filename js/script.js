document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const toggleButton = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    window.myDataLayer = window.myDataLayer || {};

    window.myDataLayer.page = {
        pageInfo: {
            pageName : document.title,
            pageURL : window.location.href,
            pagePath : window.location.pathname
        }
    };

    window.scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent form submission
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const errorBox = document.getElementById("form-errors");

            errorBox.innerHTML = "";

            if (!name || !email || !message) {
                errorBox.textContent = "All fields are required.";
                return;
            }

            if (!validateEmail(email)) {
                errorBox.textContent = "Please enter a valid email address.";
                return;
            }

            window.formName = name;
            _satellite.setVar('formName', name);

            window.formEmail = email;
            _satellite.setVar('formEmail', email);

            window.formMessage = message;
            _satellite.setVar('formMessage', message);

            // If validation passes
            alert("Form submitted successfully!");
            contactForm.reset();

            _satellite.track('formSubmit');
        });
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const features = document.querySelectorAll(".feature-item");
    if (features) {
        features.forEach((feature, index) => {
            feature.style.animationDelay = `${index * 0.3}s`;
            feature.classList.add("animate-feature");
        });
    }

    // Multi-Step Registration Form Logic
    let currentStep = 0;

    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const submitButton = document.getElementById("submit-button");
    const formStages = document.querySelectorAll(".form-stage");

    function showStage(step) {
        formStages.forEach((stage, index) => {
            stage.classList.toggle("active", index === step);
        });

        prevButton.style.display = step > 0 ? 'inline-block' : 'none';
        nextButton.style.display = step < formStages.length - 1 ? 'inline-block' : 'none';
        submitButton.style.display = step === formStages.length - 1 ? 'inline-block' : 'none';
    }

    nextButton.addEventListener("click", () => {
        if (currentStep < formStages.length - 1 && validateStage(currentStep)) {
            currentStep++;
            showStage(currentStep);
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStage(currentStep);
        }
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (validateStage(currentStep)) {
            alert("Registration complete!");
            document.getElementById("registration-form").reset();
            currentStep = 0;
            showStage(currentStep);
        }
    });

    const validateStage = (stageIndex) => {
        const inputs = formStages[stageIndex].querySelectorAll("input, select");
        let isValid = true;

        inputs.forEach((input) => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        });

        return isValid;
    };

    showStage(currentStep);
});
