document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const toggleButton = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

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

let currentPage = 1; // Keep track of the current page

// Function to toggle the answer visibility when a question is clicked
function toggleAnswer(questionElement) {
    const faqItem = questionElement.parentElement; // Get the parent .faq-item element
    const answer = questionElement.nextElementSibling; // Get the answer element
    const isExpanded = faqItem.classList.contains('expanded'); // Check if expanded

    // Toggle the display of the answer
    answer.style.display = isExpanded ? 'none' : 'block';

    // Toggle the expanded class on the parent .faq-item
    faqItem.classList.toggle('expanded');
}


// Function to show the next page of questions
function showNextPage() {
    const currentPageDiv = document.querySelector(`#faq-page-${currentPage}`);
    const nextPageDiv = document.querySelector(`#faq-page-${currentPage + 1}`);

    if (nextPageDiv) {
        currentPageDiv.style.display = 'none';
        nextPageDiv.style.display = 'block';
        currentPage++;
        updateNavigationButtons();
    }
}

// Function to show the previous page of questions
function showPreviousPage() {
    const currentPageDiv = document.querySelector(`#faq-page-${currentPage}`);
    const prevPageDiv = document.querySelector(`#faq-page-${currentPage - 1}`);

    if (prevPageDiv) {
        currentPageDiv.style.display = 'none';
        prevPageDiv.style.display = 'block';
        currentPage--;
        updateNavigationButtons();
    }
}

// Function to update the visibility of navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.style.display = currentPage === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = document.querySelector(`#faq-page-${currentPage + 1}`) ? 'inline-block' : 'none';
}
