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

const makeSideMenuShadow = () => {
    const body = document.getElementsByTagName('body')[0];
    const shadow = document.createElement('div');
    shadow.id = "side-menu-shadow";
    shadow.classList.add('modal-shadow');
    body.insertAdjacentElement('afterbegin', shadow);
    stopSroll();

    shadow.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-shadow')){
            shadow.remove();  
            stopSroll();
            toggleSideMenu();
        }
    });
}

const setSideMenuShadowPos = () =>{
    const sideMenuShadow = document.getElementById('side-menu-shadow');
    sideMenuShadow.style.top = (window.scrollY)+"px";
} 


const setSideMenuPos = () =>{
    const sideMenu = document.getElementById('side-menu');
    sideMenu.style.top = (window.scrollY)+"px";
} 

const stopSroll = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('stop-scroll');
}

const setSideMenu = () => {
    setSideMenuShadowPos();
    setSideMenuPos();
}


const toggleSideMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('collapse');
}

const setUsername = () => {
    const usernameText = document.getElementsByClassName('username-text');
    const username = getCookieUsername();
    for(let element of usernameText){
        element.textContent = username;
    }
}

const showLoggedNavContent = async () => {
    const navArea = document.getElementById("header-wrapper");
    const sideArea = document.getElementById("main-wrapper");
    navArea.appendChild(await getNav("logged"));
    sideArea.insertAdjacentElement("afterbegin", await getSide("logged"));
}

const showNormalNavContent = async () => {
    const navArea = document.getElementById("header-wrapper");
    const sideArea = document.getElementById("main-wrapper");
    navArea.appendChild(await getNav("normal"));
    sideArea.insertAdjacentElement("afterbegin",await getSide("normal"));
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

export const showNav = async (status) =>{
    await setNav(status);
    addNavRedirectEvent();
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