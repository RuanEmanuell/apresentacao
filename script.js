let opacity = 0;
let slide = 0;

function hideAllSlides() {
    let slides = document.querySelectorAll(".slide");

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

}

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    slides[index].style.display = "block";
}


function opacityChanger() {
    let opacityInterval = setInterval(() => {
        document.querySelector(".presentation").style.opacity = opacity;
        opacity += 0.01;
        if (opacity >= 1) {
            clearInterval(opacityInterval);
        }
    }
        , 10);
    if (slide == 0) {
        document.querySelector(".presentation").style.display = "none";
        document.querySelector("main").style.display = "block";
    } else {
        document.querySelector(".presentation").style.display = "block";
    }
}

function changePresentation() {
    slide++;
    document.querySelector("main").style.display = "none";
    changeSlide();
}

function returnSlide() {
    slide--;
    changeSlide();
}

function nextSlide() {
    slide++;
    if (slide > 8) {
        slide = 0;
        opacity = 0;
    }
    changeSlide();
}

function changeSlide() {
    opacity = 0;
    opacityChanger();
    hideAllSlides();
    showSlide(slide);
    document.querySelector(".presentation").scrollIntoView();
}
