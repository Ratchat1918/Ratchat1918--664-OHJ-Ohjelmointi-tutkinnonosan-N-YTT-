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

//luodaTavaraLista();

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