if(localStorage.getItem("itemIndexCart")===null){
    localStorage.setItem("itemIndexCart",JSON.stringify([]));/**LOUDA OSTOSKORIN LISTA */
}
let tuodetOstoskorissa=JSON.parse(localStorage.getItem("itemIndexCart"));
document.getElementById('tuoteMaara').innerHTML=tuodetOstoskorissa.length;

const menuItems = document.getElementById("menuItems");

document.addEventListener("DOMContentLoaded", function() {
    let menuItems = document.getElementById("menuItems");
    menuItems.classList.remove("open");
});

/**TOGGLER VALIKOLLE TAPAHTUMAKUUNTELIJA */
document.getElementById("menuToggler").addEventListener("click", function() {
    let menuItems = document.getElementById("menuItems");
    menuItems.classList.toggle("open");
});

/**AUKAISEE OSTOSKORIPANEELIN */
document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container");
    container.style.display = "none";
});

/**TARKASTAA ONKO KÄYTTÄJÄ KIRJAUTUNUT */
window.onload = function() {     
    let loggedInUser = localStorage.getItem("loggedInUser");

    /**KÄYTTÄJÄ KIRJAUTUNUT NIIN SIITÄ ON ILMOITUS NAVISSA */
    if (loggedInUser) {         
        document.getElementById("logBtn").innerText = "Kirjaudu ulos";
        document.getElementById("loggedUser").innerText = "Tervetuloa " + loggedInUser + "!";
    }
};

function valitaTuote(tavaraIndex) {
    //document.getElementById("tuodenSivuTitle").textContent=`sdfsdg`;
    sessionStorage.setItem("tuoteIndex",tavaraIndex);
    window.open('imoitus.html');
}

const kauppaContainer = document.getElementById("kauppaContainer");

function myydaTuote() {
    window.open("myyjanSivu.html");
}

/**HAKEE VALMIIKSI LISÄTYT TIEDOT JSON TIEDOSTOSTA JA TALLENTAA NE LOCALSTORAGEEN */
function getJsonProducts() {            
let storedProducts = localStorage.getItem("products");
if (storedProducts) {
    showProducts();
    return;
    }

    fetch("./tavaraLista.json")
        .then(res => res.json())
        .then(data => {
            let existingProducts = JSON.parse(localStorage.getItem("products")) || [];
            let products = [...existingProducts, ...data.map(product => ({
                ...product,
                tuoteIndex:product.tuoteIndex || 0  
            }))];
            localStorage.setItem("products", JSON.stringify(products));
            showProducts();
        })
        .catch(error => console.error("Virhe JSON-tiedoston latauksessa:", error));
};

/**NÄYTTÄÄ KAIKKI TUOTTEET LOCALSTORAGESTA */
function showProducts() {               
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productList = document.getElementById("kauppaContainer");

    kauppaContainer.innerHTML = "";

    products.forEach((element) => {
        productElement = document.createElement("div");
        productElement.innerHTML = `
            <div onclick="valitaTuote(${element.tuoteIndex})" class="card">
                <img id="tuoteKuva" src="${element.kuvaUrls[0]}"/>
                <h2>${element.tuoteNimi}</h2>
                <p>${element.tuoteKuvausLyhyt}</p>
                <h2>${element.tuoteHinta} €</h2>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

/**AVAA OSTOSKORINÄKYMÄN */
function openChart() {
    let menuItems = document.getElementById("menuItems");
    let shoppingPanel = document.getElementById("shoppingChartPanel");

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let ostosKoriSumma=0;
    let ostoskoriStr=``;
    products.forEach((element)=>{
        if(tuodetOstoskorissa.includes(element.tuoteIndex)){
            ostosKoriSumma+=element.tuoteHinta;
            ostoskoriStr+=`<div class="cartCard">
            <p>${element.tuoteNimi}</p>
            <img id='ostoskoriTuoteImg' src='${element.kuvaUrls[0]}'></img>
            <p>${element.tuoteKuvausLyhyt}</p>
            <p>${element.tuoteHinta} €</p>
            <img onclick='poistaKorista(${element.tuoteIndex})' id='poistaImg' src="kuvat/trash-can-svgrepo-com.svg">
            </div>`;
        }
    });
    shoppingPanel.innerHTML+=`${ostoskoriStr}`;
    shoppingPanel.innerHTML+=`<h2>${tuodetOstoskorissa.length} tuotetta, yhteensä ${ostosKoriSumma} €</h2>
        <button onclick="checkOut()" id="checkOutBtn">Siirry kassalle =></button>`;
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

function poistaKorista(poistaId){
    let shoppingPanel = document.getElementById("shoppingChartPanel");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let ostosKoriSumma=0;
    let ostoskoriStr=``;
    let valitsettuTuoteNyt=[];
    shoppingPanel.innerHTML=`<span id="closeBtnShopping" onclick="closeShoppingPanel()">&times;</span><h2>Ostoskori</h2>`;
    products.forEach((element)=>{//POSITETAAN POISTETTAVAN TUODEN 
        if(tuodetOstoskorissa.includes(element.tuoteIndex)){
            if(element.tuoteIndex!=poistaId){
                valitsettuTuoteNyt.push(element.tuoteIndex);
            }
        }
    });
    localStorage.setItem("itemIndexCart",JSON.stringify(valitsettuTuoteNyt));
    ostosKoriSumma=0;
    tuodetOstoskorissa=JSON.parse(localStorage.getItem("itemIndexCart"));
    document.getElementById('tuoteMaara').innerHTML=tuodetOstoskorissa.length;
    products.forEach((element)=>{
        if(tuodetOstoskorissa.includes(element.tuoteIndex)){
            ostosKoriSumma+=element.tuoteHinta;
            ostoskoriStr+=`<div class="cartCard">
            <p>${element.tuoteNimi}</p>
            <img id='ostoskoriTuoteImg' src='${element.kuvaUrls[0]}'></img>
            <p>${element.tuoteKuvausLyhyt}</p>
            <p>${element.tuoteHinta} €</p>
            <img onclick='poistaKorista(${element.tuoteIndex})' id='poistaImg' src="kuvat/trash-can-svgrepo-com.svg"></div>`;
        }
    });
    shoppingPanel.innerHTML+=`${ostoskoriStr}`;
    shoppingPanel.innerHTML+=`<h2>${tuodetOstoskorissa.length} tuotetta, yhteensä ${ostosKoriSumma} €</h2>
    <button onclick="checkOut()" id="checkOutBtn">Siirry kassalle =></button>`;
}

/**SULKEE OSTOSKORINÄKYMÄN */
function closeShoppingPanel() {
    let shoppingPanel = document.getElementById("shoppingChartPanel");
    shoppingPanel.innerHTML=`<span id="closeBtnShopping" onclick="closeShoppingPanel()">&times;</span><h2>Ostoskori</h2>`;
    shoppingPanel.style.right = "-495px";
};

function openMainPage(){
    window.open('index.html');
}

window.onload = function() {
    getJsonProducts();
    showProducts();
};

//localStorage.clear();

