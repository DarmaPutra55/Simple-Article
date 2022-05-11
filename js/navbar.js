export const addLogoutEvent = (element) => {
    element.addEventListener('click', (e)=> {
        e.preventDefault();
        
    });
}

const fetchContent = async (link) => {
    const response = await fetch(link);
    const result = await response.text();
    return result;
}

export const setUsername = (username) => {
    const usernameText = document.getElementsByClassName('username-text');
    for(let element of usernameText){
        element.textContent = username;
    }
}

export const getNormalNav = async () => {
    const content = await fetchContent("/view/navbar/normalNavBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-menu-wrapper');
    wrapper.id = "header-menu";
    wrapper.innerHTML = content;
    return wrapper;
}

export const getNormalSide = async () => {
    const content = await fetchContent("/view/navbar/normalSideBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu-wrapper', 'collapse');
    wrapper.id = "side-menu";
    wrapper.innerHTML = content;
    return wrapper;

}

export const getLoggedSide = async () => {
    const content = await fetchContent("/view/navbar/loggedSideBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu-wrapper', 'collapse');
    wrapper.id = "side-menu";
    wrapper.innerHTML = content;
    return wrapper;

}

export const getLoggedNav = async () => {
    const content = await fetchContent("/view/navbar/loggedNavBar.html");
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-menu-wrapper');
    wrapper.id = "header-menu";
    wrapper.innerHTML =  content;
    return wrapper;
}