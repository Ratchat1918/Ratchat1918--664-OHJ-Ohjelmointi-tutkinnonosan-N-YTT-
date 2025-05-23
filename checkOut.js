function checkOut() {
    document.getElementById("checkOutModal").style.display = "flex";
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("postcode").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phonenumber").value = "";
    let radios = document.querySelectorAll(`input[type="radio"]`);
    radios.forEach(radio => {
        radio.checked = false;
    });
    document.getElementById("cardHolder").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("expDate").value = "";
    document.getElementById("securityCode").value = "";
}

document.getElementById("checkOutCloseBtn").addEventListener("click", function() {
    document.getElementById("checkOutModal").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
    let confirmButton = document.getElementById("confirmOrder");
    confirmButton.addEventListener("click", function(event) {
            let visaChecked = document.getElementById("visacard").checked;
            let masterChecked = document.getElementById("mastercard").checked;
            if (!visaChecked && !masterChecked) {
                event.preventDefault();
                alert("Valitse maksutapa: Visa tai Mastercard.");
            }
        });
});

document.getElementById("securityCode").addEventListener("input", function(event) {
    let securityInput = event.target;
    if (securityInput.value.length > 3) {
        securityInput.value = securityInput.value.slice(0, 3);
    }
});

document.getElementById("confirmOrder").addEventListener("click", function() {
    ostosKoriSumma=0;
    let tuodetOstoskorissa=JSON.parse(localStorage.getItem("itemIndexCart"));
    tuodetOstoskorissa=[];
    localStorage.setItem("itemIndexCart",JSON.stringify(tuodetOstoskorissa));
    shoppingPanel.innerHTML=`<span id="closeBtnShopping" onclick="closeShoppingPanel()">&times;</span><h2>Ostoskori</h2>`;
    shoppingPanel.innerHTML+=`<h2>${tuodetOstoskorissa.length} tuotetta, yhteensä ${ostosKoriSumma} €</h2>
    <button onclick="checkOut()" id="checkOutBtn">Siirry kassalle =></button>`;
})
