import { getMainContent as articleViewContent, showArticle } from "/js/article.js";
import { getMainContent as articleEditorContent, checkURLParameter, showArticleEditorEdit, showArticleEditor, getURLParameter } from "/js/article-editor.js";
import DBOperation from "/js/db.js";



const getUrl = ()=>{
    const link = window.location.pathname.split('/');
    if(link.length > 2){
        return link[link.length - 2];
    }
    return link[link.length - 1];
}

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
//Login End

const setUpMainView = async (content) => {
    const mainContentArea = document.getElementById('main-content-area');
    mainContentArea.innerHTML = await content();
}

const showContent = async() =>{
    if(getUrl().includes("tambah")){
        await setUpMainView(articleEditorContent);
        if(checkURLParameter()){
            await showArticleEditorEdit(getURLParameter());
        }
        else{
            showArticleEditor();
        }
        
    }

    else{
        await setUpMainView(articleViewContent);
        await showArticle();
    }
    //alert(getUrl());
}

//setLoginMenuEvent();
//setLoginButtonEvent();
showContent();