


/********** CONSTANTES **********/
const jsModal = document.querySelectorAll("js-modal");
const modal = document.getElementById("modal");
const xmark = document.querySelector("fa-xmark");

const worksModal = document.querySelector("works-modal");


/********** VARIABLES **********/


/********** FONCTIONS **********/
/*
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
}*/

//ouvertute & fermeture modale
function openModal () {
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}

function closeModal () {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

}


/********** ECOUTEURS D'EVENEMENTS **********/
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