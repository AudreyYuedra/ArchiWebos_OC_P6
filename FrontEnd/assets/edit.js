/********** IMPORT **********/
import {filters} from "./script.js";


/********** CONSTANTES **********/
const online = localStorage.getItem("Token");

const headband = document.querySelector(".headband");
const edit = document.querySelector(".edit");


/********** FONCTIONS **********/
//affiche mode édition quand connecté
function showEdition () {
    headband.style.display = "inline-block";
    headband.removeAttribute("aria-hidden");

    edit.style.display = "inline-block";
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
    if (online) {
        showEdition();
        hiddenFilters();
    }
});
