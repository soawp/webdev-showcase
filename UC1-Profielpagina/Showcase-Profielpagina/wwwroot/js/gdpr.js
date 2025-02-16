class GDPR {
    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if (this.cookieStatus() === 'accept') {
            this.hideGDPR();
        }
        else if (this.cookieStatus() === 'reject') {
            this.showGDPR();
        } else {
            this.showGDPR();
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
                this.hideGDPR()
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

        let contentSelector = `.content-gdpr-${status}`;
        let contentElement = document.querySelector(contentSelector);

        if (contentElement) {
            contentElement.classList.add('show');
            contentElement.classList.remove('hide');
            contentElement.style.display = "flex";
        }

        const consentElement = document.querySelector('.gdpr-consent');
        if (consentElement) {
            if (status !== "accept") {
                consentElement.classList.add('show');
                consentElement.classList.remove('hide');
            } else {
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
                element.style.display = "none"; 
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
            consentElement.style.display = "none";
        }
    }

    showGDPR() {
        let consentElement = document.querySelector('.gdpr-consent');
        if (consentElement) {
            consentElement.classList.add('show');
            consentElement.classList.remove('hide');
            consentElement.style.display = "flex";
        }
    }
}
const gdpr = new GDPR();

var content = document.querySelector(".gdpr-content");
var chev = document.querySelector(".fa-chevron-up");
var open = false;

document.querySelector(".gdpr-consent").addEventListener("click", function () {
    if (content) {

        if (open) {
            open = false;
            content.style.display = "none";
            chev.classList.remove('fa-chevron-down');
            chev.classList.add('fa-chevron-up');
        } else {
            open = true;
            content.style.display = "flex";
            chev.classList.remove('fa-chevron-up');
            chev.classList.add('fa-chevron-down');
        }
    }
});