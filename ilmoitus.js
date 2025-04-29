let tuoteIndexSession = Number(sessionStorage.getItem("tuoteIndex"));
let imgNum = 1;
let slideIndex = 0;
let intervalId;
let dataLength;
let amountOfThingsInCart=0;
document.getElementById("tuoteMaara").innerHTML=JSON.parse(localStorage.getItem("itemIndexCart")).length;

function createSlides() {
    const slidesContainer = document.getElementsByClassName("slides")[0];
    slidesContainer.innerHTML = "";
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            dataLength=data.length;
            data.forEach(element => {
                if (element.tuoteIndex === tuoteIndexSession) {
                    element.kuvaUrls.forEach(imgUrl => {
                        slidesContainer.innerHTML += `<img class="slide" src="${imgUrl}" alt="Image #${imgNum}">`;
                        imgNum++;
                    });
                    initializeSlider();
                }
            });
            if(tuoteIndexSession>dataLength-1){
                let products = JSON.parse(localStorage.getItem("products")) || [];
                products.forEach(element => {
                    if(element.tuoteIndex===tuoteIndexSession){
                        slidesContainer.innerHTML += `<img class="slide" src="${element.kuvaUrls}">`;
                    }
                    initializeSlider();
                });
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
            console.log(products)
            products.forEach(element => {
                if(element.tuoteIndex===tuoteIndexSession){
                    document.getElementById("titleIlmoitus").textContent=element.tuoteNimi;
                    document.getElementById("nimiH1").textContent=element.tuoteNimi;
                    document.getElementById("tuoteHintaH1").textContent=`${element.tuoteHinta} €`;
                    document.getElementById("tuoteInfoP").textContent=element.tuoteKuvausPitka;
                }
            });
        }
    });
}
function addToCart(){
    document.getElementById("tuoteMaara").innerHTML=JSON.parse(localStorage.getItem("itemIndexCart")).length;
    let valitsettuTuoteLista=JSON.parse(localStorage.getItem("itemIndexCart"));
    if(valitsettuTuoteLista.includes(tuoteIndexSession)===false){
        amountOfThingsInCart++;
        valitsettuTuoteLista.push(tuoteIndexSession);
    }else{
        window.alert("Tuote on jo ostoskorissa");
    }
    localStorage.setItem("itemIndexCart",JSON.stringify(valitsettuTuoteLista));
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

/**AVAA OSTOSKORINÄKYMÄN */
function openChart() {
    let menuItems = document.getElementById("menuItems");
    let shoppingPanel = document.getElementById("shoppingChartPanel");

    if (menuItems.classList.contains("open")) {
        menuItems.classList.remove("open");
        menuItems.removeEventListener("transitionend", onTransitionEnd);
        menuItems.addEventListener("transitionend", onTransitionEnd);

        function onTransitionEnd(event) {
            if (event.propertyName === "max-height") {
                menuItems.removeEventListener("transitionend", onTransitionEnd);
                shoppingPanel.style.right = "0px";
            }
        }
    } else {
        shoppingPanel.style.right = "0px";
    }
};

function openMainPage(){
    window.location.replace("index.html");
}
/**SULKEE OSTOSKORINÄKYMÄN */
function closeShoppingPanel() {
    let shoppingPanel = document.getElementById("shoppingChartPanel");
    shoppingPanel.style.right = "-295px";
};

