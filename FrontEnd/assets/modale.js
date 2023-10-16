/********** IMPORT **********/
import {filters} from "./script.js";
import {fetchWorks} from "./script.js";


/********** CONSTANTES **********/
const headband = document.querySelector(".headband");
const edit = document.querySelector("edit");

const jsModal = document.querySelectorAll("js-modal");
const modal = document.getElementById("modal");
const xmark = document.querySelector("fa-xmark");

const worksModal = document.querySelector("works-modal");

// login ok => token placé ici


/********** VARIABLES **********/


/********** FONCTIONS **********/
//affiche mode édition quand connecté
function showEdition () {
    headband.style.display = "none";
    headband.setAttribute("aria-hidden", "true");

    edit.style.display = "none";
    edit.setAttribute("aria-hidden", "true");
}

//cache filtres quand connecté
function hiddenFilters () {
    filters.style.display = "none";
    filters.setAttribute("aria-hidden", "true");
}

//affiche works dans modale
function modifWorks(works) {
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
function openModal () {
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}

function closeModal () {
    if (modal === null) {
        return;
    }

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal = null;
}


/********** AUTRES **********/
//modif quand connecté
document.addEventListener("DOMContentLoaded", () => {
    showEdition();
    hiddenFilters();
});

document.addEventListener("DOMContentLoaded", () => {
    modifWorks();
});

//ouverture & fermeture modale
jsModal.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
});

xmark.addEventListener("clic", (event) => {
    event.preventDefault();
    closeModal();
});