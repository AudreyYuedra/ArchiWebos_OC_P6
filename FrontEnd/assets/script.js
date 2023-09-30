/********** CONSTANTES **********/
//récupération DOM
const filtres = document.querySelectorAll("filtres div");
const tous = document.getElementById("tous");
const objets = document.getElementById("objets");
const appartements = document.getElementById("appartements");
const hotelResto = document.getElementById("hotelResto");
const gallery = document.getElementsByClassName("gallery");

//requête API ressource works
const works = fetch("http://localhost:5678/api/works").then(function() {
    const reponse = works.json();
});
console.log(works);

/********** VARIABLES **********/



/********** FONCTIONS **********/
function afficherWorks(i) {
    //création éléments
    let work = document.createElement("figure");
    let img = document.createElement("img");
    let title = document.createElement("figcaption");
    //position éléments
    gallery.appendChild(figure);
    figure.appendChild(img, figcaption);
    //lien CSS
    img.classList.add("gallery img");
}

function filtreEvent () {
    if ("click") {
        //ajout style CSS
        filtres.classList.add(".filtre_selected");
    }
};

/********** AUTRES **********/
for (i = 0; i > works.length; i++) {
    afficherWorks(i)
}


tous.addEventListener("click", function () {
   const filtreTous = works.filter(function (works) {
       return works;
   });
});

objets.addEventListener("click", function () {
   const filtreObjets = works.filter(function (works) {
       return works.;
   });
});

appartements.addEventListener("click", function () {
    const filtreAppartements = works.filter(function (works) {
        return works.;
    });
 });

 hotelResto.addEventListener("click", function () {
    const filtreHotelResto = works.filter(function (works) {
        return works.;
    });
 });