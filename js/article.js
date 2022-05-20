//Handle showing article and all article logic.

import SubMenu from "/js/sub-article.js";
import DBOperation from "/js/db.js";
import { cekCookiesUsername } from "/js/getUsername.js";

class Article {
    constructor(articleId, header, article) {
        this.mainBoxArea = document.getElementById('main-box');
        this.mainBox = document.createElement('div');
        this.mainHeader = document.createElement('div');
        this.mainArticle = document.createElement('div');
        this.headerTextWrapper = document.createElement('div');
        
        this.headerText = document.createElement('h1');
        
        this.articleText = document.createElement('p');
        this.aritcleIdHolder = document.createElement('input');

        this.mainBox.classList.add('content-box');

        this.mainHeader.classList.add('content-header');

        this.mainArticle.classList.add('content-body');

        this.headerTextWrapper.classList.add('content-header-text');

        this.aritcleIdHolder.type = "hidden";
        
        this.aritcleIdHolder.value = articleId;

        this.headerText.innerHTML = header;

        this.articleText.innerHTML = article;
    }

    addArticle = async () => {
        this.mainHeader.appendChild(this.headerTextWrapper);
        
        this.headerTextWrapper.appendChild(this.headerText);

        this.mainArticle.appendChild(this.articleText);

        this.mainBox.appendChild(this.mainHeader);
        this.mainBox.appendChild(this.mainArticle);
        this.mainBox.appendChild(this.aritcleIdHolder);
        this.mainBoxArea.appendChild(this.mainBox);
    }

    addSubmenu = (DeleteCallback) => {
        this.onTrans = false;
        this.headerButtonWrapper = document.createElement('div');
        this.headerButton = document.createElement('button');
        this.headerButtonIcon = document.createElement('i');

        this.headerButton.appendChild(this.headerButtonIcon);
        this.headerButtonWrapper.appendChild(this.headerButton);
        this.mainHeader.appendChild(this.headerButtonWrapper);
        this.headerButtonWrapper.classList.add('content-header-button');

        this.headerButtonIcon.classList.add('fa', 'fa-solid', 'fa-ellipsis-vertical', 'fa-2x', 'icon-button-rotate-back');
            this.submenu = new SubMenu();
            this.submenu.addSubmenu(this.mainBox);
            this.submenu.setSubmenuPosition(this.headerButtonWrapper);
            this.submenu.setDeleteButtonEvent(this.aritcleIdHolder.value, DeleteCallback);
            this.submenu.setEditEvent(this.aritcleIdHolder.value);
            this.setExpandButtonEvent();
            this.setContentBoxResizeEvent();
    }

    setExpandButtonEvent = () => {
        this.headerButton.addEventListener("click", () => {
            if (!this.onTrans) {
                this.onTrans = true;
                this.setIconAnnimation();
                this.submenu.setSubmenuAnimation();

                this.headerButtonIcon.addEventListener('transitionend', () => {
                    this.onTrans = false;
                }, { once: true })
            }
        })
    }

    setContentBoxResizeEvent = () => {
        const resize = new ResizeObserver(() => {
            this.submenu.setSubmenuPosition(this.headerButtonWrapper);
        })
        resize.observe(this.mainBox);
    }

    setIconAnnimation = () => {
        this.headerButtonIcon.classList.toggle('icon-button-rotate-click');
        this.headerButtonIcon.classList.toggle('icon-button-rotate-back');
    }
}

export const showArticle = async () => {
    try{
        const dbOperation = new DBOperation();
        const articleArray = await dbOperation.fetchArticle();
        const mainBox = document.getElementById('main-box');
        //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
        if(articleArray !== null){
            mainBox.innerHTML = "";
            for (const value of articleArray) {
                const article = new Article(value.ArticleID, value.ArticleHeader, value.ArticleText);
                article.addArticle();
                if(cekCookiesUsername()){
                    article.addSubmenu(refreshArticle);
                }
            }
        }
    }
    catch(err){
        console.log("Error: "+err);
    }
}

const refreshArticle = async () => {
    document.getElementById('main-box').innerHTML = '';
    await showArticle();
}

export const getMainContent = async () => {
    const response = await fetch('/view/article.html');
    const text = await response.text();
    return text;
}