import DBOperation from "/js/db.js";
import Article from "/js/article.js";
import { getCookieUsername } from "/js/getUsername.js";

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

    fetchArticle = async() => {
        const dbOperation = new DBOperation();
        const result = await dbOperation.fetchArticle();
        return result;
    }
    
    addArticleToList = async () => {
        try{
            const tempArr = await this.fetchArticle();
            //alert("Fired");
            const articleArray = tempArr.map(element => {
                if(element.ArticleText.length > 400) {
                    element.ArticleText = element.ArticleText.slice(0, 400) + "...";
                }

                return element;
            });

            if(articleArray === null){
                return;
            }

            const parser = new DOMParser();
            const responseArticle = await fetch("/view/article.html");
            const responseSubmenu = await fetch("/view/submenu.html");
            const articleTemplateBase = parser.parseFromString(await responseArticle.text(), "text/html");
            const submenuTemplateBase = parser.parseFromString(await responseSubmenu.text(), "text/html");
            for (const value of articleArray) {
                const articleTemplate = articleTemplateBase.cloneNode(true);
                //console.log(articleTemplate);
                const article = new Article(articleTemplate, value.ArticleID, value.ArticleHeader, value.ArticleText, value.UploadDate, value.Author);
                if(getCookieUsername() === value.Author){
                    const submenuTemplate = submenuTemplateBase.cloneNode(true);
                    article.makeSubmenu(submenuTemplate, this.deleteArticle);
                }
                this.mainArray.push(article.makeArticle());
            }
            
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }

    searchArticle = (title) => {
        this.viewArray = this.mainArray.filter(element => {
            const headerContainer = element.childNodes[1].childNodes[1].childNodes[1];
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

    deleteArticle = (targetElement) => {
        this.mainArray = this.mainArray.filter(element => element !== targetElement);
        this.refreshArticle();
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
        console.error("Error occured: "+err);
    }
}

export const getContent = async () => {
    const response = await fetch('/view/article-list.html');
    const text = await response.text();
    return text;
}