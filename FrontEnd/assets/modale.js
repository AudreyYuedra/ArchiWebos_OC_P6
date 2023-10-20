


/********** CONSTANTES **********/
const jsModal = document.getElementById("js-modal");

const modal = document.getElementById("modal");
const windowOne = document.getElementById("modal1");
const windowTwo = document.getElementById("modal2");

const closeMark = document.getElementById("close");
const arrowLeft = document.getElementById("arrowLeft");

const modalWorks = document.querySelector(".modal-works");
const modalForm = document.querySelector(".form-modal");


/********** VARIABLES **********/


/********** FONCTIONS **********/
//affiche works dans modale
function modifWorks(works) {
    const modalWorks = document.querySelector(".modal-works");
    const figureWorks = document.createElement("figureWorks");
    modalWorks.appendChild("figureWorks");
    figureWorks = datas.forEach(works);

}

//ouvertute & fermeture modale
function openModal () {
    modal.style.display = "block";
    modifWorks();
}

function closeModal () {
    modal.style.display = "none";

}

//supprimer works


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