import { getMainContent as articleViewContent, showArticle } from "/js/article.js";
import { getMainContent as articleEditorContent, checkURLParameter, showArticleEditorEdit, showArticleEditor, getURLParameter } from "/js/article-editor.js";

export const addNavRedirectEvent = () => {
    const indexNav = document.getElementById('home-nav');
    const tambahNav = document.getElementById('tambah-nav');
    const aboutNav = document.getElementById('about-nav');
    const contactNav = document.getElementById('contact-nav');

    redirectEvent(indexNav);
    redirectEvent(tambahNav);
    redirectEvent(aboutNav);
    redirectEvent(contactNav);
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

export const showContent = async () => {
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