import { getEnglishImprint } from "./imprint.js";
import { getEnglishDataprotection } from "./dataprotection.js";
import { setDetailedCardCloseListener } from "./main.js";


function getUserInfo() {
    return /*html*/`
        <div id="userinfo" class="userinfo">
            <div class="closeButton clickable" onclick="closeOverlay()">
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
           
        </div>  
    `;
}


export function openImprint() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = "flex";
    overlay.innerHTML = getUserInfo();
    let userinfo = document.getElementById('userinfo');
    userinfo.innerHTML += getEnglishImprint();
    console.log('Imprint');

}


export function openDataprotection() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = "flex";
    overlay.innerHTML = getUserInfo();
    let userinfo = document.getElementById('userinfo');
    userinfo.innerHTML += getEnglishDataprotection();    
    console.log('Dataprotection');
    
}


function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}


window.openDataprotection = openDataprotection;
window.openImprint = openImprint;
window.closeOverlay = closeOverlay;