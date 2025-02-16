document.addEventListener("DOMContentLoaded", () => {
    const eyes = document.querySelectorAll(".cls-1");  // Select eye outlines
    const pupils = document.querySelectorAll(".pupil"); // Select pupils

    document.addEventListener("mousemove", (e) => {
        eyes.forEach((eye, index) => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 1.5;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const maxMoveX = eyeRect.width * 1; // Limit movement within the eye
            const maxMoveY = eyeRect.height * 1;

            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;

            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxMoveX);
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * (distance / maxMoveX * maxMoveY);

            // Move pupil inside eye bounds
            pupils[index].setAttribute("transform", `translate(${pupilX},${pupilY})`);
        });
    });
});


const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Get the color of the pixel under the cursor
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

    if (elementUnderCursor) {
        const bgColor = window.getComputedStyle(elementUnderCursor).backgroundColor;
        cursor.style.backgroundColor = invertColor(bgColor);
    }
});

// Function to invert color
function invertColor(rgb) {
    if (!rgb.startsWith("rgb")) return "white"; // Default if no RGB value

    // Extract R, G, B values
    const values = rgb.match(/\d+/g).map(Number);
    const inverted = values.map((v) => 255 - v); // Invert each color channel

    return `rgb(${inverted[0]}, ${inverted[1]}, ${inverted[2]})`;
}

document.addEventListener('DOMContentLoaded', function () {
    var windowWidth = window.innerWidth;

    var elementWrapper = document.querySelector(".element-wrapper");
    var horLength = elementWrapper ? elementWrapper.scrollWidth : 0;

    var horizontalSection = document.querySelector(".horizontal-section");
    var distFromTop = horizontalSection ? horizontalSection.offsetTop : 0;
    if (horizontalSection) horizontalSection.style.height = horLength / 1.4 + "px";

    var scrollDistance = distFromTop + horLength - windowWidth;

    window.onscroll = function () {
        var scrollTop = window.scrollY;
        if (scrollTop >= distFromTop && scrollTop <= scrollDistance) {
            if (elementWrapper) elementWrapper.style.transform = "translateX(-" + (scrollTop  - distFromTop) + "px)";
        }
    };
});
