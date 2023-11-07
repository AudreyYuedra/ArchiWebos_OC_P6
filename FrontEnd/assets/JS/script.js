        /////////////////////////////////////////////////
        /******************** INDEX ********************/

//****** Appels récupération API ***************************************
async function fetchWorks(){
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
    } catch (error) {
        console.error("Erreur de récupération de travaux.", error);
    }
};

async function fetchCategories(){
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    } catch (error) {
        console.error("Erreur de récupération des catégories.", error);
    }
};


//****** Ajout works dans portfolio ***************************************
const gallery = document.querySelector(".gallery");
const categoriesFilters = null;
let works = [];

function afficherWorks(works) {
    gallery.innerHTML = ""; //efface le contenu html
    //console.log("works", works);
    //*Création éléments via boucle
    works.forEach((work) => {   //mettre les parenthèses par défaut
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        //*Assignements
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;
        //*Position éléments
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    })
};


//****** Ajout filtres pour les catégories ********************************
const filters = document.querySelector(".filters");
let categories = [];

function afficherCategories(categories) {
    //console.log("catégories", categories);
    
    const filterAll = document.createElement("button"); //création élements
    filters.appendChild(filterAll); //position élément
    filterAll.innerText = "Tous"; //nom
    filterAll.classList.add("btnFilter", "filter_selected"); //lien class CSS
    filterAll.dataset.categoryId = "0"; //ajout attribut
    //*Création éléments via boucle
    categories.forEach(category => {
        const btnFilter = document.createElement("button");
        btnFilter.innerText = category.name; //assignements
        filters.appendChild(btnFilter); //position éléments
        btnFilter.classList.add("btnFilter", "filter_unselected"); //lien class CSS
        btnFilter.dataset.categoryId = category.id; //ajout attribut
    })
};

filters.addEventListener("click", (event) => {
    const target = event.target
    if(target.tagName === "BUTTON") {    //majuscules pour récupération
        const allButtons = document.querySelectorAll(".btnFilter");
        allButtons.forEach((btn) => {
            btn.classList.remove("filter_selected");
            btn.classList.add("filter_unselected");
        });
        const categoryId = parseInt (target.dataset.categoryId) //parset => parcourt attribut sur element cliqué
        //*Affiche works selon filtre cliqué
        if(categoryId === 0) {
            afficherWorks(works);
        } else {
            const filteredWorks = works.filter ((work) => {
                return work.categoryId === categoryId
            });
        afficherWorks(filteredWorks);
        };
        target.classList.remove("filter_unselected");
        target.classList.add("filter_selected");
    };
});


//****** Chargement works et categories ************************************
document.addEventListener("DOMContentLoaded", (event) => {
    if(works < 1) {
        fetchWorks()
            .then((data) => {
                works = data;
                afficherWorks(works);
            });
    }
    fetchCategories()
        .then(categories => {
            afficherCategories(categories);
        });
});



        /////////////////////////////////////////////////
        /******************** EDIT ********************/

//****** Affiche btn déconnection *******************************************
const log = document.getElementById("log");

function logout() {
    log.innerText = "logout";
};

log.addEventListener("click", () => {
    localStorage.removeItem("Token"); //suppr token
    window.location.replace("login.html"); //rediretion
});


//****** Affiche mode édition quand connecté ********************************
const online = localStorage.getItem("Token"); //récupère infos login stockées
const headband = document.querySelector(".headband");
const edit = document.querySelector(".edit");

function showEdition() {
    headband.style.display = "block";
    edit.style.visibility = "visible";
};

function hiddenFilters() {
    filters.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
    if (online) {
        showEdition();
        hiddenFilters();
        logout();
    };
});



        /////////////////////////////////////////////////
        /******************* MODALE ********************/

//***** Affichage et Suppression works dans modale *********************************
const modalWorks = document.querySelector(".modal-works");

//** Suppr works via icone trash
function deleteWork(workId, deleteIcon) {
    //console.log("workId => deleteWork", workId);
    //console.log("token", online);

    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {"Authorization" : `Bearer ${online}`}
        }).then(response => {
            if (response.ok) {
                deleteIcon.parentElement.remove();
                works = works.filter(work => work.id !== workId);
                alert("Projet supprimé avec succès !")
            }
        }).catch(error => {
                    console.error("Erreur de récupération de travaux.", error)
            });
};

