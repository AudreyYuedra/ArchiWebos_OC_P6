/********** CONSTANTES **********/
//récupération DOM
const main = document.querySelector("main");
const form = document.querySelector("form");
const baliseMail = document.getElementById("email");
const baliseMdp = document.getElementById("mdp");

const login = [
    mail = "sophie.bluel@test.tld",
    mdp = "S0phie"
];


/********** VARIABLES **********/


/********** FONCTIONS **********/
async function verifLogin (login) {
    if (baliseMail === mail.value & baliseMdp === mdp.value) {
        //changement de page
        window.location.href = "./index.html";
    } else {
        //affiche message erreur
        const txtError = document.createElement("txt_error");
        main.appendChild(txtError);
        txtError.innerHTML = "Erreur dans l'email ou/et le mot de passe.";
        txtError.classList.add("txt_error");

        console.log("Erreur de connexion avec l'email ou/et le mot de passe.");
    }
}

    /********** AUTRES ***********/
//connexion login
form.addEventListener("submit", (event) => {
    //empêcher comportement par défaut
    event.preventDefault();

    verifLogin();
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