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
