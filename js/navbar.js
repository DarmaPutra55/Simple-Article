import { logout }  from '/js/logout.js';

export const addLogoutEvent = () => {
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

export const makeSideMenuShadow = () => {
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

export const setSideMenu = () => {
    setSideMenuShadowPos();
    setSideMenuPos();
}


export const toggleSideMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('collapse');
}

export const setUsername = (username) => {
    const usernameText = document.getElementsByClassName('username-text');
    for(let element of usernameText){
        element.textContent = username;
    }
}

export const getNav = async (nav) => {
    if(nav === "normal"){
        return await getNormalNav();
    }
    else{
        return await getLoggedNav();
    }
}

export const getSide = async (nav) => {
    if(nav === "normal"){
        return await getNormalSide();
    }
    else{
        return await getLoggedSide();
    }
}

const getNormalNav = async () => {
    const content = await fetchContent("/view/navbar/normalNavBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-menu-wrapper');
    wrapper.id = "header-menu";
    wrapper.innerHTML = content;
    return wrapper;
}

const getNormalSide = async () => {
    const content = await fetchContent("/view/navbar/normalSideBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu-wrapper', 'collapse');
    wrapper.id = "side-menu";
    wrapper.innerHTML = content;
    return wrapper;

}

const getLoggedSide = async () => {
    const content = await fetchContent("/view/navbar/loggedSideBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu-wrapper', 'collapse');
    wrapper.id = "side-menu";
    wrapper.innerHTML = content;
    return wrapper;

}

const getLoggedNav = async () => {
    const content = await fetchContent("/view/navbar/loggedNavBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-menu-wrapper');
    wrapper.id = "header-menu";
    wrapper.innerHTML =  content;
    return wrapper;
}