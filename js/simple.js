import { addNavRedirectEvent, showContent, addWindowHistoryEvent } from "/js/router.js";
import { checkUservalidity } from "/js/validator.js";
import { getNormalNav, getNormalSide, getLoggedSide, getLoggedNav} from "/js/navbar.js";
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
    if(checkUservalidity() !==""){
        await showNormalNavContent();
    }
    else{
        await showLoggedNavContent();
    }
}


const pageStart = async () =>{    
    await showNavContent()
    addNavRedirectEvent();
    showContent();
    addWindowHistoryEvent();
}



pageStart();