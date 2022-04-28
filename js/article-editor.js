import DBOperation from "/js/db.js";

class ArticleEditor{
    constructor(){
        this.articleIDInput = document.getElementById('article-id');
        this.articleTitleInput = document.getElementById('article-title');
        this.articleTextInput = document.getElementById('article-content');
        this.articleSubmitButton = document.getElementById('submit-article');
        this.articleClearButton = document.getElementById('clear-article');
        console.log("Created");
    }

    submitArticle = async (articleTitle, articleText, uploader = "Texas") => {
        try{
            const dbOperation = new DBOperation();
            const result = await dbOperation.uploadArticle(articleTitle, articleText, uploader, this.getDateNow());
            this.clearArticle();
        }
        catch(err){
            alert(err);
        }
    }

    clearArticle = () => {
        this.articleTitleInput.value = "";
        this.articleTextInput.value = "";
    }

    addSubmitButtonEvent = () => {
        this.articleSubmitButton.addEventListener('click', ()=>{
            if(this.spaceRemover(this.articleTitleInput.value) !=="" && this.spaceRemover(this.articleTextInput.value) !== ""){
                this.submitArticle(this.articleTitleInput.value, this.articleTextInput.value);
            }
            else{
                alert("Please fill the form first!");
            }
        });
    }

    addClearButtonEvent = () =>{
        this.articleClearButton.addEventListener('click', ()=> {
           this.clearArticle(); 
        });
    }

    getDateNow = () => {
        let date = new Date();
        let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        return today;
    }

    spaceRemover = (text) =>{
        let newText = text.replace(/[\n\r\s\t]+/, "");
        return newText;
    }
}

export const addArticleEditorEvent = () =>{
    let articleEditor = new ArticleEditor();
    articleEditor.addSubmitButtonEvent();
    articleEditor.addClearButtonEvent();
}

export const getMainContent = async() =>{
    const response = await fetch("/view/article-editor.html");
    const result = response.text();
    return result;
}