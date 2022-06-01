//Handle sidebar and navbar logic. Will only be used on simple.js and router.js

import { logout }  from '/js/logout.js';
import { getCookieUsername } from '/js/getUsername.js';
import { addNavRedirectEvent } from '/js/router.js';

const addLogoutEvent = () => {
    const logoutButton = document.getElementsByClassName("logout-button");
    for(let element of logoutButton){
        element.addEventListener('click', (e)=> {
            e.preventDefault();
            logout();
        });
    }
}

const fetchContent = async (link) => {
    const response = await fetch(link);
    const result = await response.text();
    return result;
}

const setSideMenuEvent = () => {
    const side = document.getElementById("side-wrapper");
    side.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-shadow')){
            toggleSideMenu();
        }
    });
}

const stopSroll = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('stop-scroll');
}


const toggleSideMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    const shadow = document.getElementById('shadow');
    sideMenu.classList.toggle('collapse');
    shadow.classList.toggle("hide");  
    stopSroll();
}

const setUsername = () => {
    const usernameText = document.getElementsByClassName('username-text');
    const username = getCookieUsername();
    for(let element of usernameText){
        element.textContent = username;
    }
}

const showLoggedNavContent = async () => {
    const header = document.getElementById("header-wrapper");
    const side = document.getElementById("side-wrapper");
    header.appendChild(await getNav("logged"));
    side.insertAdjacentElement("afterbegin", await getSide("logged"));
}

const showNormalNavContent = async () => {
    const header = document.getElementById("header-wrapper");
    const side = document.getElementById("side-wrapper");
    header.appendChild(await getNav("normal"));
    side.insertAdjacentElement("afterbegin",await getSide("normal"));
}

const setSidemenuExpandEvent = () => {
    const sideMenuExpandButton = document.getElementById('side-menu-expand-button');
    setSideMenuEvent();
    sideMenuExpandButton.addEventListener('click', (e)=>{
        e.preventDefault(); 
        setSide((window.scrollY)+"px");
        toggleSideMenu();
    });
}


const setNav = async (status) => {
    setSidemenuExpandEvent();

    if(status){
        await showLoggedNavContent();
        setUsername();
        addLogoutEvent();
        addNavRedirectEvent();
    }

    else{
        await showNormalNavContent();
        addNavRedirectEvent();
    }
    
}

const getNav = async (nav) => {
    if(nav === "normal"){
        return await getNormalNav();
    }
    else{
        return await getLoggedNav();
    }
}

const getSide = async (nav) => {
    if(nav === "normal"){
        return await getNormalSide();
    }
    else{
        return await getLoggedSide();
    }
}

const getNormalNav = async () => {
    const content = await fetchContent("/view/navBar/normalNavBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-menu-wrapper');
    wrapper.id = "header-menu";
    wrapper.innerHTML = content;
    return wrapper;
}

const getNormalSide = async () => {
    const content = await fetchContent("/view/navBar/normalSideBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu-wrapper', 'collapse');
    wrapper.id = "side-menu";
    wrapper.innerHTML = content;
    return wrapper;

}

const getLoggedSide = async () => {
    const content = await fetchContent("/view/navBar/loggedSideBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu-wrapper', 'collapse');
    wrapper.id = "side-menu";
    wrapper.innerHTML = content;
    return wrapper;

}

const getLoggedNav = async () => {
    const content = await fetchContent("/view/navBar/loggedNavBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-menu-wrapper');
    wrapper.id = "header-menu";
    wrapper.innerHTML =  content;
    return wrapper;
}

export const showNav = async (status) =>{
    await setNav(status);
    //addNavRedirectEvent();
}

export const setSide = (position) =>{
    const side = document.getElementById('side-wrapper');
    side.style.top = position;
} 
