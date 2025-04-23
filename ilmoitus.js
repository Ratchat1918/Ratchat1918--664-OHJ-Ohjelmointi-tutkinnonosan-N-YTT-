
let tuoteIndexSession = Number(sessionStorage.getItem("tuoteIndex"));
let imgNum = 1;
let slideIndex = 0;
let intervalId;
let dataLength;
let amountOfThingsInCart=0;
valitsettuTuoteLista=[1];
sessionStorage.setItem("items",JSON.stringify(valitsettuTuoteLista));
sessionStorage.setItem('amountOfThingsInCart',amountOfThingsInCart);
function createSlides() {
    const slidesContainer = document.getElementsByClassName("slides")[0];
    slidesContainer.innerHTML = "";
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            dataLength=data.length;
            data.forEach(element => {
                if (element.tuoteIndex === tuoteIndexSession) {
                    element.kuvaUrl.forEach(imgUrl => {
                        slidesContainer.innerHTML += `<img class="slide" src="${imgUrl}" alt="Image #${imgNum}">`;
                        imgNum++;
                    });
                    initializeSlider();
                }
            });
            if(tuoteIndexSession>dataLength-1){
                let products = JSON.parse(localStorage.getItem("products")) || [];
                slidesContainer.innerHTML += `<img class="slide" src="${products[tuoteIndexSession].kuvaUrl}" alt="Image #${1}">`;
                initializeSlider();
            }
        });
}

function createInfo(){
    fetch('./tavaraLista.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            if (element.tuoteIndex === tuoteIndexSession) {
                document.getElementById("titleIlmoitus").textContent=element.tuoteNimi;
                document.getElementById("nimiH1").textContent=element.tuoteNimi;
                document.getElementById("tuoteHintaH1").textContent=`${element.tuoteHinta} €`;
                document.getElementById("tuoteInfoP").textContent=`${element.tuoteKuvausPitka}`;
            }
        });
        if(tuoteIndexSession>dataLength-1){
            let products = JSON.parse(localStorage.getItem("products")) || [];
            document.getElementById("titleIlmoitus").textContent=products[tuoteIndexSession].tuoteNimi;
                document.getElementById("nimiH1").textContent=products[tuoteIndexSession].tuoteNimi;
                document.getElementById("tuoteHintaH1").textContent=`${products[tuoteIndexSession].tuoteHinta} €`;
                document.getElementById("tuoteInfoP").textContent=products[tuoteIndexSession].tuoteKuvausPitka;
        }
    });
}
function addToCart(){
    amountOfThingsInCart++;
    sessionStorage.setItem('amountOfThingsInCart',amountOfThingsInCart);
    document.getElementById("OstosKoriTouteMaaraDiv").textContent=sessionStorage.getItem("amountOfThingsInCart");
    sessionStorage.setItem(`valitsettu${tuoteIndexSession}`,tuoteIndexSession);
    let itemLista=sessionStorage.getItem("items");
    console.log(itemLista);
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

document.addEventListener("DOMContentLoaded", createSlides);
document.addEventListener("DOMContentLoaded", createInfo);

