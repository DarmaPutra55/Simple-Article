import DBOperation from "/js/db.js";
import Article from "/js/article.js";
import { cekCookiesUsername } from "/js/getUsername.js";

class ArticleList {

    constructor(){
        this.mainArray = [];
        this.viewArray = this.mainArray;
    }

    setArticle = async () => {
        await this.addArticleToList();
    }
    
    addArticleToList = async () => {
        try{
            const dbOperation = new DBOperation();
            const articleArray = await dbOperation.fetchArticle();

            if(articleArray !== null){
                for (const value of articleArray) {
                    const article = new Article(value.ArticleID, value.ArticleHeader, value.ArticleText);
                    if(cekCookiesUsername()){
                        article.addSubmenu();
                    }
                    this.mainArray.push(article.makeArticle());
                }
            }
        }
        catch(err){
            console.log("Error: "+err);
        }
    }

    getAllArticle = () =>{
        return this.mainArray;
    }

    refreshArticle = async () => {
        document.getElementById('main-box').innerHTML = '';
        await showArticle();
    }
    
}

 export const showArticleList = async () => {
    try{
        const mainBox = document.getElementById('main-box');
        const articleList = new ArticleList();
        await articleList.setArticle();
        const articleListArray = articleList.getAllArticle();

        mainBox.innerHTML = "";

        for(const value of articleListArray){
            mainBox.appendChild(value);
        }
        //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    }

    catch(err){
        console.log("Error: "+err);
    }
}

export const getContent = async () => {
    const response = await fetch('/view/article.html');
    const text = await response.text();
    return text;
}