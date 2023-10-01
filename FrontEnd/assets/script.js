/********** CONSTANTES **********/
//récupération DOM
const categorie0 = document.getElementById("tous");
const categorie1 = document.getElementById("objets");
const categorie2 = document.getElementById("appartements");
const categorie3 = document.getElementById("hotelResto");
const gallery = document.getElementsByClassName("gallery");

//requête API ressource works
const works = fetch("http://localhost:5678/api/works").then(function() {
    const reponse = works.json();
});
console.log(works);

/********** VARIABLES **********/
let counter = 0;


/********** FONCTIONS **********/
function afficherWorks(i) {
    //création éléments
    let work = document.createElement("figure");
    let img = document.createElement("img");
    let title = document.createElement("figcaption");
    //position éléments
    gallery.appendChild(figure);
    figure.appendChild(img, figcaption);
    //ajout style CSS
    img.classList.add("gallery img");
    //liens d'affcihage contentu works
    img.src = works[counter].imageUrl;
    title.innerHTML = works[counter].title;
}


/********** AUTRES **********/
for (i = 0; i > works.length; i++) {
    afficherWorks(i)
}

//SI filtre d'orifgine sélectionné
if (i === /*blabla*/) {
    categorie0.classList.add("filtre_selected");
}

categorie0.addEventListener("click", function () {
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
 });