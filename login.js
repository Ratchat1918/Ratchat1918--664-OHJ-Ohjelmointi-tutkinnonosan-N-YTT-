document.getElementById("logBtn").addEventListener("click", function() {
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
})

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