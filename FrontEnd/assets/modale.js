/********** IMPORTS **********/
import {works} from "./script.js";

/********** CONSTANTES **********/
const jsModal = document.getElementById("js-modal");

const modal = document.getElementById("modal");
const windowOne = document.getElementById("modal1");
const windowTwo = document.getElementById("modal2");

const closeMark = document.getElementById("close");
const arrowLeft = document.getElementById("arrowLeft");
const btnAjouter = document.getElementById("btnAjouter");

const modalForm = document.querySelector(".form-modal");
const btnAjoutPhoto = document.getElementById("ajoutPhoto");


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
        //supprimer works
        const deleteIcon = document.createElement("a");
        deleteIcon.forEach((figure) => {
        deleteIcon.classList.add(".fa-trash-can");
        deleteIcon.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
        figure.appendChild(deleteIcon);
        });    
    })
};

//ouvertute & fermeture modale
function openModal () {
    modal.style.display = "block";
    modifWorks(works);
};

function closeModal () {
    modal.style.display = "none";
};

//switch windows-modal
function openModalTwo () {
    windowOne.style.display = "none";
    windowTwo.style.display = "block";
};

function precedentModal () {
    windowTwo.style.display = "none";
    windowOne.style.display = "block";
}

//ajouter photo
function ajouterPhoto () {
    //ouvrir fenêtre windows pour récupérer photo
};


/********** ECOUTEURS D'EVENEMENTS **********/
document.addEventListener("DOMContentLoaded", () => {
    modifWorks();
});

//ouverture & fermeture modale
jsModal.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    };
});

closeMark.addEventListener("click", () => {
    closeModal();
});

//switch window modal
btnAjouter.addEventListener("click", () => {
    openModalTwo();
});

arrowLeft.addEventListener("click", () => {
    precedentModal();
});

//ajouter photo
/*btnAjoutPhoto.addEventListener("click", () => {
    ajouterPhoto();
});*/