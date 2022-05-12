import { addNavRedirectEvent, showContent, addWindowHistoryEvent } from "/simplePHPFetch/js/router.js";
import { getUsername } from "/simplePHPFetch/js/getUsername.js";
import { addLogoutEvent, getNav, getSide, setUsername, makeSideMenuShadow, toggleSideMenu, setSideMenu } from "/simplePHPFetch/js/navbar.js";
import DBOperation from "/simplePHPFetch/js/db.js";

const showNormalNavContent = async () => {
    const navArea = document.getElementById("header-wrapper");
    const sideArea = document.getElementById("main-wrapper");
    navArea.appendChild(await getNav("normal"));
    sideArea.insertAdjacentElement("afterbegin",await getSide("normal"));
}

const showLoggedNavContent = async () => {
    const navArea = document.getElementById("header-wrapper");
    const sideArea = document.getElementById("main-wrapper");
    navArea.appendChild(await getNav("logged"));
    sideArea.insertAdjacentElement("afterbegin", await getSide("logged"));
}

const showNavContent = async () => {
    const result = await getUsername();
    if(result !==""){
        await showLoggedNavContent();
        setUsername(result);
    }
    else{
        await showNormalNavContent();
        setUsername(result);
    }
    addLogoutEvent();
}

const setSidemenuExpandEvent = () => {
    const sideMenuExpandButton = document.getElementById('side-menu-expand-button');
    sideMenuExpandButton.addEventListener('click', (e)=>{
        e.preventDefault();
        makeSideMenuShadow();
        setSideMenu();
        toggleSideMenu();
    });
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