/********** CONSTANTES **********/
//récupération DOM
const form = document.querySelector("form");
const txtError = document.querySelector("txt_error");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

/********** VARIABLES **********/


/********** FONCTIONS **********/
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

    /********** AUTRES ***********/
//connexion login
form.addEventListener("submit", async (event) => {
    //empêcher comportement par défaut
    event.preventDefault();

    //if (email.value && password.value) {

        fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value})
        }).then(response => response.json())
        .then (data => {
            const token = data.token;
            localStorage.setItem("Token", token);
            if (token) {
                window.location.replace("index.html");
            } else {
                const message = txtError;
            }
        })
    }
);


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