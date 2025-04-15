document.getElementById("logBtn").addEventListener("click", function() {
    document.getElementById("inCorrect").innerText = "";
    document.getElementById("loginPanel").classList.add("open");
});
document.getElementById("closeBtn").addEventListener("click", function() {
    document.getElementById("loginPanel").classList.remove("open");
});

document.getElementById("openModal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("loginPanel").classList.remove("open");
});
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});

document.getElementById("registerBtn").addEventListener("click", function() {
    event.preventDefault();
    registerUser();
});

document.getElementById("loginBtn").addEventListener("click", function() {
    event.preventDefault();
    loginUser();
});

function registerUser() {
    let syötettyKäyttäjänimi = document.getElementById("newUsername").value;
    let syötettySalasana = document.getElementById("newPassword").value;

    if (syötettyKäyttäjänimi.length > 0 && syötettySalasana.length > 0) {
        alert("Tili luotu onnistuneesti.");
        saveUser(syötettyKäyttäjänimi, syötettySalasana);
        document.getElementById("modal").style.display = "none";
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
    } else {
        alert("Käyttäjänimi tai salasana on virheellinen.");
    }
};

<<<<<<< HEAD
function saveUser(username, password) {
    let user = {name: username, password: password};
    localStorage.setItem("userData", JSON.stringify(user));
};

function loginUser() {
    let loginUsername = document.getElementById("username").value;
    let loginPassword = document.getElementById("password").value;

    let storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
        if (loginUsername === storedUserData.name && loginPassword === storedUserData.password) {
            document.getElementById("loggedUser").innerText = "Tervetuloa " + loginUsername + "!";
            document.getElementById("loginPanel").classList.remove("open");
        } else {
            document.getElementById("inCorrect").innerText = "Virheellinen käyttäjänimi tai salasana."
        }
    }
};
=======
function myydaTuote(){
    window.open('myyjanSivu.html');
}
>>>>>>> 37724c3b81be46dff7b4a04556d020db13e29949

function valitaTuote(tavaraIndex) {
    //document.getElementById("tuodenSivuTitle").textContent=`sdfsdg`;
    console.log(tavaraIndex);
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
