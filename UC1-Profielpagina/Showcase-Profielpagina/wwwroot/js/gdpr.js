class GDPR {
    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        // If the user accepted, hide the modal forever
        if (this.cookieStatus() === 'accept') {
            this.hideGDPR();
        }
        // If the user rejected, show the modal on page load
        else if (this.cookieStatus() === 'reject') {
            this.showGDPR();
        } else {
            this.showGDPR();  // Show if not accepted or rejected (including not-chosen)
        }
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        let buttonReject = document.querySelector('.gdpr-consent__button--reject');

        if (buttonAccept) {
            buttonAccept.addEventListener('click', () => {
                this.cookieStatus('accept');
                this.showStatus();
                this.showContent();
                this.hideGDPR(); // Hide permanently after accept
            });
        }

        if (buttonReject) {
            buttonReject.addEventListener('click', () => {
                this.cookieStatus('reject');
                this.showStatus();
                this.showContent();
                this.hideGDPR();
            });
        }
    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector('.gdpr-consent');


        if (element) {
            if (status !== "accept") {
                element.classList.add('show');
                element.classList.remove('hide');
                console.log("hier");
            }
            else {
                console.log("daar");
                this.hideGDPR();
            }
        }
    }

    resetContent() {
        const classes = ['.content-gdpr-accept', '.content-gdpr-reject', '.content-gdpr-not-chosen'];

        for (const c of classes) {
            const element = document.querySelector(c);
            if (element) {
                element.classList.add('hide');
                element.classList.remove('show');
            }
        }
    }

    showStatus() {
        let statusElement = document.getElementById('content-gpdr-consent-status');
        if (statusElement) {
            statusElement.innerHTML = this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
        }
    }

    cookieStatus(status = null) {
        let currentDate = new Date();
        if (status) {
            localStorage.setItem('gdpr-consent-choice', status);
            localStorage.setItem('gdpr-consent-metadata', JSON.stringify({
                date: currentDate.toISOString().split('T')[0],
                time: currentDate.getTime(),
            }));
        }
        return localStorage.getItem('gdpr-consent-choice');
    }

    hideGDPR() {
        let consentElement = document.querySelector('.gdpr-consent');
        if (consentElement) {
            consentElement.classList.add('hide');
            consentElement.classList.remove('show');
            consentElement.style.display = "none"; // Force hide
        }
    }

    showGDPR() {
        let consentElement = document.querySelector('.gdpr-consent');
        if (consentElement) {
            consentElement.classList.add('show');
            consentElement.classList.remove('hide');
            consentElement.style.display = "flex"; // Ensure visibility when needed
        }
    }
}

// Initialize GDPR consent system
const gdpr = new GDPR();

var content = document.querySelector(".gdpr-content");
var chev = document.querySelector(".fa-chevron-up");

document.querySelector(".gdpr-consent").addEventListener("mouseover", function () {
    if (content) {
        content.style.display = "flex";
        chev.classList.remove('fa-chevron-up');
        chev.classList.add('fa-chevron-down');
    }
});

document.querySelector(".gdpr-consent").addEventListener("mouseout", function () {
    if (content) {
        if (gdpr.cookieStatus() !== 'accept' && gdpr.cookieStatus() !== 'reject') {
            content.style.display = "flex"; // Keep visible if not accepted/rejected
        } else {
            content.style.display = "none"; // Hide if already accepted/rejected
        }
        chev.classList.remove('fa-chevron-down');
        chev.classList.add('fa-chevron-up');
    }
});
