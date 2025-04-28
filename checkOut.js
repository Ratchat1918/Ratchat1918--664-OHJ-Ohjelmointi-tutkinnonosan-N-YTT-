function checkOut() {
    console.log("checkOut");
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