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
const categoriesFilters = null;
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
document.addEventListener("DOMContentLoaded", () => {
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
    galleryWorksModal(works);
    //console.log("Ouverture de la première fenêtre de la modale.")
});

jsModal2.addEventListener("click", () => {
    modal.showModal();
    windowOne.style.display = "block";
    galleryWorksModal(works);
    //console.log("Ouverture de la première fenêtre de la modale.")
});

//** Fermeture modale
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
        //console.log("Fermeture de la modale.")
    };
});

closeMark.addEventListener("click", () => {
    modal.close();
    //console.log("Fermeture de la modale.")
});

closeMark2.addEventListener("click", () => {
    modal.close();
    //console.log("Fermeture de la modale.")
});

//** Switch window-modal
function openModalTwo() {
    windowOne.style.display = "none";
    windowTwo.style.display = "block";
    //console.log("Ouverture de la seconde fenêtre de la modale.")
};

function precedentModal() {
    windowOne.style.display = "block";
    windowTwo.style.display = "none";
    //console.log("Ouverture de la première fenêtre de la modale.")
};

btnAjouter.addEventListener("click", () => {
    openModalTwo();
    choixSelectCategory(categories);
});

arrowLeft.addEventListener("click", () => {
    precedentModal();
});


//***** Affichage et Suppression works dans modale *********************************
const modalWorks = document.querySelector(".modal-works");
const newWorks = works.filter((work) => work.id !== img.id);

function deleteWork(deleteIcon, img) {
    try {
        const response = fetch(`http://localhost:5678/api/works/${img.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${online}`,
                "Content-Type": "application/json"
            }
        });

        if (response) {
            deleteIcon.parentElement.remove();
            afficherWorks(works);

        } else if (response.status == "401") {
            alert("Session expirée, veuillez vous reconnecter.");
            document.location.href=("login.html"); 
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

//*Création gallerie works avec btn suppr
function galleryWorksModal(works) {
    modalWorks.innerHTML = "";
    works.forEach((work) => {
        const figureModal = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl
        img.alt = work.title
        img.id = work.id
        figureModal.appendChild(img);
        modalWorks.appendChild(figureModal);
        //*Ajout btn suppr
        const deleteIcon = document.createElement("a");
        deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        figureModal.appendChild(deleteIcon);
        deleteIcon.classList.add("delete");

        //*Suppr works
        deleteIcon.addEventListener("click", () => {
            console.log("work.id = " + img.id);
            deleteWork(deleteIcon, img);
        })
    })
}


//***** Ajouter photo (window-modal-2) ******************************************
const choixPhoto = document.querySelector(".choixPhoto"); //container
const imgPhoto = document.querySelector(".fa-image"); //icone
const labelAjoutPhoto = document.getElementById("labelPhoto"); //label
const ajoutPhoto = document.getElementById("ajoutPhoto"); //input
const miniPhoto = document.getElementById("miniPhoto"); //img (vide)
const limiteFormat = document.getElementById("limiteFormat"); //p

let file;

//*Vérification taille et format photo
function fileType() {
    if(!file) {
        return false
    }
    const fileTypes = ["image/jpeg", "image/pjpeg", "image/png"] 
    //console.log("fileTypes", fileTypes)
    //console.log("file type", file)
    if(fileTypes.includes(file.type)) {
        console.log("le format est bon")
        return true
    } else {
        alert("Le format n'est pas valide !")
    }
}

function fileSize() {
    const number = file.size
    const MAX_IMG_SIZE = 4; //Mo
    const fileSizeMo = number / 1024 ** 2;

    if(fileSizeMo < MAX_IMG_SIZE) {
        console.log("la taille est bonne")
        return true
    } else {
        alert("La taille est trop grande !")
    }
}

ajoutPhoto.addEventListener("change", () => {
    //*Récupération fichier
    const selectedPhoto = ajoutPhoto.files[0];
    file = selectedPhoto
    miniPhoto.src = URL.createObjectURL(selectedPhoto);

    //*Afficher photo dans choixPhoto
    if(fileType() && fileSize()) {
    imgPhoto.style.display = "none";
    labelAjoutPhoto.style.display = "none";
    ajoutPhoto.style.display = "none";
    limiteFormat.style.display = "none";
    miniPhoto.style.display = "block";
    } else {
        miniPhoto.style.display = "none";
        console.log("L'image est invalide.");
        return false;
    }
});


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

//** Vérifier catégorie bien sélectionnée
function verifCategory() {
    for (category of categories) {
        if (category.id === parseInt(selectCategories.value)) { //parseInt permet de changer une string en nb
            //console.log("La catégorie est valide.")
            return true
        }
    }
    //console.log("La catégorie n'est pas valide.")
    return false
}


//***** Envoie form ajout photo **********************************************
const btnValider = document.getElementById("btnValider");
const modalForm = document.querySelector("#form-modal");
const choixTitle = document.getElementById("choixTitle");

btnValider.disabled = true //btn non-cliquable

//*Vérif formulaire bien rempli
function verifForm() {
    if(ajoutPhoto && choixTitle && verifCategory()) {
        btnValider.classList.remove("uncheck");
        btnValider.classList.add("check");
        btnValider.disabled = false //btn cliquable
        btnValider.style.cursor = "pointer";
        return true;
    } else {
        return false;
    }
}

modalForm.addEventListener("change", () => {
    verifForm();
});

//*Reset formulaire
function resetForm() {
    //*photo
    imgPhoto.style.display = "flex";
    labelAjoutPhoto.style.display = "flex";
    ajoutPhoto.style.display = "flex";
    limiteFormat.style.display = "flex";
    miniPhoto.style.display = "none";
    //*titre
    choixTitle.value = "";
    //*catégorie
    selectCategories.value = "";
    //*btn valider
    btnValider.classList.remove("check");
    btnValider.classList.add("uncheck");
    btnValider.disabled = true //btn non-cliquable
    btnValider.style.cursor = "auto";
}

//*Envoi formulaire
modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (verifForm()) {
        //*Création object formData
        const formData = new FormData(); //création objet pour envoie form
        formData.append("title", choixTitle.value);
        formData.append("category", parseInt(selectCategories.value));
        formData.append("image", ajoutPhoto.files[0]);

        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${online}`,
                Accept: "application/json"
            },
            body: formData
        })
        .then(response => {
            response.json();
            if(response) {
                //*Mise à jour works
                resetForm();
                document.addEventListener("change", () => {
                    //event.preventDefault();
                    afficherWorks(works);
                    galleryWorksModal(works);
                });
            } else if (response.status == "401") {
                alert("Session expirée, veuillez vous reconnecter.");
                document.location.href=("login.html");
            } else {
                alert(response.status);
            }
        })
    };
});
