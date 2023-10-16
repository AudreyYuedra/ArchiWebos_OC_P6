/********** CONSTANTES **********/
//récupération DOM
const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


/********** FONCTIONS **********/
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
}

function verifLogin() {
    if (email !== email.value && password !== password.value) {
        email.classList.add("error");
        password.classList.add("error");
    } else {
        console.log("Le login est valide !")
    }
}

/********** ECOUTEURS D'EVENEMENTS ***********/
//connexion login
form.addEventListener("submit", async (event) => {
    //empêcher comportement par défaut
    event.preventDefault();

    // requête API envoie login
    fetch ("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
        email: email.value,
        password: password.value})
    }).then(response => response.json())
    .then (data => {
        //récupération token dans API
        const token = data.token;
        //stockage token dans navigateur
        localStorage.setItem("Token", token);
        //changement de page
        if (token) {
            window.location.replace("index.html");
        } else {
            //txtError.innerText = "Il y a une erreur !";
        }

        //vérification email & password
        verifEmail();
        verifPassword();
        verifLogin();
    })
});


    /*verifierChamp();
    verifierEmail();
    verifierMdp();*/

    /*function verifierChamp(balise) {
    if(balise.value === ""){
        balise.classList.add("error");
    } else {
        balise.classList.remove("error");
    }
};

function verifierEmail(baliseMail) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    if (emailRegExp.test(baliseMail.value)) {
        console.log("L'email est valide !");
        baliseMail.classList.remove("error");
    } else {
        console.log("L'email est erroné !");
        baliseMail.classList.add("error");
    }
};
function verifierMdp(baliseMdp) {
    let mdpRegExp = new RegExp("[a-z0-9._-]+$");
    if (mdpRegExp.test(baliseMdp)) {
        console.log("Le mot de passe est valide !");
        baliseMail.classList.remove("error");
    } else {
        console.log("Le mot de passe est erroné !");
        baliseMail.classList.add("error");
    }
}*/


/*    try {
        //verifLogin();        
    }
    catch (error) {
        if (login.user !== mail.value) {
            txtError.innerHTML = "Erreur dans l'email.";
            console.log("Erreur de connexion avec l'email.");
        }
        if (login.password !== mdp.value) {
            txtError.innerHTML = "Erreur dans le mot de passe.";
            console.log("Erreur de connexion avec le mot de passe.");
        }
        if (login.user ==="", login.password ==="") {
            txtError.innerHTML = "L'un des champs est vide.";
            console.log("L'un des champs est vide.");
        }
    }*/

    /*async function verifLogin () {
    const login = {
        user: event.target.querySelector("[id=email]").value,
        password: event.target.querySelector("[id=mdp]").value,
    };
    
    if (login.user === mail.value & login.password === mdp.value) {
        //changement de page
        window.location.href = "./index.html";
    } else {
        throw error;
    }
}*/