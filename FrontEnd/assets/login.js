/********** CONSTANTES **********/
//récupération DOM
const main = document.querySelector("main");
const baliseMail = document.getElementById("mail");
const baliseMdp = document.getElementById("mdp");
const btnEnvoie = document.getElementById("btn_login");

const mail = "sophie.bluel@test.tld";
const mdp = "S0phie";


/********** VARIABLES **********/



/********** FONCTIONS **********/
function verifierChamp(balise) {
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
}

function login(baliseMail, baliseMdp) {
    btnEnvoie.innerText = "Se connecter";
    btnEnvoie.classList.add("btn_login");

    if (baliseMail === mail & baliseMdp === mdp) {
        //changement de page
        // ... (index.html)
    } else {
        //affiche erreur
        const txtError = document.createElement("txt_error");
        main.appendChild("txtError");
        txtError.innerHTML = "Erreur d'identifiant ou de mot de passe.";
        txtError.classList.add("txt_error");

        console.log("Erreur de connexion.");
    }
}


    /********** AUTRES ***********/
//connexion login
btnEnvoie.addEventListener("submit", (event) => {
    //empêcher comportement par défaut
    event.preventDefault();

    verifierChamp();
    verifierEmail();
    verifierMdp();

    login();
});
