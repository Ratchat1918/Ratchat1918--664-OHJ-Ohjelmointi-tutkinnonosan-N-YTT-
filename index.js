const menuItems = document.getElementById("menuItems");

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

document.getElementById("logBtn").addEventListener("click", function() {    /**TAPAHTUMAKUUNTELIJA KIRJAUDU TAI KIRJAUDU ULOS PAINIKKEELLE */
    document.getElementById("inCorrect").innerText ="";
    let loggedUser = document.getElementById("loggedUser");                 /**RIIPPUEN OLLAANKO KIRJAUTUNEEN SISÄÄN VAI ULKONA */
    if (loggedUser.innerText) {
        localStorage.removeItem("loggedInUser");
        this.innerText = "Kirjaudu";
        location.reload();
    } else {
        document.getElementById("loginPanel").classList.add("open");
        menuItems.style.display = "none";
    } 
});

document.getElementById("closeBtn").addEventListener("click", function() {  /**TAPAHTUMAKUUNTELIJA KIRJAUTUMISPANEELIN SULKEMISELLE */
    document.getElementById("loginPanel").classList.remove("open");
});

document.getElementById("openModal").addEventListener("click", function() {    /**TAPAHTUMAKUUNTELIJA REKISTERÖITYMIS MODAALIN AUKAISEMISELLE*/
    document.getElementById("modal").style.display = "flex";
    document.getElementById("loginPanel").classList.remove("open");
    document.getElementById("inValidRegister").innerText = "";
});

document.getElementById("closeModal").addEventListener("click", function() {    /**TAPAHTUMAKUUNTELIJA REKISTERÖITYMIS MODAALIN SULKEMISELLE*/
    document.getElementById("modal").style.display = "none";
});

document.getElementById("registerBtn").addEventListener("click", function(event) {  /**TAPAHTUMAKUUNTELIJA REKISTERÖIDY PAINIKKEELLE */
    event.preventDefault();
    registerUser();
});

document.getElementById("loginBtn").addEventListener("click", function(event) {     /**TAPAHTUMAKUUNTELIJA SISÄÄNKIRJAUTUMISELLE */
    event.preventDefault();
    loginUser();
});

function registerUser() {
    let syötettyKäyttäjänimi = document.getElementById("newUsername").value;
    let syötettySalasana = document.getElementById("newPassword").value;

    if (syötettyKäyttäjänimi.length > 0 && syötettySalasana.length > 0) {   /**TARKASTAA ONKO KÄYTTÄJÄ SYÖTTÄNYT REKISTERÖINTI INPUT KENTTIIN ARVOJA */
        let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

        if (!Array.isArray(storedUsers)) {          /**VARMISTAA ETTÄ LOCAL STORAGEEN ON AINA TALLENNETTU TAULUKKOJA */
            storedUsers = [];
        }

        let userNameInUse = storedUsers.some(user => user.name === syötettyKäyttäjänimi);   /**TARKASTAA ONKO SAMANNIMISTÄ KÄYTTÄJÄNIMEÄ VIELÄ LUOTU */
        if (userNameInUse) {
            document.getElementById("inValidRegister").innerText = `Käyttäjänimi "${syötettyKäyttäjänimi}" on jo käytössä, valitse toinen.`;
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
        } else {
            alert("Tili luotu onnistuneesti!");
            saveUser(syötettyKäyttäjänimi, syötettySalasana);
            document.getElementById("modal").style.display = "none";
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
        }
    } else {
        document.getElementById("inValidRegister").innerText = "Käyttäjänimi tai salasana on virheellinen."
    }
};

function saveUser(username, password) {         /**TALLENTAA LOCAL STORAGEEN KÄYTTÄJÄN SYÖTTÄMÄN KÄYTTÄJÄNIMEN JA SALASANAN */
    let users = JSON.parse(localStorage.getItem("userData")) || [];
    if (!Array.isArray(users)) {
        users = [];
    }
    users.push({name: username, password: password});
    localStorage.setItem("userData", JSON.stringify(users));
};

