//****** Vérification des champs *********************************
const email = document.querySelector("#email");
const password = document.querySelector("#password");

function verifEmail() {
    //conformité email
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

    if (email !== email.value || email !== emailRegExp) {
        email.classList.add("error");
    } else {
        console.log("L'email est valide !");
    }
};

function verifPassword() {
    if (password !== password.value) {
        password.classList.add("error");
    } else {
        console.log("Le mot de passe est valide !");
    }
};

function verifLogin() {
    if (email !== email.value && password !== password.value) {
        email.classList.add("error");
        password.classList.add("error");
    } else {
        console.log("Le login est valide !")
    }
};


//****** Connection Login *****************************************
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault(); //empêche comportement par défaut
    
        // requête API envoie login
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
            //changement de page
            if (token) {
                window.location.replace("index.html");
            }
    
            //vérification email & password
            verifEmail();
            verifPassword();
            verifLogin();
        });
    });
});