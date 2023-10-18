


/********** CONSTANTES **********/
const jsModal = document.querySelectorAll(".js-modal");

const modal = document.getElementById("modal");
const windowOne = document.getElementById("modal-window-1");
const windowTwo = document.getElementById("modal-window-2");

const xmark = document.querySelector(".fa-xmark");
const arrowLeft = document.querySelector(".fa-arrow-left");

const modalWorks = document.querySelector(".modal-works");
const modalForm = document.querySelector(".form-modal");


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
function openModalOne () {
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}

function closeModal () {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

}

//supprimer works


//switch windows-modal


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