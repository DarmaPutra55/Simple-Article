import DBOperation from "/js/db.js";

//Login Start
export const loginMenuEvent = ()=>{
    const loginMenu = document.getElementById('login-menu');
    loginMenu.classList.toggle("collapse");
}

export const checkLoginMenuState = () =>{
    const loginMenu = document.getElementById('login-menu');
    return loginMenu.classList.contains('collapse');
}

const setLoginButtonEvent = ()=>{
    const loginMenuUsername = document.getElementById('login-menu-username');
    const loginMenuPassword = document.getElementById('login-menu-password');
    const loginMenuButton = document.getElementById('login-menu-button');
    loginMenuButton.addEventListener('click', async ()=> {
        const trimmedUsername = (loginMenuUsername.value).trim();
        const trimmedPassword = (loginMenuPassword.value).trim();
        if(trimmedUsername !=="" && trimmedPassword !== ""){
            const db = new DBOperation();
            const result = await db.loginUser(loginMenuUsername.value, loginMenuPassword.value);
            if(result.success === "ok"){
                alert("Login sucess!");
                location.reload();
            }

            else{
                alert("Login failed!");
            }
            
        
        }
        else{
            alert("Please fill the form!");
        }
    });
}

const setLoginButtonClearEvent = () => {
    const loginMenuUsername = document.getElementById('login-menu-username');
    const loginMenuPassword = document.getElementById('login-menu-password');
    const clearMenuButton = document.getElementById('login-menu-clear');

    clearMenuButton.addEventListener('click', ()=>{
        loginMenuPassword.value = "";
        loginMenuUsername.value = "";
    });    
}

const addLogin = async (parentElement) => {
    const response = await fetch("/view/login.html");
    const result = await response.text();
    const container = document.createElement('div');
    container.innerHTML = result;
    parentElement.appendChild(container);
}

export const setUpLogin = (parentElement)=>{
    addLogin(parentElement).then(()=>{
        setLoginButtonEvent();
        setLoginButtonClearEvent();
    });
    
}
//Login End