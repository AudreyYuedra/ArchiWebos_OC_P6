/********** CONSTANTES **********/
//récupération DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

export {filters};

/********** VARIABLES **********/
let works = [];

/********** FONCTIONS **********/
//requête API ressource works
function fetchWorks(){
    return fetch("http://localhost:5678/api/works")
        .then(response => response.json()) //mettre paraenthèse pour contenu
        .catch(error => {
            console.error("Erreur de récupération de travaux.", error)
        });
}

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
}
//export {works};

//requête API ressource categories
function fetchCategories(){
    return fetch("http://localhost:5678/api/categories")
        .then(response => response.json()) //mettre paraenthèse pour contenu
        .catch(error => {
            console.error("Erreur de récupération des catégories.", error)
        });
}

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
}
//export {categories};


/********** ECOUTEURS D'EVENEMENTS **********/
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

//filters foctionnels
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


//////////////////////////////////////////////
///////////////////////////////////

//***** Ajout works dans modale *********************************
const modalWorks = document.querySelector(".modal-works");
const deleteIcon = document.createElement("a");

function modifWorks(works) {
    modalWorks.innerHTML = "";
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

        deleteIcon.addEventListener("click", () => {
            //récupére attribut ic^ne suppr
            const workId = deleteIcon.getAttribute("data-id");
    
            fetch("http://localhost:5678/api/works/" + workId, {
                method: "DELETE",
                headers: {Authorization: "Bearer " + online.token},
                }).then(response => {
                    //récupéer element sur lequer on a cliqué
                    //delet incon. paretnElement.remove()
                    //var index = works.findindex(work => {work.id} == workId)
                    //works.splice(index, 1)
                    // function refresh projet (works)
                    //query selctoe galery => la vider
                    //bouche et afficher chauque img avec forEach comen haut avec new tabl
                })
                .catch(error => {
                    console.error("Erreur de récupération de travaux.", error)
                });
        });
    });
};


//***** Affiche modal-works *********************************************
document.addEventListener("DOMContentLoaded", () => {
    modifWorks();
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