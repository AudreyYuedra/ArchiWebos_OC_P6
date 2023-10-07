/********** CONSTANTES **********/
//récupération DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const btn = document.querySelectorAll("button");


/********** VARIABLES **********/


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
    works.forEach(work => {
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
    //création éléments via boucle
    categories.forEach(category => {
        const btnFilter = document.createElement("button");
        //assignements
        btnFilter.innerText = category.name
        //position éléments
        filters.appendChild(btnFilter);
        //lien CSS
        btnFilter.classList.add("btnFilter");
    })
}

// affichage filtre
function filterAll(categories) {
    //affichage de base
    btn[0].classList.add(".filter_selected"); //prb nom btn
    //affiche tous les travaux
    const btnAll = categories.filter(function(category) {
        return category.id === 1 + 2 + 3;  // j'hésite avec &
    });
    //lien CSS
    btn.classList.remove("filter_selected");
    btnAll.classList.add(".filter_selected");

    console.log("Vous avez cliqué sur le filtre \"Tous\".");
}

function filterObject(categories) {
    //affiche travux type objets
    const btnObject = btn[1];  //prb nom btn
    btnObject = categories.filter(function(category) {
        return category.id === 1;
    });
    //lien CSS
    btn.classList.remove("filter_selected");
    btnObject.classList.add("filter_selected");

    console.log("Vous avez cliqué sur le filtre \"Objets\".");
}

function filterAppart(categories) {
    //affiche travaux type appartements
    const btnAppart = btnFilter[1];   //prb nom btn
    btnAppart = categories.filter(function(category) {
        return category.id === 2;
    });
    //lien CSS
    btn.classList.remove("filter_selected");
    btnAppart.classList.add("filter_selected");

    console.log("Vous avez cliqué sur le filtre \"Appartements\".");
}

function filterHotelResto(categories) {
    //affiche type hotels & resto
    const btnHotelResto = btnFilter[2];   //prb nom btn
    btnHotelResto = categories.filter(function(category) {
        return category.id === 3;
    });
    //lien CSS
    btn.classList.remove("filter_selected");
    btnHotelResto.classList.add("filter_selected");

    console.log("Vous avez cliqué sur le filtre \"Hôtels & Restaurants\".");
}

/********** AUTRES **********/
 document.addEventListener("DOMContentLoaded", () => {
    fetchWorks()
        .then(works => {
            afficherWorks(works);
        });
    fetchCategories()
        .then(categories => {
            afficherCategories(categories);
        });
    filterAll();
 });

 button.addEventListener("click", () => {
    filterAll();
    filterObject();
    filterAppart();
    filterHotelResto();
 });