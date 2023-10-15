/********** CONSTANTES **********/
const headband = document.querySelector(".headband");
const edit = document.querySelector("edit");
const worksModal = document.querySelector("works-modal");

// login ok
//token placé ici


/********** VARIABLES **********/
let modal = null;
let works = [];

/********** FONCTIONS **********/
//affiche mode édition quand connecté
function showEdition () {}

//requête API ressource works
function fetchWorks(){
    return fetch("http://localhost:5678/api/works")
        .then(response => response.json()) //mettre paraenthèse pour contenu
        .catch(error => {
            console.error("Erreur de récupération de travaux.", error)
        });
}

//affiche works dans modale
function afficherWorks(works) {
    //efface le contenu html
    worksModal.innerHTML = "";
    console.log("works", works);
    //création éléments via boucle
    works.forEach((work) => {   //mettre les parenthèses par défaut
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        //assignements
        img.src = work.imageUrl
        img.alt = work.title
        //position éléments
        figure.appendChild(img);
        worksModal.appendChild(figure);
    })
}

//ouvertute & fermeture modale
function openModal (event) {
    event.preventDefault();

    const target = document.querySelector(event.target.getAttribute("href"))
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("clicl", closeModal);
    modal.querySelector("fa-xmark").addEventListener("click", closeModal);
    modal.querySelector("fa-xmark").addEventListener("click", stopPropagation);
}

function closeModal (event) {
    if (modal === null) {
        return;
    }
    event.preventDefault();

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("clicl", closeModal);
    modal.querySelector("fa-xmark").removeEventListener("click", closeModal);
    modal.querySelector("fa-xmark").removeEventListener("click", stopPropagation);
    modal =null;
}

function stopPropagation (event) {
    event.stopPropagation();
}
/********** AUTRES **********/
document.querySelectorAll("js-modal").forEach(a => {
    a.addEventListener("click", openModal);
    
})