function loginUser() {                      /**SISÄÄNKIRJAUTMISFUNKTIO */
    let loginUsername = document.getElementById("username").value;
    let loginPassword = document.getElementById("password").value;
    let container = document.querySelector(".container");

    let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

    let käyttäjä = storedUsers.find(user => user.name === loginUsername);

    if (käyttäjä && loginPassword === käyttäjä.password) {      /**TARKASTAA ETTÄ KÄYTTÄJÄNIMI ON REKISTERÖITY JA SALASANA VASTAA SYÖTETTYÄ */
        document.getElementById("loggedUser").innerText = "Tervetuloa " + loginUsername + "!";
        document.getElementById("loginPanel").classList.remove("open");
        localStorage.setItem("loggedInUser", loginUsername);
        document.getElementById("logBtn").innerText = "Kirjaudu ulos";
        container.style.display = "block";
        sellBtn();
        publishedBtn();
    } else {
        document.getElementById("inCorrect").innerText = "Virheellinen käyttäjänimi tai salasana.";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container");
    container.style.display = "none";
});

function sellBtn() {                    /**FUNKTIO MYYNTIILMOITUKSEN TEOLLE JA TÄLLE TAPAHTUMAKUUNTELIJA */
    let myyBtn = document.getElementById("sell");
    let sellElement = document.createElement("button");
    sellElement.id = "myydaBtn";
    sellElement.innerText = "Myy";
    myyBtn.appendChild(sellElement);
    sellElement.addEventListener("click", function() {
        menuItems.style.display = "none";
        document.getElementById("productName").value = "";
        document.getElementById("productDetail").value = "";
        document.getElementById("productDescription").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productPicture").value = "";
        previewPicture.innerHTML = '';
        document.getElementById("inValidDetails").innerText = "";
        document.getElementById("productModal").style.display = "flex";
    });
};

