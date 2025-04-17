document.getElementById("myydaBtn").addEventListener("click", function() {
    document.getElementById("productName").value = "";
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
    let syötettyTuoteKuvaus = document.getElementById("productDescription").value.trim();
    let syötettyHinta = document.getElementById("productPrice").value.trim();
    let syötettyKuva = document.getElementById("productPicture").files[0];

    if (!syötettyTuote || !syötettyTuoteKuvaus || !syötettyHinta || !syötettyKuva) {
        document.getElementById("inValidDetails").innerText = "Kaikki kentät, mukaan lukien kuvatiedosto, on täytettävä.";
        return;
    }

    let NewProduct = {
        tuoteNumero: Date.now(),
        tuoteNimi: syötettyTuote,
        kuvaUrl: URL.createObjectURL(syötettyKuva),
        tuoteKuvaus: syötettyTuoteKuvaus,
        tuoteHinta: Number(syötettyHinta),
        onkoOstoskorissa: false
    };

    document.getElementById("inValidDetails").textContent = "";
    document.getElementById("productModal").style.display = "none";
    document.getElementById("confirmationModal").style.display = "block";
});

document.getElementById("confirmOkBtn").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "none";
    document.getElementById("detailsModal").reset(); 
});