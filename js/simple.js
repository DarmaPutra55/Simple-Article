import { getMainContent as articleViewContent, showArticle } from "/js/article.js";
import { getMainContent as articleEditorContent, addArticleEditorEvent } from "/js/article-editor.js";
import DBOperation from "/js/db.js";



const getUrl = ()=>{
    let link = window.location.pathname.split('/');
    if(link.length > 2){
        return link[link.length - 2];
    }
    return link[link.length - 1];
}

const setUpMainView = async (content) => {
    const mainContentArea = document.getElementById('main-content-area');
    mainContentArea.innerHTML = await content();
}

const showContent = async() =>{
    if(getUrl().includes("tambah")){
        await setUpMainView(articleEditorContent);
        addArticleEditorEvent();
    }

    else{
        await setUpMainView(articleViewContent);
        await showArticle();
    }
    //alert(getUrl());
}

showContent();