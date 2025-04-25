const menuItems = document.getElementById("menuItems");

/**TOGGLER VALIKOLLE TAPAHTUMAKUUNTELIJA */
document.getElementById("menuToggler").addEventListener("click", function() {
    let menuItems = document.getElementById("menuItems");
    if (menuItems.style.display === "flex" || menuItems.style.top === "100%") {
        menuItems.style.display = "none";
        menuItems.style.top = "-200px";
    } else {
        menuItems.style.display = "flex";
        menuItems.style.top = "100%";
    }
});

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
                tuoteIndex:product.tuoteIndex || Date.now() + Math.random()   
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
    

    let x = 0;

    products.forEach((element) => {
        productElement = document.createElement("div");
        productElement.innerHTML = `
            <div onclick="valitaTuote(${x})" class="card">
                <img id="tuoteKuva" src="${element.kuvaUrls[0]}"/>
                <h2>${element.tuoteNimi}</h2>
                <p>${element.tuoteKuvausLyhyt}</p>
                <p>${element.tuoteKuvausPitka}</p>
                <h2>${element.tuoteHinta} €</h2>
            </div>
        `;
        productList.appendChild(productElement);
        x++;
    });
}

/**AVAA OSTOSKORINÄKYMÄN */
function openChart() {
    menuItems.style.display = "none";
    let shoppingPanel = document.getElementById("shoppingChartPanel");
        shoppingPanel.style.right = "0px";
};

/**SULKEE OSTOSKORINÄKYMÄN */
function closeShoppingPanel() {
    let shoppingPanel = document.getElementById("shoppingChartPanel");
    shoppingPanel.style.right = "-295px";
};

window.onload = function() {
    getJsonProducts();
    showProducts();
};

//localStorage.clear();
