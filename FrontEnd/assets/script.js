        /////////////////////////////////////////////////
        /******************** INDEX ********************/

//****** Ajout works dans portfolio ***************************************
const gallery = document.querySelector(".gallery");
const categoriesFilters = null;
let works = [];

//requête API ressource works
function fetchWorks(){
    return fetch("http://localhost:5678/api/works")
        .then(response => response.json()) //mettre paraenthèse pour contenu
        .catch(error => {
            console.error("Erreur de récupération de travaux.", error)
        });
};

function afficherWorks(works) {
    //efface le contenu html
    gallery.innerHTML = "";
    console.log("works", works);
    //création éléments via boucle
    works.forEach((work) => {   //mettre les parenthèses par défaut
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        //assignements
        img.src = work.imageUrl
        img.alt = work.title
        figcaption.innerText = work.title
        //position éléments
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    })
};

document.addEventListener("DOMContentLoaded", () => {
    fetchWorks()
        .then((data) => {
            works = data;   //
            afficherWorks(works);
        });
    fetchCategories()
        .then(categories => {
            afficherCategories(categories);
            categoriesFilters = categories;
        });
});


//******* Ajout filtres pour les catégories ********************************
const filters = document.querySelector(".filters");

function fetchCategories(){
    return fetch("http://localhost:5678/api/categories")
        .then(response => response.json()) //mettre paraenthèse pour contenu
        .catch(error => {
            console.error("Erreur de récupération des catégories.", error)
        });
};

function afficherCategories(categories) {
    console.log("catégories", categories);
    //création élements
    const filterAll = document.createElement("button");
    //position élément
    filters.appendChild(filterAll);
    //nom
    filterAll.innerText = "Tous"
    //lien CSS
    filterAll.classList.add("btnFilter");
    //ajout attribut
    filterAll.dataset.categoryId = "0";
    //création éléments via boucle
    categories.forEach(category => {
        const btnFilter = document.createElement("button");
        //assignements
        btnFilter.innerText = category.name
        //position éléments
        filters.appendChild(btnFilter);
        //lien CSS
        btnFilter.classList.add("btnFilter");
        //ajout attribut
        btnFilter.dataset.categoryId = category.id;
    })
};

filters.addEventListener("click", (event) => {
    const target = event.target
    if (target.tagName === "BUTTON") {    //majuscules pour récupération
        const allButtons = document.querySelectorAll(".btnFilter");
        allButtons.forEach ((btn) => {
            btn.classList.remove("filter_selected")
        });
        const categoryId = parseInt (target.dataset.categoryId) //parset => parcourt attribut sur element cliqué
        if (categoryId === 0) {
            afficherWorks(works);
        } else {
            const filteredWorks = works.filter ((work) => {
                return work.categoryId === categoryId
            })
        afficherWorks(filteredWorks);
    } 
    target.classList.add("filter_selected");
}
});



        /////////////////////////////////////////////////
        /******************** EDIT ********************/

//****** Option modif visible ********************************************
const headband = document.querySelector(".headband");
const edit = document.querySelector(".edit");

function showEdition () {
    headband.style.display = "inline-block";
    headband.removeAttribute("aria-hidden");

    edit.style.display = "inline-block";
    edit.removeAttribute("aria-hidden");
};

function hiddenFilters () {
    filters.style.display = "none";
    filters.setAttribute("aria-hidden", "true");
};


//****** Affiche mode édition quand connecté ********************************
const online = localStorage.getItem("Token");

document.addEventListener("DOMContentLoaded", () => {
    if (online) {
        showEdition();
        hiddenFilters();
        logout();
    }
});


//****** Affiche btn déconnection *******************************************
const log = document.getElementById("log");

function logout () {
    log.innerText = "logout";
};

log.addEventListener("click", () => {
    //suppr token
    localStorage.removeItem("Token");
    //rediretion
    window.location.replace("login.html");
});



        /////////////////////////////////////////////////
        /******************** MODALE ********************/

//***** Affichage et Suppression works dans modale *********************************
const modalWorks = document.querySelector(".modal-works");

function deleteWork(workId, deleteIcon) {
    console.log("workId => deleteWork", workId);
    console.log("token", online);

    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {"Authorization" : `Bearer ${online}`}
        }).then(response => {
            if (response.ok) {
                deleteIcon.parentElement.remove();
                works = works.filter(work => work.id !== workId) ;
            }
        }).catch(error => {
                    console.error("Erreur de récupération de travaux.", error)
            });
};

