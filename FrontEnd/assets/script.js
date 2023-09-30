/********** CONSTANTES **********/
//récupération DOM
const gallery = document.getElementsByClassName("gallery");

//requête API ressource works
const works = await fetch("http://localhost:5678/api/works");
const reponse = works.json();
console.log(works);

/********** VARIABLES **********/



/********** FONCTIONS **********/
