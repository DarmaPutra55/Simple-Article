//Responsible for handling web page change, will only be used in simple.js, navbar.js and sub-article.js

import { getContent as articleViewContent, showArticleList } from "/js/article-list.js";
import { getContent as articleEditorContent, showArticleEditorEdit, showArticleEditor } from "/js/article-editor.js";
import { getContent as articleReadContent, setUpArticleRead } from "/js/article-read.js";
import { getContent as articleRegisterContent, setUpRegister } from "/js/register.js";
import { getContent as articleLoginContent, setUpLogin } from "/js/login.js";
import { getContent as articleAboutUsContent }  from "/js/about-us.js";
import { getContent as articleContactContent, setContact } from "/js/contact.js";
import { cekCookiesUsername } from "/js/getUsername.js";
import { setSide } from "/js/navbar.js";
import { toggleLoading } from "/js/loading.js";

const getUrl = ()=>{
    const link = window.location.pathname.split('/');
    if(link.length > 2){ //To handle the Tambah menu because it has 3 '/' -> simplePHPFetch/[tambah]/42 return the 'tambah'
        return link[link.length - 2];
    }
    return link[link.length - 1];
}

const checkURLParameter = () =>{
    const url = window.location.pathname.split('/');
    if(url.length > 2){
        return true;
    }
    return false;
}

const getURLParameter = () => {
    const url = window.location.pathname.split('/');
    return url[url.length  - 1];
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
    //alert("Fired");
    await setUpMainView(articleViewContent);
    await showArticleList();
}

const showLoginContent = async () => {
    await setUpMainView(articleLoginContent);
    setUpLogin();
} 

const showContactContent = async () => {
    await setUpMainView(articleContactContent);
    await setContact(); 
}

const showRegisterContent = async () => {
    await setUpMainView(articleRegisterContent);
    setUpRegister()
}

const showReadContent = async () => {
    await setUpMainView(articleReadContent);
    await setUpArticleRead(getURLParameter());
}

const showAboutUsContent = async () => {
    await setUpMainView(articleAboutUsContent);
}

const showWebContent = async (login) => {
    if(getUrl().includes("tambah") && login){
        await showTambahContent();
    }

    else if(getUrl().includes("login") && !login){
         await showLoginContent();
    }

    else if(getUrl().includes("register") && !login){
        await showRegisterContent();
    }

    else if(getUrl().includes("read")){
        await showReadContent();
    }

    else if(getUrl().includes("contact")){
        await showContactContent();
    }

    else if(getUrl().includes("about")){
        await showAboutUsContent();
    }
    
    else{
        await showMainContent();
    }
}

export const addWindowHistoryEvent = () =>{
    window.addEventListener('popstate', async (e)=>{
        e.preventDefault();
        await showContent();
    });
}

export const addNavRedirectEvent = () => {
    //alert("Fired");
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
    element.addEventListener('click', async (e) => {
        e.preventDefault();
        window.history.pushState("", {}, e.target.href);
        await showContent();
    });
}

export const showContent = async () => {
    try{
        setSide(0); //Reset side-menu poisition each time user switch page.
        window.scrollTo(0, 0); //Reset view back to the top each time user switch page.
        toggleLoading();
        if(cekCookiesUsername()){
            await showWebContent(true);
            return "";
        }
        
        await showWebContent(false);
    }
    catch(err){
        console.error("Error occured: "+err);
    }
    finally{
        toggleLoading();
    }
}