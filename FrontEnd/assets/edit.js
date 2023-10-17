/********** IMPORT **********/
import {filters} from "./script.js";
//import {fetchWorks} from "./script.js";
//import {token} from "./script.js";

/********** CONSTANTES **********/
const localStorage = sessionStorage.getItem("Token");

const headband = document.querySelector(".headband");
const edit = document.querySelector("edit");


/********** FONCTIONS **********/
//affiche mode édition quand connecté
function showEdition () {
    headband.style.display = "null";
    headband.removeAttribute("aria-hidden");

    edit.style.display = "null";
    edit.removeAttribute("aria-hidden");
}

//cache filtres quand connecté
function hiddenFilters () {
    filters.style.display = "none";
    filters.setAttribute("aria-hidden", "true");
}


/********** ECOUTEURS D'EVENEMENTS **********/
//modif quand connecté
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("Token")) {
        showEdition();
        hiddenFilters();
    }
});
