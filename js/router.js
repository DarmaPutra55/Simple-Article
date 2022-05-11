import { getMainContent as articleViewContent, showArticle } from "/js/article.js";
import { getMainContent as articleEditorContent, checkURLParameter, showArticleEditorEdit, showArticleEditor, getURLParameter } from "/js/article-editor.js";
import { getContent as articleRegisterContent, setUpRegister } from "/js/register.js";
import { getContent as articleLoginContent, setUpLogin } from "/js/login.js";

export const addNavRedirectEvent = () => {
    const menuNav = document.getElementById('menu-nav-container');
    const loginNav = document.getElementById('login-nav-container');

    for(let childElement of menuNav.children){
        redirectEvent(childElement);
    }

    for(let childElement of loginNav.children){
        redirectEvent(childElement);
    }
}

export const redirectEvent = (element) =>{
    element.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.pushState("", {}, e.target.href);
        showContent();
    });
}

const getUrl = ()=>{
    const link = window.location.pathname.split('/');
    if(link.length > 2){
        return link[link.length - 2];
    }
    return link[link.length - 1];
}

const setUpMainView = async (content) => {
    const mainContentArea = document.getElementById('main-content-area');
    mainContentArea.innerHTML = await content();
}

const showTambahContent = async () => {
    await setUpMainView(articleEditorContent);
        if(checkURLParameter()){
            await showArticleEditorEdit(getURLParameter());
        }
        else{
            showArticleEditor();
        }
}

const showMainContent = async () => {
    await setUpMainView(articleViewContent);
    await showArticle();
}

const showLoginContent = async () => {
    await setUpMainView(articleLoginContent);
    setUpLogin();
} 

const showRegisterContent = async () => {
    await setUpMainView(articleRegisterContent);
    setUpRegister()
}

export const showContent = async () => {
    if(getUrl().includes("tambah")){
        showTambahContent();
    }

    else if(getUrl().includes("login")){
        showLoginContent();
    }

    else if(getUrl().includes("register")){
        showRegisterContent();
    }

    else{
        showMainContent();
    }
    //alert(getUrl());
}

export const addWindowHistoryEvent = () =>{
    window.addEventListener('popstate', (e)=>{
        e.preventDefault();
        showContent();
    });
}