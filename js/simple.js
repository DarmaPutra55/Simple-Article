import { showContent, addWindowHistoryEvent } from "/js/router.js";
import { cekCookiesUsername, setCookiesUsername, getUsername } from "/js/getUsername.js";
import { showNav } from "/js/navbar.js";
//import DBOperation from "/js/db.js";



const setViewportHeight = () => {
    const viewport = document.getElementById('viewport');
    viewport.setAttribute('content', viewport.getAttribute('content') + ", height="+window.innerHeight);
}

const pageStart = async () =>{    
    const body = document.getElementsByTagName("body");
    const username = await getUsername()
    setViewportHeight();

    if(username !== ""){
        setCookiesUsername(username);
    }

    await showNav(cekCookiesUsername());
    await showContent()
    addWindowHistoryEvent();
    //body[0].classList.toggle('hide');
}

pageStart();