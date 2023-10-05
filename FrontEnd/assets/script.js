/********** CONSTANTES **********/
//récupération DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");


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
    const filterAll = document.createElement("tous");
    //position élément
    filters.appendChild(filterAll);
    //nom
    filterAll.innerText = "Tous"
    //lien CSS
    filterAll.classList.add("btnFilter");
    //création éléments via boucle
    categories.forEach(category => {
        const btnFilter = document.createElement("btnFilter");
        //assignements
        btnFilter.innerText = category.name
        //position éléments
        filters.appendChild(btnFilter);
        //lien CSS
        btnFilter.classList.add("btnFilter");
    })
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
 });