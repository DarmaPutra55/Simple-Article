import DBOperation from "/js/db.js";

//Login Start

const setLoginButtonEvent = ()=>{
    const loginMenuUsername = document.getElementById('login-menu-username');
    const loginMenuPassword = document.getElementById('login-menu-password');
    const loginMenuButton = document.getElementById('login-menu-button');
    loginMenuButton.addEventListener('click', async (e)=> {
        e.preventDefault();
        const trimmedUsername = (loginMenuUsername.value).trim();
        const trimmedPassword = (loginMenuPassword.value).trim();
        
        if(trimmedUsername =="" || trimmedPassword == ""){
            alert("Please fill the form first!");
            return;
        }

        const db = new DBOperation();
        const result = await db.loginUser(loginMenuUsername.value, loginMenuPassword.value);
        if(result.success === "ok"){
            alert("Login sucess!");
            window.location.href = "/index";
        }

        else{
            alert("Login failed!");
        }
    });
}

const setLoginButtonClearEvent = () => {
    const loginMenuUsername = document.getElementById('login-menu-username');
    const loginMenuPassword = document.getElementById('login-menu-password');
    const clearMenuButton = document.getElementById('login-menu-clear');

    clearMenuButton.addEventListener('click', (e)=>{
        e.preventDefault();
        loginMenuPassword.value = "";
        loginMenuUsername.value = "";
    });    
}

export const getContent = async () => {
    const response = await fetch("/view/login.html");
    const result = await response.text();
    return result;
}

export const setUpLogin = ()=>{
    setLoginButtonEvent();
    setLoginButtonClearEvent(); 
}
//Login End