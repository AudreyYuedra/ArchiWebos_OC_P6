//****** Vérification des champs *********************************
const email = document.getElementById("email");
const password = document.getElementById("password");
const txtError = document.getElementById("txtError");

function verifLogin() {
    //let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+"); //conformité email
    if(email !== email.value || password !== password.value) {
        txtError.innerText = "L'identifiant n'est pas valide !";
    }
}

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
                verifLogin();
            }
        });
    });
});