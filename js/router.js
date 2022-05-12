import { getMainContent as articleViewContent, showArticle } from "/simplePHPFetch/js/article.js";
import { getMainContent as articleEditorContent, checkURLParameter, showArticleEditorEdit, showArticleEditor, getURLParameter } from "/simplePHPFetch/js/article-editor.js";
import { getContent as articleRegisterContent, setUpRegister } from "/simplePHPFetch/js/register.js";
import { getContent as articleLoginContent, setUpLogin } from "/simplePHPFetch/js/login.js";
import { getUsername } from "/simplePHPFetch/js/getUsername.js";

export const addNavRedirectEvent = () => {
    const menuNav = document.getElementById('header-menu');
    const sideMenuNav = document.getElementById('side-menu');

    for(let mainNav of menuNav.children){
        for(let childNav of mainNav.children){
            if(childNav.tagName === "A"){
                redirectEvent(childNav);
            }
        }
    }

    for(let mainNav of sideMenuNav.children){
        for(let childNav of mainNav.children){
            if(childNav.tagName === "A"){
                redirectEvent(childNav);
            }
        }
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
    if(link.length > 3){
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
    if(await getUsername() === ""){
        if(getUrl().includes("login")){
            await showLoginContent();
        }
    
        else if(getUrl().includes("register")){
            await showRegisterContent();
        }

        else{
            showMainContent();
        }
    }

    else{
        showLoggedContent();
    }
    //alert(getUrl());
}

const showLoggedContent = async () => {
    if(getUrl().includes("tambah")){
        await showTambahContent();
    }

    else{
        await showMainContent();
    }
}

export const addWindowHistoryEvent = () =>{
    window.addEventListener('popstate', (e)=>{
        e.preventDefault();
        showContent();
    });
}