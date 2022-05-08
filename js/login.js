import DBOperation from "/js/db.js";

//Login Start
const setLoginMenuEvent = ()=>{
    const loginButton = document.getElementById('login-button');
    const loginMenu = document.getElementById('login-menu');
    loginButton.addEventListener('click', ()=>{
        loginMenu.classList.toggle("collapse");
    });
}

const setLoginButtonEvent = ()=>{
    const loginMenuUsername = document.getElementById('login-menu-username');
    const loginMenuPassword = document.getElementById('login-menu-password');
    const loginMenuButton = document.getElementById('login-menu-button');
    const trimmedUsername = (loginMenuUsername.value).trim();
    const trimmedPassword = (loginMenuPassword.value).trim();
    if(trimmedUsername !=="" && trimmedPassword !== ""){
        loginMenuButton.addEventListener('click', async ()=> {
            const db = new DBOperation();
            const result = await db.loginUser(loginMenuUsername.value, loginMenuPassword.value);
            if(result.success === "ok"){
                alert("Login sucess!");
                location.reload();
            }

            else{
                alert("Login failed!");
            }
            
        });
    }
    else{
        alert("Please fill the form!");
    }
}

const setLoginButtonClearEvent = () => {
    const loginMenuUsername = document.getElementById('login-menu-username');
    const loginMenuPassword = document.getElementById('login-menu-password');
    const clearMenuButton = document.getElementById('login-menu-clear');

    clearMenuButton.addEventListener('click', ()=>{
        loginMenuPassword.textContent = "";
        loginMenuUsername.textContent = "";
    });    
}

export const setUpLogin = ()=>{
    setLoginMenuEvent();
    setLoginButtonEvent();
    setLoginButtonClearEvent();
}
//Login End