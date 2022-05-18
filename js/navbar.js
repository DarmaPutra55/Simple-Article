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
    const side = document.getElementById('side-wrapper');
    const shadow = document.createElement('div');
    shadow.id = "side-menu-shadow";
    shadow.classList.add('modal-shadow');
    side.insertAdjacentElement('afterbegin', shadow);
    stopSroll();

    shadow.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-shadow')){
            shadow.remove();  
            stopSroll();
            toggleSideMenu();
        }
    });
}

const setSide = () =>{
    const side = document.getElementById('side-wrapper');
    side.style.top = (window.scrollY)+"px";
} 

const stopSroll = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('stop-scroll');
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
    sideMenuExpandButton.addEventListener('click', (e)=>{
        e.preventDefault();
        makeSideMenuShadow();
        setSide();
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
    addNavRedirectEvent();
}
