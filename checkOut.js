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
    let confirmForm = document.getElementById("checkOutDetailsModal");
    confirmForm.addEventListener("submit", function(event) {
            let visaChecked = document.getElementById("visacard").checked;
            let masterChecked = document.getElementById("mastercard").checked;
            let cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, "");
            let errors = [];
            if (cardNumber.length !== 16) {
                errors.push("Kortin tulee sisältää tasan 16 numeroa.")
            }
            if (!visaChecked && !masterChecked) {
                errors.push("Valitse maksutapa: Visa tai Mastercard.");
            }
            if (errors.length > 0) {
                alert(errors.join("\n"));
                event.preventDefault();
            }
            
        });
});

document.getElementById("cardNumber").addEventListener("input", function(event) {
    let cardNumberInput = event.target;
    let cardNumberValue = cardNumberInput.value.replace(/\s/g, "");
    cardNumberValue = cardNumberValue.match(/.{1,4}/g)?.join(" ") || cardNumberValue;
    cardNumberInput.value = cardNumberValue;
});

document.getElementById("securityCode").addEventListener("input", function(event) {
    let securityInput = event.target;
    if (securityInput.value.length > 3) {
        securityInput.value = securityInput.value.slice(0, 3);
    }
});

document.getElementById("confirmOrder").addEventListener("click", function() {
    console.log("checkOut");
})