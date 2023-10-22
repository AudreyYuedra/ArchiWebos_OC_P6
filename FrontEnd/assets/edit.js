/********** IMPORT **********/
import {filters} from "./script.js";

/********** CONSTANTES **********/
const online = localStorage.getItem("Token");
export {online};

const log = document.getElementById("log");
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

//ajout btn déco
function logout () {
    log.innerText = "logout";
}


/********** ECOUTEURS D'EVENEMENTS **********/
//modif quand connecté
document.addEventListener("DOMContentLoaded", () => {
    if (online) {
        showEdition();
        hiddenFilters();
        logout();
    }
});

log.addEventListener("click", () => {
    //suppr token
    localStorage.removeItem("Token", token);
    //rediretion
    window.location.replace("login.html");
})