//** Afficher works dans gallery-modale
function modifWorks() {
    modalWorks.innerHTML = "";
    works.forEach((work) => {
        const figureModal = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl
        img.alt = work.title
        figureModal.appendChild(img);
        modalWorks.appendChild(figureModal);
        //*Ajout btn suppr
        const deleteIcon = document.createElement("a");
        deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can data-id="${work.id}""></i>`;
        figureModal.appendChild(deleteIcon);
        deleteIcon.classList.add("delete");

        //*Suppression works
        deleteIcon.addEventListener("click", (event) => {
            //console.log("deleteIcon", deleteIcon);
            const workId = event.target.getAttribute("data-id"); //récupére attribut icône suppr
            //console.log("workId", workId);
            deleteWork(workId, deleteIcon);
        });
    });
};


//***** Ouverture et Fermeture et Switch de la modale ****************************************
const jsModal = document.getElementById("js-modal"); //lien bandeau edit
const jsModal2 = document.getElementById("js-modal2"); // lien titre portfolio

const modal = document.getElementById("modal");
const closeMark = document.getElementById("close"); //croix page 1 modale
const closeMark2 = document.getElementById("close2"); //croix page 2 modale

const windowOne = document.getElementById("modal1"); //page 1 modale
const windowTwo = document.getElementById("modal2"); //page 2 modale
const btnAjouter = document.getElementById("btnAjouter");
const arrowLeft = document.getElementById("arrowLeft"); //flèche page 2 modale

//** Ouverture modale
jsModal.addEventListener("click", () => {
    modal.showModal();
    windowOne.style.display = "block";
    modifWorks(works);
    console.log("Ouverture de la première fenêtre de la modale.")
});

jsModal2.addEventListener("click", () => {
    modal.showModal();
    windowOne.style.display = "block";
    modifWorks(works);
    console.log("Ouverture de la première fenêtre de la modale.")
});

//** Fermeture modale
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
        console.log("Fermeture de la modale.")
    };
});

closeMark.addEventListener("click", () => {
    modal.close();
    console.log("Fermeture de la modale.")
});

closeMark2.addEventListener("click", () => {
    modal.close();
    console.log("Fermeture de la modale.")
});

//** Switch window-modal
function openModalTwo() {
    windowOne.style.display = "none";
    windowTwo.style.display = "block";
    console.log("Ouverture de la seconde fenêtre de la modale.")
};

function precedentModal() {
    windowOne.style.display = "block";
   windowTwo.style.display = "none";
   console.log("Ouverture de la première fenêtre de la modale.")
};

btnAjouter.addEventListener("click", () => {
    openModalTwo();
    choixSelectCategory(categories);
});

arrowLeft.addEventListener("click", () => {
    precedentModal();
});


//***** Ajouter photo (window-modal-2) ******************************************
const choixPhoto = document.querySelector(".choixPhoto"); //container
const imgPhoto = document.querySelector(".fa-image"); //icone
const labelAjoutPhoto = document.getElementById("labelPhoto"); //label
const ajoutPhoto = document.getElementById("ajoutPhoto"); //input
const miniPhoto = document.getElementById("miniPhoto"); //img (vide)
const limiteFormat = document.getElementById("limiteFormat"); //p

ajoutPhoto.addEventListener("change", () => {
    //*Récupération fichier
    const selectedPhoto = ajoutPhoto.files[0];
    file = selectedPhoto
    const photo = document.createElement("img");
    photo.src = URL.createObjectURL(selectedPhoto);
    miniPhoto.src = photo.src;

    //*Afficher photo dans choixPhoto
    imgPhoto.style.display = "none";
    labelAjoutPhoto.style.display = "none";
    ajoutPhoto.style.display = "none";
    limiteFormat.style.display = "none";
    miniPhoto.style.display = "block";
});

//** Reset miniPhoto
function resetMiniPhoto() {
    imgPhoto.style.display = "block";
    labelAjoutPhoto.style.display = "block";
    ajoutPhoto.style.display = "block";
    limiteFormat.style.display = "block";
    miniPhoto.style.display = "none";
};


//***** Affiche catégories dans menu déroulant **********************************
const selectCategories = document.getElementById("selectCategories");

