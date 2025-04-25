/**TAPAHTUMAKUUNTELIJA KIRJAUDU TAI KIRJAUDU ULOS PAINIKKEELLE */
document.getElementById("logBtn").addEventListener("click", function() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("inCorrect").innerText ="";
    let loggedUser = document.getElementById("loggedUser");                 
    if (loggedUser.innerText) { /**RIIPPUEN OLLAANKO KIRJAUTUNEEN SISÄÄN VAI ULKONA */
        localStorage.removeItem("loggedInUser");
        this.innerText = "Kirjaudu";
        location.reload();
    } else {
        let menuItems = document.getElementById("menuItems");
        if (menuItems.classList.contains("open")) {
            menuItems.classList.remove("open");

            menuItems.removeEventListener("transitionend", onTransitionEnd);

            menuItems.addEventListener("transitionend", onTransitionEnd);

            function onTransitionEnd(event) {
                if (event.propertyName == "max-height") {
                    menuItems.removeEventListener("transitionend", onTransitionEnd);
                    document.getElementById("loginPanel").classList.add("open");
                }
            }
        } else {
            document.getElementById("loginPanel").classList.add("open");
        }
        
        
    } 
});

/**TAPAHTUMAKUUNTELIJA KIRJAUTUMISPANEELIN SULKEMISELLE */
document.getElementById("closeBtn").addEventListener("click", function() {  
    document.getElementById("loginPanel").classList.remove("open");
});

/**TAPAHTUMAKUUNTELIJA REKISTERÖITYMIS MODAALIN AUKAISEMISELLE*/
document.getElementById("openModal").addEventListener("click", function() {    
    document.getElementById("modal").style.display = "flex";
    document.getElementById("loginPanel").classList.remove("open");
    document.getElementById("inValidRegister").innerText = "";
});

/**TAPAHTUMAKUUNTELIJA REKISTERÖITYMIS MODAALIN SULKEMISELLE*/
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});

/**TAPAHTUMAKUUNTELIJA REKISTERÖIDY PAINIKKEELLE */
document.getElementById("registerBtn").addEventListener("click", function(event) {  
    event.preventDefault();
    registerUser();
});

/**TAPAHTUMAKUUNTELIJA SISÄÄNKIRJAUTUMISELLE */
document.getElementById("loginBtn").addEventListener("click", function(event) {     
    event.preventDefault();
    loginUser();
});

function registerUser() {
    let syötettyKäyttäjänimi = document.getElementById("newUsername").value;
    let syötettySalasana = document.getElementById("newPassword").value;

    /**TARKASTAA ONKO KÄYTTÄJÄ SYÖTTÄNYT REKISTERÖINTI INPUT KENTTIIN ARVOJA */
    if (syötettyKäyttäjänimi.length > 0 && syötettySalasana.length > 0) {
        let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

        /**VARMISTAA ETTÄ LOCAL STORAGEEN ON AINA TALLENNETTU TAULUKKOJA */
        if (!Array.isArray(storedUsers)) {          
            storedUsers = [];
        }

        /**TARKASTAA ONKO SAMANNIMISTÄ KÄYTTÄJÄNIMEÄ VIELÄ LUOTU */
        let userNameInUse = storedUsers.some(user => user.name === syötettyKäyttäjänimi);
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

/**TALLENTAA LOCAL STORAGEEN KÄYTTÄJÄN SYÖTTÄMÄN KÄYTTÄJÄNIMEN JA SALASANAN */
function saveUser(username, password) {         
    let users = JSON.parse(localStorage.getItem("userData")) || [];
    if (!Array.isArray(users)) {
        users = [];
    }
    users.push({name: username, password: password});
    localStorage.setItem("userData", JSON.stringify(users));
};

/**SISÄÄNKIRJAUTMISFUNKTIO */
function loginUser() {                      
    let loginUsername = document.getElementById("username").value;
    let loginPassword = document.getElementById("password").value;
    let container = document.querySelector(".container");

    let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

    let käyttäjä = storedUsers.find(user => user.name === loginUsername);

    /**TARKASTAA ETTÄ KÄYTTÄJÄNIMI ON REKISTERÖITY JA SALASANA VASTAA SYÖTETTYÄ */
    if (käyttäjä && loginPassword === käyttäjä.password) {      
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

