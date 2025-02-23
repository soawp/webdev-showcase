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

    let name = form["name"].value.trim();
    let email = form["email"].value.trim();
    let subject = form["subject"].value.trim();
    let message = form["message"].value.trim();

    if (name === "") {
        showInfobox("Naam moet worden ingevuld.");
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showInfobox("Voer een geldig e-mailadres in.");
        return false;
    }

    if (subject.length < 1) {
        showInfobox("Onderwerp mag niet leeg zijn.");
        return false;
    }
    if (message.length < 1) {
        showInfobox("Bericht mag niet leeg zijn.");
        return false;
    }

    if (subject.length > 200) {
        showInfobox("Onderwerp mag niet langer zijn dan 200 tekens.");
        return false;
    }

    if (message.length > 600) {
        showInfobox("Bericht mag niet langer zijn dan 600 tekens.");
        return false;
    }
    form["message"].value = sanitizeInput(form["message"].value);
    return true;
}

function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) return;

    grecaptcha.ready(function () {
        grecaptcha.execute('6LddyNIqAAAAAOiN9fEKqErBKVpkE99_RwCjY58t', { action: 'submit' })
            .then(function (token) {
                let form = document.getElementById('demo-form');
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

document.getElementById("demo-form").addEventListener("submit", submitForm);