function modifWorks() {
    modalWorks.innerHTML = "";
    works.forEach((work) => {
        const figureModal = document.createElement("figure-modal");
        const img = document.createElement("img");
        img.src = work.imageUrl
        img.alt = work.title
        figureModal.appendChild(img);
        modalWorks.appendChild(figureModal);
        //btn suppr works
        const deleteIcon = document.createElement("a");
        deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" data-id="${work.id}"></i>`;
        figureModal.appendChild(deleteIcon);
        deleteIcon.classList.add(".fa-trash-can");

        //suppression works
        deleteIcon.addEventListener("click", (event) => {
            console.log("deleteIcon", deleteIcon);
            //récupére attribut icône suppr
            const workId = event.target.getAttribute("data-id");
            console.log("workId", workId);
            deleteWork(workId, deleteIcon);    
        });
    });
};


//***** Ouverture de la modale ****************************************
const jsModal = document.getElementById("js-modal");
const modal = document.getElementById("modal");

jsModal.addEventListener("click", (event) => {
    modal.showModal();
    modifWorks(works);
    choixSelectCategory();
});


//***** Fermeture de la modale ****************************************
const closeMark = document.getElementById("close");

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    };
});

closeMark.addEventListener("click", () => {
    modal.close();
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


//***** Ajouter et vérif photo(window-modal-2) ******************************************
const btnAjoutPhoto = document.getElementById("ajoutPhoto");
const imgPhoto = document.querySelector(".fa-image");
const limiteFormat = document.querySelector("limiteFormat");
const choixPhoto = document.querySelector(".choixPhoto");

function fileType(file) {
    let fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
    if (file.type === fileTypes[i]) {
        return true;
    } else {
        //return false;
        const typeWarning = createElement("p");
        typeWarning.innerText = "Le format n'est pas valide !"
        typeWarning.appendChild(limiteFormat);
        typeWarning.classList.add(".errorPhoto");
    };
};

 function fileSize(number) {
    number = curFiles[i].size;
    if (number > 4000000 /*octets*/) {
        return true;
    } else {
        //return false;
        const sizeWarning = createElement("p");
        sizeWarning.innerText = "La taille est trop grande !"
        sizeWarning.appendChild(limiteFormat);
        sizeWarning.classList.add(".errorPhoto");
    }
}

btnAjoutPhoto.addEventListener("change", () => {
    //récupération info fichier
    let curFiles = input.files;
    //SI ficher ok
    if (fileType(file) && fileSize(number)) {
        //vider le contenu de choixPhoto
        choixPhoto.innerHTML = "";
        //affichage miniature
        const miniPhoto = createElement("img");
        miniPhoto.src = window.URL.createObjectURL(curFiles[i]);
        choixPhoto.appendChild(miniPhoto);
        miniPhoto.classList.add(".choixImg");
    };
});


//***** Affiche catégories dans menu déroulant **********************************
const selectCategories = document.getElementById("selectCategories");

function choixSelectCategory () {
    selectCategories.innerHTML = "";

    //option par défaut
    const choixVide = document.createElement("option");
    choixVide.innerText = "Sélectionnez une catégorie";
    choixVide.value = "";
    selectCategories.appendChild(choixVide);
    //option choix de catégorie
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.innerText = category.name;
        option.value = category.id
        selectCategories.appendChild(option);
    });
};


//***** Vérif champs Tilte rempli ************************************************
const choixTitle = document.getElementById("choixTitle");

function verifTitle () {
    //conformité titre
    let titleRegExp = new RegExp("[a-z._-]+@");
    if (choixTitle !== titleRegExp) {
        choixTitle.classList.add(".errorTitle");
    } else {
        return true;
    }
};


//***** Envoie form ajout photo **********************************************
const modalForm = document.querySelector(".form-modal");
const btnValider = document.getElementById("btnValider");

modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (btnAjoutPhoto(curFiles[i]) && choixSelectCategory(category.id) && verifTitle() === true) {
        //envoie formulaire à API
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                btnAjoutPhoto: curFiles.src,
                choixTitle: choixTitle.value,
                selectCategories: category.name})
        }).then(response => response.json())
    } else {
        //obligation de choisir image pour post
        if (curFiles.length === 0) {
            //l'image est considéré comme non choisie
            imgPhoto.style = "color: red";
            console.log("L'image n'a pas été choisie.");
        };
        //obligation de choisir une catégorie
        if (choixSelectCategoryelectCategory === choixVide) {
            choixSelectCategoryelectCategory.classList.add("errorSelect");
            console.log("La catégorie n'a pas été choisie.");
        };
        //obligation d'avoir le champ rempli
        if (choixTitle === "") {
            choixTitle.classList.add("errorTilte");
            console.log("Le champ Titre est vide.");
        };
    }
});