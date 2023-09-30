/********** CONSTANTES **********/
//récupération DOM
const portfolio = document.getElementById("portfolio");
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

for (i = 0; i > works.length; i++) {
    afficherWorks(i)
}