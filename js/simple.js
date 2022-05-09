import { addNavRedirectEvent, showContent } from "/js/router.js";
import { setUpRegister, registerMenuEvent, checkRegisterMenuState } from "/js/register.js";
import { setUpLogin, loginMenuEvent, checkLoginMenuState } from "/js/login.js";
import { checkUservalidity } from "/js/validator.js";
import DBOperation from "/js/db.js";

const setLoginButtonContainerEvent = () =>{
    const loginButtonContainer = document.getElementById('login-button-container');
    const loginMenu = document.getElementById('login-button');
    const registerMenu = document.getElementById('register-button');
    loginButtonContainer.addEventListener('click', (e)=>{
        if(e.target === registerMenu){
            registerMenuEvent();
            if(!checkLoginMenuState()){
                loginMenuEvent();
            }
        }

        if(e.target === loginMenu){
            loginMenuEvent();
            if(!checkRegisterMenuState()){
                registerMenuEvent();
            }
        }
    });
}

const pageStart = async () =>{
    const contentContainer = document.getElementById('main-content-area-wrapper');
    
    checkUservalidity();
    setUpRegister(contentContainer);
    setUpLogin(contentContainer);
    setLoginButtonContainerEvent();
    addNavRedirectEvent();
    showContent();
}

pageStart();