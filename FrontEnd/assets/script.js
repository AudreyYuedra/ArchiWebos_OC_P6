/********** CONSTANTES **********/
//récupération DOM
const categories = document.querySelectorAll(".category");
const gallery = document.querySelector(".gallery");


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
        img.src = work.imageUrl  //pas de guillemets
        img.alt = work.title   //pas de guillemets
        figcaption.textcontent = work.title
        //position éléments
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    })
}


/********** AUTRES **********/

//SI filtre d'orifgine sélectionné
/*if (i === ) {
    categorie0.classList.add("filtre_selected");
}*/

/*categorie0.addEventListener("click", function () {
   const filtreTous = works.filter(function (works) {
       return works;
   });
   //enlever CSS
   categorie.classList.remove("filtre_selected");
   //ajout CSS
   categorie0.classList.add("filtre_selected");

   console.log("Filtre Tous affiché.");
});

categorie1.addEventListener("click", function () {
   const filtreObjets = works.filter(function (works) {
       return works.1;
   });
    //enlever CSS
    categorie.classList.remove("filtre_selected");
    //ajout CSS
    categorie1.classList.add("filtre_selected");

    console.log("Filtre Objets affiché.");
});

categorie2.addEventListener("click", function () {
    const filtreAppartements = works.filter(function (works) {
        return works.2;
    });
    //enlever CSS
    categorie.classList.remove("filtre_selected");
    //ajout CSS
    categorie2.classList.add("filtre_selected");
    
    console.log("Filtre Appartements affiché.");
 });

categorie3.addEventListener("click", function () {
    const filtreHotelResto = works.filter(function (works) {
        return works.3;
    });
   //enlever CSS
    categorie.classList.remove("filtre_selected");
    //ajout CSS
    categorie3.classList.add("filtre_selected");
    
    console.log("Filtre Hôtels & Restaurants affiché.");
 });*/

 document.addEventListener("DOMContentLoaded", () => {
    fetchWorks()
        .then(works => {
            afficherWorks(works);
        });
 });