document.getElementById("logBtn").addEventListener("click", function() {    /**TAPAHTUMAKUUNTELIJA KIRJAUDU TAI KIRJAUDU ULOS PAINIKKEELLE */
    document.getElementById("inCorrect").innerText ="";
    let loggedUser = document.getElementById("loggedUser");                 /**RIIPPUEN OLLAANKO KIRJAUTUNEEN SISÄÄN VAI ULKONA */
    if (loggedUser.innerText) {
        localStorage.removeItem("loggedInUser");
        this.innerText = "Kirjaudu";
        location.reload();
    } else {
        document.getElementById("loginPanel").classList.add("open");
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

    let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

    console.log("Kirjautumisen käyttäjänimi:", loginUsername);
    console.log("Tallennetut käyttäjät:", storedUsers);

    let käyttäjä = storedUsers.find(user => user.name === loginUsername);

    if (käyttäjä && loginPassword === käyttäjä.password) {      /**TARKASTAA ETTÄ KÄYTTÄJÄNIMI ON REKISTERÖITY JA SALASANA VASTAA SYÖTETTYÄ */
        document.getElementById("loggedUser").innerText = "Tervetuloa " + loginUsername + "!";
        document.getElementById("loginPanel").classList.remove("open");
        localStorage.setItem("loggedInUser", loginUsername);
        document.getElementById("logBtn").innerText = "Kirjaudu ulos";
    } else {
        document.getElementById("inCorrect").innerText = "Virheellinen käyttäjänimi tai salasana.";
    }
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

function luodaTavaraLista() {
    let x=0;//Tavaran index
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                kauppaContainer.innerHTML += `
                    <div onclick="valitaTuote(${x})" class="card">
                        <img id="tuoteKuva" src="${element.kuvaUrl}" />
                        <h2>${element.tuoteNimi}</h2>
                        <p>${element.tuoteKuvaus}</p>
                        <h2>${element.tuoteHinta} €</h2>
                    </div>
                `;
                x++
            });
        });
}

luodaTavaraLista();

function myydaTuote() {
    window.open("myyjanSivu.html");
}

document.getElementById("myydaBtn").addEventListener("click", function() {
    document.getElementById("productName").value = "";
    document.getElementById("productDetail").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productPicture").value = "";
    previewPicture.innerHTML = '';
    document.getElementById("inValidDetails").innerText = "";
    document.getElementById("productModal").style.display = "flex";
});

document.getElementById("productCloseModal").addEventListener("click", function() {
    document.getElementById("productModal").style.display = "none";
});

document.getElementById("productPrice").addEventListener("keypress", function(event) {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});

document.getElementById("productPicture").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let previewPicture = document.getElementById("previewPicture");
            previewPicture.innerHTML = '';
            let imgPreview = document.createElement("img");
            imgPreview.src = e.target.result;
            imgPreview.style.maxWidth = "200px";
            previewPicture.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("publishBtn").addEventListener("click", function(event) {
    event.preventDefault();
    let syötettyTuote = document.getElementById("productName").value.trim();
    let syötettyLyhytKuvaus = document.getElementById("productDetail").value.trim();
    let syötettyTuoteKuvaus = document.getElementById("productDescription").value.trim();
    let syötettyHinta = document.getElementById("productPrice").value.trim();
    let syötettyKuva = document.getElementById("productPicture").files[0];

    if (!syötettyTuote || !syötettyLyhytKuvaus || !syötettyTuoteKuvaus || !syötettyHinta || !syötettyKuva) {
        document.getElementById("inValidDetails").innerText = "Kaikki kentät, mukaan lukien kuvatiedosto, on täytettävä.";
        return;
    }

    let NewProduct = {
        tuoteIndex: Date.now(),
        tuoteNimi: syötettyTuote,
        kuvaUrl: URL.createObjectURL(syötettyKuva),
        tuoteKuvausLyhyt: syötettyLyhytKuvaus,
        tuoteKuvausPitka: syötettyTuoteKuvaus,
        tuoteHinta: Number(syötettyHinta),
        onkoOstoskorissa: false
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(NewProduct);
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("inValidDetails").textContent = "";
    document.getElementById("productModal").style.display = "none";
    document.getElementById("confirmationModal").style.display = "block";

    showProducts();
});

document.getElementById("confirmOkBtn").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "none";
    document.getElementById("detailsModal").reset(); 
});

function getJsonProducts() {
    fetch("./tavaraLista.json")
        .then(res => res.json())
        .then(data => {
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products = [...data, ...products];
            localStorage.setItem("products", JSON.stringify(products));
            showProducts();
        })
        .catch(error => console.error("Virhe JSON-tiedoston latauksessa:", error));
};

function showProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productList = document.getElementById("kauppaContainer");

    kauppaContainer.innerHTML = "";
    

    let x = 0;

    products.forEach((element) => {
        productElement = document.createElement("div");
        productElement.innerHTML = `
            <div onclick="valitaTuote(${x})" class="card">
                <img id="tuoteKuva" src="${element.kuvaUrl}" />
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
window.onload = function() {
    getJsonProducts();
    showProducts();
};

localStorage.clear();
