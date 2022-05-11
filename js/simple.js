import { addNavRedirectEvent, showContent, addWindowHistoryEvent } from "/js/router.js";
import { checkUservalidity } from "/js/validator.js";
import { getNormalNav, getNormalSide, getLoggedSide, getLoggedNav, setUsername} from "/js/navbar.js";
import { makeShadow } from "/js/modal.js";
import DBOperation from "/js/db.js";

const showNormalNavContent = async () => {
    const navArea = document.getElementById("header-wrapper");
    const sideArea = document.getElementById("main-wrapper");
    navArea.appendChild(await getNormalNav());
    sideArea.insertAdjacentElement("afterbegin",await getNormalSide());
}

const showLoggedNavContent = async () => {
    const navArea = document.getElementById("header-wrapper");
    const sideArea = document.getElementById("main-wrapper");
    navArea.appendChild(await getLoggedNav());
    sideArea.insertAdjacentElement("afterbegin", await getLoggedSide());
}

const showNavContent = async () => {
    const result = await checkUservalidity();
    if(result !==""){
        await showLoggedNavContent();
        setUsername(result);
    }
    else{
        await showNormalNavContent();
        setUsername(result);
    }
}

const setSidemenuExpandEvent = () => {
    const sideMenuExpandButton = document.getElementById('side-menu-expand-button');
    sideMenuExpandButton.addEventListener('click', (e)=>{
        e.preventDefault();
        makeShadow(toggleSideMenu);
        toggleSideMenu();
    });
}

const toggleSideMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('collapse');
}

const pageStart = async () =>{    
    const body = document.getElementsByTagName("body");
    await showNavContent();
    showContent().then(()=>{
        addNavRedirectEvent();
        addWindowHistoryEvent();
        setSidemenuExpandEvent();
        body[0].classList.toggle('hide');
    });
}

pageStart();