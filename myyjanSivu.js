/**FUNKTIO MYYNTIILMOITUKSEN TEOLLE JA TÄLLE TAPAHTUMAKUUNTELIJA */
function sellBtn() {     
    let myyBtn = document.getElementById("sell");
    let sellElement = document.createElement("button");
    sellElement.id = "myydaBtn";
    sellElement.innerText = "Uusi ilmoitus";
    myyBtn.appendChild(sellElement);
    sellElement.addEventListener("click", function() {
        menuItems.classList.remove("open");
        document.getElementById("productName").value = "";
        document.getElementById("productDetail").value = "";
        document.getElementById("productDescription").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productPicture").value = "";
        previewPictures.innerHTML = '';
        document.getElementById("inValidDetails").innerText = "";
        document.getElementById("productModal").style.display = "flex";
    });
};

document.getElementById("productCloseModal").addEventListener("click", function() {
    document.getElementById("productModal").style.display = "none";
});

document.getElementById("productPrice").addEventListener("keypress", function(event) {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});

/**TAPAHTUMAKUUNTELIJA KUN KÄYTTÄJÄ LISÄÄ KUVAN MYYTÄVÄLLE TUOTTEELLE */
document.getElementById("productPicture").addEventListener("change", function(event) {
    let files = event.target.files;                       
    if (files.length > 3) {
        alert("Voit lisätä maksimissaan kolme kuvaa!");
        event.target.value = "";
        return;
    }
    let previewContainer = document.getElementById("previewPictures");
    previewContainer.innerHTML = "";

    

    Array.from(files).forEach(file => {
        let reader = new FileReader();
        reader.onload = function(e) {
            let imgPreview = document.createElement("img");
            imgPreview.src = e.target.result;
            previewContainer.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
    });
});

/**KUN KÄYTTÄJÄ JULKAISEE MYYNTITILMOITUKSENSA */
document.getElementById("publishBtn").addEventListener("click", function(event) {
    event.preventDefault();                 
    let syötettyTuote = document.getElementById("productName").value.trim();
    let syötettyLyhytKuvaus = document.getElementById("productDetail").value.trim();
    let syötettyTuoteKuvaus = document.getElementById("productDescription").value.trim();
    let syötettyHinta = document.getElementById("productPrice").value.trim();
    let syötetytKuvat = document.getElementById("productPicture").files;
    let publisher = localStorage.getItem("loggedInUser");

    if (!syötettyTuote || !syötettyLyhytKuvaus || !syötettyTuoteKuvaus || !syötettyHinta || !syötetytKuvat.length === 0) {
        document.getElementById("inValidDetails").innerText = "Kaikki kentät, mukaan lukien kuvatiedosto, on täytettävä.";
        return;
    }

    let kuvaUrls = [];
    let readers = Array.from(syötetytKuvat).map (file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(resolve => {
            reader.onload = () => resolve(reader.result);
        });
    });
    Promise.all(readers).then(results => {
        kuvaUrls.push(...results);
        let NewProduct = {
            tuoteIndex: Date.now(),
            tuoteNimi: syötettyTuote,
            kuvaUrls,
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
    });
});

document.getElementById("confirmOkBtn").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "none";
    document.getElementById("detailsModal").reset(); 
});

/**LUO OMAT ILMOITUKSET NAPIN JA AVAA PANEELIN JOSSA NÄHTÄVISSÄ OMAT JULKAISUT*/
function publishedBtn() {               
    let julkaisutBtn = document.getElementById("publishedItems");
    let publishedElement = document.createElement("button");
    publishedElement.id = "publishedBtn";
    publishedElement.innerText = "Omat ilmoitukset";
    julkaisutBtn.appendChild(publishedElement);

    publishedElement.addEventListener("click", function() {
        let menuItems = document.getElementById("menuItems");
        if (menuItems.classList.contains("open")) {
            menuItems.classList.remove("open");

            menuItems.removeEventListener("transitionend", onTransitionEnd);
            menuItems.addEventListener("transitionend", onTransitionEnd);

            function onTransitionEnd(event) {
                if (event.propertyName === "max-height") {
                    menuItems.removeEventListener("transitionend", onTransitionEnd);
                    showPublishedItems();
                    document.getElementById("publishedPanel").classList.add("open");
                }
            }
        } else {
            showPublishedItems();
            document.getElementById("publishedPanel").classList.add("open");
        }   
    });
};

document.addEventListener("DOMContentLoaded", function() {
    showPublishedItems();
});

/**NÄYTTÄÄ PANEELISSA KAIKKI OMAT JUKAISUT */
function showPublishedItems() {         
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

    /**TUOTTEEN POISTO PAINIKE JA TÄLLE TAPAHTUMAKUUNTELIJA */
    document.querySelectorAll(".deleteItemBtn").forEach(button => {     
        button.addEventListener("click", function(event) {
            event.preventDefault();
            let indexToDelete = this.getAttribute("data-index");
            deleteAd(indexToDelete);
        });
    });
};

/**FUNKTIO KUN KÄYTTÄJÄ HALUAA POISTAA OMAN JULKAISUNSA */
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

/**OMAT JULKAISET PANEELIN SULKEMISTOIMINTO */
document.getElementById("closeBtnPublish").addEventListener("click", function() {
    document.getElementById("publishedPanel").classList.remove("open");
});