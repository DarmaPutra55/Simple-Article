import DBOperation from "/js/db.js";
import Article from "/js/article.js";
import { cekCookiesUsername } from "/js/getUsername.js";

class ArticleList {

    constructor(){
        this.mainArray = [];
        this.viewArray = [];
    }

    setSearchBar = () => {
        const searhBar = document.getElementById("search-form");
        const searchText = document.getElementById("search-bar-text");
        searhBar.addEventListener("submit", (e)=>{
            e.preventDefault();
            if(!(searchText.value).trim()){
                this.refreshArticle();
                return;
            }

            this.searchArticle((searchText.value).trim());
        });
    }

    setArticle = async () => {
        await this.addArticleToList();
        this.viewArray = this.mainArray;
    }
    
    addArticleToList = async () => {
        try{
            const dbOperation = new DBOperation();
            const tempArr = await dbOperation.fetchArticle();
            //alert("Fired");
            const articleArray = tempArr.map(element => {
                if(element.ArticleText.length > 400) {
                    element.ArticleText = element.ArticleText.slice(0, 400) + "...";
                }

                return element;
            });

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

    searchArticle = (title) => {
        this.viewArray = this.mainArray.filter(element => {
            const headerContainer = element.childNodes[0].childNodes[0].childNodes[0];
            const headerText = headerContainer.textContent;
            if(headerText.toLowerCase().startsWith(title.toLowerCase())){
                return element;
            }
        });
        this.fillList();
    }

    refreshArticle = () => {
        this.viewArray = this.mainArray;
        this.fillList();
    }

    fillList = () => {
        const mainBox = document.getElementById('main-box');
        mainBox.innerHTML = "";

        for(const value of this.viewArray){
            mainBox.appendChild(value);
        }
    }
}

export const showArticleList = async () => {
    try{
        const articleList = new ArticleList();
        await articleList.setArticle();
        articleList.setSearchBar();
        articleList.fillList();
       
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