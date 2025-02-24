function showInfobox(text) {
    let infoBox = document.querySelector(".information-box");
    infoBox.innerHTML = "";
    infoBox.style.display = "flex";
    let span = document.createElement("span");
    span.textContent = text;
    infoBox.appendChild(span);
}

function sanitizeInput(input) {
    input = input.replace(/<script.*?>.*?<\/script>/gi, "");
    input = input.replace(/<style.*?>.*?<\/style>/gi, "");
    input = input.replace(/<!--.*?-->/gi, ""); 
    input = input.replace(/<\/?[^>]+(>|$)/g, function (tag) {
        const allowedTags = ['<b>', '</b>', '<i>', '</i>', '<h1>', '</h1>', '<h2>', '</h2>', '<h3>', '</h3>', '<ul>', '</ul>', '<ol>', '</ol>', '<li>', '</li>', '<p>', '</p>', '<br>', '</br>', '<strong>', '</strong>'];

        return allowedTags.includes(tag.toLowerCase()) ? tag : '';
    });
    return input;
}

function validateForm() {
    let form = document.forms["emailForm"];

    let firstName = form["FirstName"].value.trim();
    let lastName = form["LastName"].value.trim();
    let email = form["Email"].value.trim();
    let phone = form["Phone"].value.trim();
    let subject = form["Subject"].value.trim();
    let message = form["Message"].value.trim();

    console.log("Validating form...");

    // Reset all invalid classes
    let fields = ["FirstName", "LastName", "Email", "Phone", "Subject", "Message"];
    fields.forEach(field => form[field].classList.remove("is-invalid"));

    if (firstName === "") {
        showInfobox("Voornaam moet worden ingevuld.");
        form["FirstName"].classList.add("is-invalid");
        return false;
    }

    if (lastName === "") {
        showInfobox("Achternaam moet worden ingevuld.");
        form["LastName"].classList.add("is-invalid");
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showInfobox("Voer een geldig e-mailadres in.");
        form["Email"].classList.add("is-invalid");
        return false;
    }

    if (phone !== "" && !/^\+?[0-9\s-]{7,15}$/.test(phone)) {
        showInfobox("Voer een geldig telefoonnummer in.");
        form["Phone"].classList.add("is-invalid");
        return false;
    }

    if (subject.length < 1) {
        showInfobox("Onderwerp mag niet leeg zijn.");
        form["Subject"].classList.add("is-invalid");
        return false;
    }

    if (message.length < 1) {
        showInfobox("Bericht mag niet leeg zijn.");
        form["Message"].classList.add("is-invalid");
        return false;
    }

    if (subject.length > 200) {
        showInfobox("Onderwerp mag niet langer zijn dan 200 tekens.");
        form["Subject"].classList.add("is-invalid");
        return false;
    }

    if (message.length > 600) {
        showInfobox("Bericht mag niet langer zijn dan 600 tekens.");
        form["Message"].classList.add("is-invalid");
        return false;
    }

    // Sanitize message input
    form["Message"].value = sanitizeInput(message);

    console.log("Form validation passed!");
    return true;
}


function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) return;

    grecaptcha.ready(function () {
        grecaptcha.execute('6LddyNIqAAAAAOiN9fEKqErBKVpkE99_RwCjY58t', { action: 'submit' })
            .then(function (token) {
                let form = document.getElementById('contact-form');
                let tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'g-recaptcha-response';
                tokenInput.value = token;
                form.appendChild(tokenInput);

                form.submit();
                console.log("Captcha works?");
            })
            .catch(function (error) {
                console.error('reCAPTCHA error:', error);
                alert("Er is een probleem opgetreden met reCAPTCHA. Probeer het opnieuw.");
            });
    });
}

document.getElementById("contact-form").addEventListener("submit", submitForm);
