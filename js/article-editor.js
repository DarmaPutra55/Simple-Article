//Handle article creation and editing.

import DBOperation from "/js/db.js";

export default class ArticleEditor{
    constructor(){
        this.articleWrapper = document.getElementById('article-editor-wrapper');
        this.articleIDInput = document.getElementById('article-id');
        this.articleTitleInput = document.getElementById('article-title');
        this.articleTextInput = document.getElementById('article-content');
        this.articleSubmitButton = document.getElementById('submit-article');
        this.articleClearButton = document.getElementById('clear-article');
        this.addArticleEditorEvent();
    }

    setArticleEditorText = (articleID, articleTitle, articleText) =>{
        this.articleIDInput.value = articleID;
        this.articleTitleInput.value = articleTitle;
        this.articleTextInput.value = articleText;
    }

    submitArticle = async (articleTitle, articleText, id="") => {
        try{
            if(id !== ""){
                this.updateArticle(id, articleTitle, articleText);
                this.clearArticle();
            }
            else{
                this.addArticle(articleTitle, articleText);
                this.clearArticle();
            }
        }
        catch(err){
            alert(err);
        }
    }

    addArticle = async (articleTitle, articleText) => {
        const dbOperation = new DBOperation();
        const result = await dbOperation.uploadArticle(articleTitle, articleText, this.getDateNow());
        if(result.status === "ok"){
            alert("Article created!");
        }
    }

    updateArticle = async (id, articleTitle, articleText) => {
        const dbOperation = new DBOperation();
        const result = await dbOperation.updateArticle(id, articleTitle, articleText, this.getDateNow());
        if(result.status === "ok"){
            alert("Article updated!");
        }
    }

    clearArticle = () => {
        this.articleTitleInput.value = "";
        this.articleTextInput.value = "";
    }

    addArticleEditorEvent = () =>{
        this.addSubmitButtonEvent();
        this.addClearButtonEvent();
    }

    addSubmitButtonEvent = () => {
        this.articleSubmitButton.addEventListener('click', (e)=>{
            e.preventDefault();
            const trimmedArticleTitle = (this.articleTitleInput.value).trim();
            const trimmedArticleText = (this.articleTextInput.value).trim();
            if(trimmedArticleTitle == "" || trimmedArticleText == ""){
                alert("Please fill the form first!");
                return;
            }

            this.submitArticle(trimmedArticleTitle, trimmedArticleText, this.articleIDInput.value);
        });
    }

    addClearButtonEvent = () =>{
        this.articleClearButton.addEventListener('click', (e)=> {
            e.preventDefault();
            this.clearArticle(); 
        });
    }

    getDateNow = () => {
        let date = new Date();
        let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        return today;
    }

    showArticle = () => {
        this.articleWrapper.classList.toggle("hide");
    }

    setArticleEditorValue = async(id) =>{
        try{
            const fetchedArticle = await this.fetchArticle(id);
            this.setArticleEditorText(id, fetchedArticle[0].ArticleHeader, fetchedArticle[0].ArticleText);
        }
        catch(err){
            console.log(err);
        }
    }

    fetchArticle = async(id) =>{
        const db = new DBOperation();
        const result = await db.fetchArticle(id);
        return result;
    }
}

export const getContent = async() =>{
    const response = await fetch("/view/article-editor.html");
    const result = response.text();
    return result;
}

export const showArticleEditor = () => {
    const articleEditor = new ArticleEditor();
    articleEditor.showArticle();
}

export const showArticleEditorEdit = async (id) => {
    const articleEditor = new ArticleEditor();
    await articleEditor.setArticleEditorValue(id);
    articleEditor.showArticle();
}