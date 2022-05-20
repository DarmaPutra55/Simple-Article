//Responsible for handling web page change, will only be used in simple.js, navbar.js and sub-article.js

import { getContent as articleViewContent, showArticleList } from "/js/article-list.js";
import { getMainContent as articleEditorContent, checkURLParameter, showArticleEditorEdit, showArticleEditor, getURLParameter } from "/js/article-editor.js";
import { getContent as articleRegisterContent, setUpRegister } from "/js/register.js";
import { getContent as articleLoginContent, setUpLogin } from "/js/login.js";
import { cekCookiesUsername } from "/js/getUsername.js";
import { setSide } from "/js/navbar.js";

const getUrl = ()=>{
    const link = window.location.pathname.split('/');
    if(link.length > 2){ //To handle the Tambah menu because it has 3 '/' -> simplePHPFetch/[tambah]/42 return the 'tambah'
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
    await showArticleList();
}

const showLoginContent = async () => {
    await setUpMainView(articleLoginContent);
    setUpLogin();
} 

const showRegisterContent = async () => {
    await setUpMainView(articleRegisterContent);
    setUpRegister()
}

const showLoggedContent = async () => {
    if(getUrl().includes("tambah")){
        await showTambahContent();
    }

    else{
        await showMainContent();
    }
}

const showNormalContent = async () => {
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

export const addWindowHistoryEvent = () =>{
    window.addEventListener('popstate', (e)=>{
        e.preventDefault();
        showContent();
    });
}

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

export const showContent = async () => {
    setSide(0); //Reset side-menu poisition each time user switch page.
    window.scrollTo(0, 0); //Reset view back to the top each time user switch page.
    if(cekCookiesUsername()){
        showLoggedContent();
        return "";
    }
    
    showNormalContent();

    //alert(getUrl());
}