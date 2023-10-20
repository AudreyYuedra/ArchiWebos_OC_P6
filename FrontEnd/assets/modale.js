/********** IMPORTS **********/
import {works} from "./script.js";

/********** CONSTANTES **********/
const jsModal = document.getElementById("js-modal");

const modal = document.getElementById("modal");
const windowOne = document.getElementById("modal1");
const windowTwo = document.getElementById("modal2");

const closeMark = document.getElementById("close");
const arrowLeft = document.getElementById("arrowLeft");

const modalWorks = document.querySelector(".modal-works");
const modalForm = document.querySelector(".form-modal");


/********** FONCTIONS **********/
//affiche works dans modale
function modifWorks(works) {
    const modalWorks = document.querySelector(".modal-works");
    modalWorks.innerHTML = "";
    
    works.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl
        img.alt = work.title    
        figure.appendChild(img);
        modalWorks.appendChild(figure);
        
    }
)};

//ouvertute & fermeture modale
function openModal () {
    modal.style.display = "block";
    modifWorks(works);
}

function closeModal () {
    modal.style.display = "none";

}



//switch windows-modal


/********** ECOUTEURS D'EVENEMENTS **********/
//ouverture & fermeture modale
jsModal.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
});

closeMark.addEventListener("clic", (event) => {
    event.preventDefault();
    closeModal();
});

//
document.addEventListener("DOMContentLoaded", () => {
    modifWorks();
});