const choixSelectCategory = async () => {
    //*Récupération API
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    categories = data;
    //*Option par défaut visible
    const choixVide = document.createElement("option");
    choixVide.innerText = "Sélectionnez une catégorie";
    choixVide.value = "";
    selectCategories.appendChild(choixVide);
    //*Option choix de catégorie
    categories.forEach((category) => {
        const choixOption = document.createElement("option");
        choixOption.innerText = category.name;
        choixOption.value = category.id;
        selectCategories.add(choixOption);
    });
};


//***** Vérif champs remplis ************************************************
const choixTitle = document.getElementById("choixTitle");
let file;

//** Image
function fileType() {
    if(!file) {
        return false
    }
    const fileTypes = ["image/jpeg", "image/pjpeg", "image/png"] 
    console.log("fileTypes", fileTypes)
    console.log("file type", file)
    if(fileTypes.includes(file.type)) {
        return true
    } else {
        const typeWarning = document.createElement("p")
        typeWarning.innerText = "Le format n'est pas valide !"
        limiteFormat.appendChild(typeWarning)
        typeWarning.classList.add("errorPhoto")
        return false
    }
}

function fileSize() {
    const number = file.size
    if(number < 4000000 /*octets*/) {
        return true
    } else {
        const sizeWarning = document.createElement("p")
        sizeWarning.innerText = "La taille est trop grande !"
        limiteFormat.appendChild(sizeWarning)
        sizeWarning.classList.add("errorPhoto")
        return false
    }
}

function verifFile() {
    if(fileType() && fileSize()) {
        console.log("L'image est valide.");
        return true;
    } else {
        imgPhoto.style = "color: red";
        console.log("L'image est invalide.");
        return false;
    }
}

//** Titre
function conformTitle() {
    let titleRegExp = new RegExp("[A-z._-]+") //conformité titre
    console.log(choixTitle.value)
    if(!choixTitle.value.match(titleRegExp)) {
        choixTitle.classList.add("errorTitle")
    } else {
        return true
    }
}


function verifTitle() {
    if(conformTitle() === true) {
        console.log("le titre est valide.");
        return true;
    } else {
        return false;
    };
};

//** Catégorie
function verifCategory() {
    for (category of categories) {
        if (category.id === parseInt(selectCategories.value)) { //parseInt permet de changer une string en nb
            //console.log("La catégorie est valide.")
            return true
        }
    }
    console.log("La catégorie n'est pas valide.")
    return false
}

//***** Envoie form ajout photo **********************************************
const btnValider = document.getElementById("btnValider");
const modalForm = document.querySelector("#form-modal");

btnValider.disabled = true //btn non-cliquable

//** Vérif formulaire rempli
function verifForm() {
    //console.log("lancement de verifForm()");
    if(verifTitle() && verifFile() && verifCategory()) {
        btnValider.classList.remove("uncheck");
        btnValider.classList.add("check");
        btnValider.disabled = false //btn cliquable
        return true;
    } else {
        if(!verifTitle()) {
            choixTitle.classList.add("errorTilte");
            //console.log("Le champ Titre est vide.");
        };
        if(!verifFile()) {
            imgPhoto.style.color = "red";
            //console.log("L'image n'a pas été choisie.");
        };
        if(!verifCategory()) {
            selectCategories.classList.add("errorSelect");
            //console.log("La catégorie n'a pas été choisie.");
        };
        btnValider.disabled = true //btn non-cliquable
        return false;
    };
};

//envoie formulaire à API
document.addEventListener("DOMContentLoaded", () => {
    modalForm.addEventListener("change", () => {
        verifForm();
    });

    modalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (verifForm()) {
            //*Création object formData
            let formData = new FormData();
            formData.append("title", choixTitle.value);
            formData.append("category", parseInt(selectCategories.value));
            formData.append("image", ajoutPhoto.files[0]);

            try {
                fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {Authorization: `Bearer ${online}`},
                    body: formData,
                })
                .then( response => {
                    //console.log("choixTitle", choixTitle.value);
                    //console.log("category", selectCategories.value);
                    //console.log("image", ajoutPhoto.files[0]);
                    //console.log(response.status);
                })
                gallery.innerHTML = "";
                afficherWorks(works);
                modifWorks();
                //alert("Projet ajouté avec succès !");
                windowTwo.style.display = "none";
                windowOne.style.display = "block";
            }
            catch {
                console.error("Une erreur s'est produite : ", error);
            };
        };
    });
});