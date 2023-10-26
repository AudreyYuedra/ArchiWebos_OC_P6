        /////////////////////////////////////////////////
        /******************** INDEX ********************/

//****** Ajout works dans portfolio ***************************************
const gallery = document.querySelector(".gallery");
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
        deleteIcon.addEventListener("click", () => {
            //récupére attribut icône suppr
            const workId = deleteIcon.getAttribute("data-id");
        
            fetch("http://localhost:5678/api/works/" + workId, {
                method: "DELETE",
                headers: {"Authorization" : `Bearer ${online.token}`}
            }).then(response => {
                //récupérer element sur lequel on a cliqué
                let index = (work) => {work.id === workId};
                //suppr element html
                deleteIcon.parentElement.remove();
                //suppr element tableau
                works.splice(index, 1);
                //rafraîchi contenu works après suppr
                function refreshProjet (works) {
                    modalWorks.innerHTML = "";
                    //bouche et afficher chauque img avec forEach comen haut avec new tabl
                    works.forEach((work) => {
                        const figureModal = document.createElement("figure-modal");
                        const img = document.createElement("img");
                        img.src = work.imageUrl
                        img.alt = work.title    
                        figureModal.appendChild(img);
                        modalWorks.appendChild(figureModal);
                        //suppr icône
                        deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" data-id="${work.id}"></i>`;
                        img.appendChild(deleteIcon);
                    });
                };
            }).catch(error => {
                    console.error("Erreur de récupération de travaux.", error)
            });
        });

        //garder la suppr même après F5
    });
};


//***** Ouverture de la modale ****************************************
const jsModal = document.getElementById("js-modal");
const modal = document.getElementById("modal");

jsModal.addEventListener("click", (event) => {
    modal.showModal();
    modifWorks(works);
});


//***** Fermeture de la modale ****************************************
const closeMark = document.getElementById("close");

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.closeModal();
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
    choixSelectCategory();
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
const imgPhoto = document.querySelector(".fa-image");
const limiteFormat = document.querySelector("choixPhoto p");

/*function ajouterPhoto () {
    //btnAjoutPhoto.style.display = "none";
    //limiteFormat.style.display = "none";
    //imgPhoto.style.display = "none"
    //afficher photo choisie à la place de l'icône img
    let choixWorkImg = input.files.value;
    choixWorkImg.classList.add("choixImg");
};*/

btnAjoutPhoto.addEventListener("click", (event) =>{
    event.preventDefault();
    //ajouterPhoto();
});


//***** Affiche catégories dans menu déroulant **********************************
const selectCategories = document.getElementById("selectCategories");

function choixSelectCategory () {
    //option par défaut
    const choixVide = document.createElement("option");
    choixVide = appendChild(selectCategories);
    choixVide.innerText = "Sélectionnez une catégorie"
    //option choix de catégorie
    categories.forEach((category) => {
        const choixCategory = document.createElement("option");
        choixCategory.innerText = category.name
        choixCategory.appendChild(selectCategories);
    });
};


//***** Vérif champs remplis ************************************************
const choixTilte = document.getElementById("choixTilte");
const selectCategory = document.querySelector("select");
const btnValider = document.getElementById("btnValider");

function verifImage () {
    //obligation de choisir image
    if (imgPhoto) {
        //l'image est considéré comme non choisie
        imgPhoto.style = "color: red";
        console.log("L'image n'a pas été choisie.");
    } else {
        choixWorkImg === true;
    }
};

function verifTilte () {
    //obligation d'avoir le champ rempli
    if (choixTilte === "") {
        choixTilte.classList.add("errorTilte");
        console.log("Le champ Titre est vide.");
    } else {
        choixTilte === true;
    }
};

function verifCategory () {
    //obligation de choisir une catégorie
    if (selectCategory === "") {
        selectCategory.classList.add("errorSelect");
        console.log("La catégorie n'a pas été choisie.");
    } else {
        selectCategory === true;
    }
};

//SI champ complets => changer couleur btnValider
if (verifImage() && verifTilte() && verifCategory()) {
    btnValider.style.replace("color: #B9C5CC", "color: 1D6154");
};

//***** Envoie form ajout photo **********************************************
const modalForm = document.querySelector(".form-modal");

/*modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if(verifImage() && verifTilte() && verifCategory()) {
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: //je ne sais pas quoi mettre
            }).then(response => response.json())
            .then ()
    };
});*/