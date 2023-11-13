//****** Vérification des champs *********************************
const email = document.getElementById("email");
const password = document.getElementById("password");
const txtError = document.getElementById("txtError");

function verifEmail() {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+"); //conformité email
    if(email !== emailRegExp || email !== email.value) {
        txtError.innerText = "L'email n'est pas valide !";
        email.classList.add("errorEmail");
        return false;
    } else {
        return true;
    }
};

function verifPassword() {
    if (password !== password.value) {
        txtError.innerText = "Le mot de passe n'est pas valide !";
        password.classList.add("errorPassword");
        return false;
    } else {
        return true;
    }
};


//****** Connection Login *****************************************
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault(); //empêche comportement par défaut
    
        // Requête API envoie login
        fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value})
        }).then(response => response.json())
        .then (data => {
            const token = data.token; //récupération token dans API
            localStorage.setItem("Token", token); //stockage token dans navigateur
            // Changement de page
            if (token) {
                window.location.replace("index.html");
            } else {
                verifEmail();
                verifPassword();
            }
        });
    });
});