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
    loginMenuButton.addEventListener('click', async ()=> {
        const db = new DBOperation();
        const result = await db.loginUser(loginMenuUsername.value, loginMenuPassword.value);
        if(result.success === "ok"){
            alert("Login berhasil!");
            location.reload();
        }

        else{
            alert("Login gagal!");
        }
        
    });
}

export const setUpLogin = ()=>{
    setLoginMenuEvent();
    setLoginButtonEvent();
}
//Login End