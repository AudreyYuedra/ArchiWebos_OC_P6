/********** IMPORTS **********/
import {works} from "./script.js";
import {online} from "./edit.js";

/********** CONSTANTES **********/
const jsModal = document.getElementById("js-modal");

const modal = document.getElementById("modal");
const windowOne = document.getElementById("modal1");
const windowTwo = document.getElementById("modal2");

const closeMark = document.getElementById("close");
const arrowLeft = document.getElementById("arrowLeft");
const btnAjouter = document.getElementById("btnAjouter");
const deleteIcon = document.createElement("a");

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
    });
    ajoutDeleteIcon(works);
};

//affiche btn suppr works
function ajoutDeleteIcon (works) {
    const figure = querySelectorAll("figure");
    deleteIcon.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
    deleteIcon.classList.add(".fa-trash-can");
    figure.appendChild(deleteIcon);
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

deleteIcon.addEventListener("click", () => {
    fetch("http://localhost:5678/api/works" + works.id, {
        method: "DELETE",
        headers: "" + online.token,  //je ne sais pas quoi mettre comme nom
        }).then(response => response.json())
        .catch(error => {
            console.error("Erreur de récupération de travaux.", error)
        });
});

//ajouter photo
/*btnAjoutPhoto.addEventListener("click", () => {
    ajouterPhoto();
});*/