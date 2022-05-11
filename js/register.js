import DBOperation from "/js/db.js";

//Login Start
const setRegisterButtonEvent = ()=>{
    const registerMenuUsername = document.getElementById('register-menu-username');
    const registerMenuPassword = document.getElementById('register-menu-password');
    const registerMenuButton = document.getElementById('register-menu-button');
    registerMenuButton.addEventListener('click', async (e)=> {
        e.preventDefault();
        const db = new DBOperation();
        const registerResult = await db.registerUser(registerMenuUsername.value, registerMenuPassword.value);
        const trimmedUsername = (registerMenuUsername.value).trim();
        const trimmedPassword = (registerMenuPassword.value).trim();
        if(trimmedUsername == "" && trimmedPassword == ""){
            alert("Please fill the form first!");
            return;
        }
        
        if(registerResult.success === "ok"){
            const loginResult = await db.loginUser(trimmedUsername, trimmedPassword);
            if(loginResult.success === "ok"){
                    alert("Register sucess!");
            }
            else{
                    alert("Login failed!");  
                }
            window.location.href = "/index";
        }

        else if(registerResult.error === "username-exist"){
            alert("Username already exist!");
        }

        else{
            alert("Register failed!");
        }
        
    });
}

const setRegisterButtonClearEvent = () => {
    const registerMenuUsername = document.getElementById('register-menu-username');
    const registerMenuPassword = document.getElementById('register-menu-password');
    const clearMenuButton = document.getElementById('register-menu-clear');

    clearMenuButton.addEventListener('click', (e)=>{
        e.preventDefault();
        registerMenuPassword.value = "";
        registerMenuUsername.value = "";
    });
}


export const getContent = async () => {
    const response = await fetch("/view/register.html");
    const result = await response.text();
    return result;
}

export const setUpRegister = ()=>{
    setRegisterButtonEvent();
    setRegisterButtonClearEvent();
}
//Login End