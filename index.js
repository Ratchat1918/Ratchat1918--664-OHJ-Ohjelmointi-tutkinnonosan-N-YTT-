document.getElementById("loginBtn").addEventListener("click", function() {
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
    checkPasswordUsername();
});

function checkPasswordUsername() {
    console.log("tarkasta käyttis salasana");
    let syötettyKäyttäjänimi = document.getElementById("newUsername").value;
    let syötettySalasana = document.getElementById("newPassword").value;

    if (syötettyKäyttäjänimi.length > 0 && syötettySalasana.length > 0) {
        alert("Tili luotu onnistuneesti.");
        document.getElementById("modal").style.display = "none";
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
    } else {
        alert("Käyttäjänimi tai salasana on virheellinen.");
    }
};

function valitaTuote() {
    location.replace("imoitus.html");
}

const kauppaContainer = document.getElementById("kauppaContainer");

function luodaTavaraLista() {
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                kauppaContainer.innerHTML += `
                    <div onclick="valitaTuote()" class="card">
                        <img id="tuoteKuva" src="${element.kuvaUrl}" />
                        <h2>${element.tuoteNimi}</h2>
                        <p>${element.tuoteKuvaus}</p>
                        <h2>${element.tuoteHinta} €</h2>
                    </div>
                `;
            });
        });
}

luodaTavaraLista();
