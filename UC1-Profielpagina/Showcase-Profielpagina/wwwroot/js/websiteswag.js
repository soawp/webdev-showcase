// progress indicator

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".page-section");
    const dots = document.querySelectorAll(".dot");

    const observerOptions = {
        root: null, // Uses viewport
        rootMargin: "0px",
        threshold: 0.6 // At least 60% visible to trigger
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bgColor = window.getComputedStyle(entry.target).backgroundColor;
                const index = [...sections].indexOf(entry.target);

                dots.forEach(dot => {
                    dot.classList.remove("active");
                    dot.style.backgroundColor = "gray";
                });

                dots[index].classList.add("active");

                if (bgColor === "rgb(38, 38, 38)") {
                    dots[index].style.backgroundColor = "#f3f4f1";
                } else {
                    dots[index].style.backgroundColor = "#262626";
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});


//let images = ['./images/nolids.svg', './images/loglo.svg', './images/closedeyes.svg', './images/loglo.svg'];

//let index = 0;
//const imgElement = document.querySelector('#websiteLogo');

//function change() {
//    imgElement.src = images[index]; // Change the image source

//    if (index === 0) {
//        setTimeout(() => {
//            index = 1;
//            change();
//        }, 4000);
//    } else if (index === 1) {
//        setTimeout(() => {
//            index = 2;
//            change();
//        }, 80);
//    } else if (index === 2) {
//        setTimeout(() => {
//            index = 3;
//            change();
//        }, 80);
//    } else if (index === 3) {
//        setTimeout(() => {
//            index = 0;
//            change();
//        }, 80);
//    }
//}

//window.onload = function () {
//    change(); // Start the cycle immediately
//};


