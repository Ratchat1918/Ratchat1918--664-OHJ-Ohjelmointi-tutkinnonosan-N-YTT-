let tuoteIndexSession = Number(sessionStorage.getItem("tuoteIndex"));
let imgNum = 1;
let slideIndex = 0;
let intervalId;

function createSlides() {
    const slidesContainer = document.getElementsByClassName("slides")[0];
    slidesContainer.innerHTML = "";
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                if (element.tuoteIndex === tuoteIndexSession) {
                    element.kuvaUrl.forEach(imgUrl => {
                        slidesContainer.innerHTML += `<img class="slide" src="${imgUrl}" alt="Image #${imgNum}">`;
                        imgNum++;
                    });
                    initializeSlider();
                }
            });
        });
}

function createInfo(){
    fetch('./tavaraLista.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            if (element.tuoteIndex === tuoteIndexSession) {
                document.getElementById("nimiH1").textContent=element.tuoteNimi;
                document.getElementById("tuoteHintaH1").textContent=`${element.tuoteHinta} €`;
                document.getElementById("tuoteInfoP").textContent=`${element.tuoteKuvausPitka}`;
            }
        });
    });
}
function addToCart(){
    sessionStorage.setItem(`valitsettu${tuoteIndexSession}`,tuoteIndexSession);
}

function initializeSlider() {
    const slides = document.querySelectorAll(".slides img");
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
    }
}

function showSlide(index, slides) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove("displaySlide"));
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    const slides = document.querySelectorAll(".slides img");
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex, slides);
}

function nextSlide() {
    const slides = document.querySelectorAll(".slides img");
    slideIndex++;
    showSlide(slideIndex, slides);
}

document.addEventListener("DOMContentLoaded", createSlides);
document.addEventListener("DOMContentLoaded", createInfo);


