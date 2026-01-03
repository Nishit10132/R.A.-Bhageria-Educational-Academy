const pages = document.querySelectorAll(".page");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

/* Next */
nextBtn.addEventListener("click", () => {
    if (current < pages.length) {
        pages[current].classList.add("flipped");
        current++;
    }
});

/* Prev */
prevBtn.addEventListener("click", () => {
    if (current > 0) {
        current--;
        pages[current].classList.remove("flipped");
    }
});

/* Keyboard */
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
});

/* Mobile Swipe */
let startX = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextBtn.click();
    if (endX - startX > 50) prevBtn.click();
});
