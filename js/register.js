import DBOperation from "/js/db.js";

//Login Start
export const registerMenuEvent = ()=>{
    const registerMenu = document.getElementById('register-menu');
    registerMenu.classList.toggle('collapse');
}

export const checkRegisterMenuState = () =>{
    const registerMenu = document.getElementById('register-menu');
    return registerMenu.classList.contains('collapse');
}

const setRegisterButtonEvent = ()=>{
    const registerMenuUsername = document.getElementById('register-menu-username');
    const registerMenuPassword = document.getElementById('register-menu-password');
    const registerMenuButton = document.getElementById('register-menu-button');
    registerMenuButton.addEventListener('click', async ()=> {
        const db = new DBOperation();
        const registerResult = await db.registerUser(registerMenuUsername.value, registerMenuPassword.value);
        const trimmedUsername = (registerMenuUsername.value).trim();
        const trimmedPassword = (registerMenuPassword.value).trim();
        if(trimmedUsername !=="" && trimmedPassword !== ""){
            if(registerResult.success === "ok"){
                const loginResult = await db.loginUser(trimmedUsername, trimmedPassword);
                if(loginResult.success === "ok"){
                    alert("Register sucess!");
                }
                else{
                    alert("Login failed!");  
                }
                location.reload();
            }

            else if(registerResult.error === "username-exist"){
                alert("Username already exist!");
            }

            else{
                alert("Register failed!");
            }
        }
        
        else{
            alert("Please fill the form!");
        }
        
    });
}

const setRegisterButtonClearEvent = () => {
    const registerMenuUsername = document.getElementById('register-menu-username');
    const registerMenuPassword = document.getElementById('register-menu-password');
    const clearMenuButton = document.getElementById('register-menu-clear');

    clearMenuButton.addEventListener('click', ()=>{
        registerMenuPassword.value = "";
        registerMenuUsername.value = "";
    });
}

const addRegister = async (parentElement) => {
    const response = await fetch("/view/register.html");
    const result = await response.text();
    const container = document.createElement('div');
    container.innerHTML = result;
    parentElement.appendChild(container);
}

export const setUpRegister = (parentElement)=>{
    addRegister(parentElement).then(()=>{
        setRegisterButtonEvent();
        setRegisterButtonClearEvent();
    });
}
//Login End