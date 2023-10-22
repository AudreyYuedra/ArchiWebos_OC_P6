/********** IMPORTS **********/
import {works, categories} from "./script.js";
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
    choixCategory();
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
    //afficher photo choisie à la place de l'icône img
};

btnAjoutPhoto.addEventListener("click", (event) =>{
    event.preventDefault();
    ajouterPhoto();

})


//***** Affiche catégories dans menu déroulant **********************************
const selectCategories = document.getElementById("selectCategories");

function choixCategory () {
    categories.forEach(category => {
        const choixCategory = document.createElement("option");
        choixCategory.innerText = category.name
        choixCategory.appendChild(selectCategories);
    })
};


//***** Vérif champs remplis ************************************************
function verifImage () {
    //obligation de choisir image
};

function verifTilte () {
    //obligation d'avoir le cahmp rempli
};

function verifCategory () {
    //obligation de choisir une catégorie
};

//SI champ complets => changer couleur btnValider


//***** Envoie form ajout photo **********************************************
const modalForm = document.querySelector(".form-modal");

modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if(verifImage() && verifTilte() && verifCategory()) {
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: //je ne sais pas quoi mettre
            }).then(response => response.json())
            .then ()
    };
});
