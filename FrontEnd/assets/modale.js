/********** IMPORTS **********/
import {works} from "./script.js";
import {online} from "./edit.js";


//***** Ajout works dans modale *********************************
const modalWorks = document.querySelector(".modal-works");

function modifWorks(works) {
    modalWorks.innerHTML = "";
    works.forEach((work) => {
        const figureModal = document.createElement("figure-modal");
        const img = document.createElement("img");
        img.src = work.imageUrl
        img.alt = work.title    
        figureModal.appendChild(img);
        modalWorks.appendChild(figureModal);  
    });
};


//***** Ajout icône suprr works + Suppression works ***********************
const figureModal = document.querySelectorAll("figure-modal");
const deleteIcon = document.createElement("a");

function ajoutDeleteIcon () {
    deleteIcon.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
    deleteIcon.classList.add(".fa-trash-can");
    figureModal.appendChild(deleteIcon);
};

deleteIcon.addEventListener("click", () => {
    fetch("http://localhost:5678/api/works" + works.id, {
        method: "DELETE",
        headers: "" + online.token,  //je ne sais pas quoi mettre comme nom
        }).then(response => response.json())
        .catch(error => {
            console.error("Erreur de récupération de travaux.", error)
        });
});


//***** Affiche modal-works *********************************************
document.addEventListener("DOMContentLoaded", () => {
    modifWorks();
    ajoutDeleteIcon();
});

//***** Ouverture de la modale ****************************************
const jsModal = document.getElementById("js-modal");

function openModal () {
    modal.style.display = "block";
    modifWorks(works);
};

jsModal.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
});


//***** Fermeture de la modale ****************************************
const modal = document.getElementById("modal");
const closeMark = document.getElementById("close");

function closeModal () {
    modal.style.display = "none";
};

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    };
});

closeMark.addEventListener("click", () => {
    closeModal();
});


//***** Switch window-modal **************************************************
const windowOne = document.getElementById("modal1");
const windowTwo = document.getElementById("modal2");
const btnAjouter = document.getElementById("btnAjouter");
const arrowLeft = document.getElementById("arrowLeft");

function openModalTwo () {
    windowOne.style.display = "none";
    windowTwo.style.display = "block";
};

function precedentModal () {
    windowTwo.style.display = "none";
    windowOne.style.display = "block";
};

btnAjouter.addEventListener("click", () => {
    openModalTwo();
});

arrowLeft.addEventListener("click", () => {
    precedentModal();
});


//***** Ajouter photo (window-modal-2) ******************************************
const btnAjoutPhoto = document.getElementById("ajoutPhoto");

function ajouterPhoto () {
    //ouvrir fenêtre Windows pour récupérer photo
};

btnAjoutPhoto.addEventListener("click", () =>{
    ajouterPhoto();
})


//***** Affiche catégories dans menu déroulant **********************************



//***** Vérif champs remplis ************************************************



//***** Envoie form ajout photo **********************************************
const modalForm = document.querySelector(".form-modal");

