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
                        <h2>${element.tuoteHinta}</h2>
                    </div>
                `;
            });
        });
}

luodaTavaraLista();