window.onload = function() {     /**TARKASTAA ONKO KÄYTTÄJÄ KIRJAUTUNUT */
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {         /**KÄYTTÄJÄ KIRJAUTUNUT NIIN SIITÄ ON ILMOITUS NAVISSA */
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

document.getElementById("productCloseModal").addEventListener("click", function() {
    document.getElementById("productModal").style.display = "none";
});

document.getElementById("productPrice").addEventListener("keypress", function(event) {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});

document.getElementById("productPicture").addEventListener("change", function(event) {
    let file = event.target.files[0];                       /**TAPAHTUMAKUUNTELIJA KUN KÄYTTÄJÄ LISÄÄ KUVAN MYYTÄVÄLLE TUOTTEELLE */
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let previewPicture = document.getElementById("previewPicture");
            previewPicture.innerHTML = '';
            let imgPreview = document.createElement("img");
            imgPreview.src = e.target.result;
            imgPreview.style.maxWidth = "100px";
            imgPreview.style.maxHeight = "180px";
            previewPicture.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("publishBtn").addEventListener("click", function(event) {
    event.preventDefault();                 /**KUN KÄYTTÄJÄ JULKAISEE MYYNTITILMOITUKSENSA */
    let syötettyTuote = document.getElementById("productName").value.trim();
    let syötettyLyhytKuvaus = document.getElementById("productDetail").value.trim();
    let syötettyTuoteKuvaus = document.getElementById("productDescription").value.trim();
    let syötettyHinta = document.getElementById("productPrice").value.trim();
    let syötettyKuva = document.getElementById("productPicture").files[0];
    let publisher = localStorage.getItem("loggedInUser");

    if (!syötettyTuote || !syötettyLyhytKuvaus || !syötettyTuoteKuvaus || !syötettyHinta || !syötettyKuva) {
        document.getElementById("inValidDetails").innerText = "Kaikki kentät, mukaan lukien kuvatiedosto, on täytettävä.";
        return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(syötettyKuva);
    reader.onload = function() {
        let NewProduct = {
            tuoteIndex: Date.now(),
            tuoteNimi: syötettyTuote,
            kuvaUrl: reader.result,
            tuoteKuvausLyhyt: syötettyLyhytKuvaus,
            tuoteKuvausPitka: syötettyTuoteKuvaus,
            tuoteHinta: Number(syötettyHinta),
            onkoOstoskorissa: false,
            tuotteenJulkaisija: publisher
        };
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(NewProduct);
        localStorage.setItem("products", JSON.stringify(products));

        document.getElementById("inValidDetails").textContent = "";
        document.getElementById("productModal").style.display = "none";
        document.getElementById("confirmationModal").style.display = "block";

        showProducts();
    };
});

document.getElementById("confirmOkBtn").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "none";
    document.getElementById("detailsModal").reset(); 
});

function getJsonProducts() {            /**HAKEE VALMIIKSI LISÄTYT TIEDOT JSON TIEDOSTOSTA JA TALLENTAA NE LOCALSTORAGEEN */
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

function showProducts() {               /**NÄYTTÄÄ KAIKKI TUOTTEET LOCALSTORAGESTA */
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productList = document.getElementById("kauppaContainer");

    kauppaContainer.innerHTML = "";
    

    let x = 0;

    products.forEach((element) => {
        productElement = document.createElement("div");
        productElement.innerHTML = `
            <div onclick="valitaTuote(${x})" class="card">
                <img id="tuoteKuva" src="${element.kuvaUrl[0]}" />
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

function publishedBtn() {               /**LUO OMAT ILMOITUKSET NAPIN JA AVAA PANEELIN JOSSA NÄHTÄVISSÄ OMAT JULKAISUT*/
    let julkaisutBtn = document.getElementById("publishedItems");
    let publishedElement = document.createElement("button");
    publishedElement.id = "publishedBtn";
    publishedElement.innerText = "Omat ilmoitukset";
    julkaisutBtn.appendChild(publishedElement);

    publishedElement.addEventListener("click", function() {
        menuItems.style.display = "none";
        showPublishedItems();
        document.getElementById("publishedPanel").classList.add("open");
    });
};
document.addEventListener("DOMContentLoaded", function() {
    showPublishedItems();
});
function showPublishedItems() {         /**NÄYTTÄÄ PANEELISSA KAIKKI OMAT JUKAISUT */
    let publisher = localStorage.getItem("loggedInUser");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let formPanel = document.querySelector("#publishedForm");

    formPanel.innerHTML = "";

    let userProducts = products.filter(product => product.tuotteenJulkaisija === publisher);

    if (userProducts.length === 0) {
        formPanel.innerHTML = "<p>Ei julkaistuja ilmoituksia.</p>";
        return;
    }
    userProducts.forEach((product) => {
        let productElement = document.createElement("div");
        productElement.classList.add("published-item");
        productElement.innerHTML = `
            <p><strong>${product.tuoteNimi}</strong></p>
            <p>Hinta: ${product.tuoteHinta} €</p>
            <button class="deleteItemBtn" data-index="${product.tuoteIndex}">🗑️</button>
        `;
        formPanel.appendChild(productElement);
    });
    document.querySelectorAll(".deleteItemBtn").forEach(button => {     /**TUOTTEEN POISTO PAINIKE JA TÄLLE TAPAHTUMAKUUNTELIJA */
        button.addEventListener("click", function(event) {
            event.preventDefault();
            let indexToDelete = this.getAttribute("data-index");
            deleteAd(indexToDelete);
        });
    });
};

function deleteAd(indexToDelete) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productToDelete = products.find(product => product.tuoteIndex == indexToDelete);
    let confirmDeleteMod = document.getElementById("confirmDeleteModal");
    confirmDeleteMod.style.display = "block";
    let modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.style.display = "block";
    let deleteText = confirmDeleteMod.querySelector(".confirmDeleteText");
    deleteText.textContent = `Haluatko varmasti poistaa ilmoituksen "${productToDelete.tuoteNimi}"?`;
    let deleteBtn = confirmDeleteMod.querySelector(".yesDelete");
    let cancelDeleteBtn = confirmDeleteMod.querySelector(".noDelete");

    deleteBtn.onclick = function() {
        products = products.filter(product => product.tuoteIndex != indexToDelete);
        localStorage.setItem("products", JSON.stringify(products));
        showProducts();
        showPublishedItems();
        confirmDeleteMod.style.display = "none";
        modalOverlay.style.display = "none";
    };
    cancelDeleteBtn.onclick = function() {
        confirmDeleteMod.style.display = "none";
        modalOverlay.style.display = "none";
    };
    
};

document.getElementById("closeBtnPublish").addEventListener("click", function() {
    document.getElementById("publishedPanel").classList.remove("open");
});

function openChart() {
    menuItems.style.display = "none";
    let shoppingPanel = document.getElementById("shoppingChartPanel");
        shoppingPanel.style.right = "0px";
};

function closeShoppingPanel() {
    let shoppingPanel = document.getElementById("shoppingChartPanel");
    shoppingPanel.style.right = "-295px";
};

window.onload = function() {
    getJsonProducts();
    showProducts();
};

//localStorage.clear();
