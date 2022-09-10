//Handle showing article and all article logic.

import SubMenu from "/js/sub-article.js";
import { redirectEvent } from "/js/router.js"

export default class Article {
    constructor(articleTemplate, articleId, header, article, uploadDate, author) {
        //this.mainBoxArea = document.getElementById('main-box');
        this.mainBox = articleTemplate.getElementsByClassName("content-box")[0];
        this.mainHeader = articleTemplate.getElementsByClassName("content-header")[0];
        this.mainArticle = articleTemplate.getElementsByClassName("content-body")[0];
        this.headerText = articleTemplate.getElementsByClassName("content-header-text-h1")[0];
        this.articleText = articleTemplate.getElementsByTagName("pre")[0];
        this.mainFooter = articleTemplate.getElementsByClassName("content-footer")[0];
        this.aritcleIdHolder = articleTemplate.getElementsByName("idHiddenHolder")[0];
 
        const uploadDateText = this.mainFooter.childNodes[1];
        const authorText = this.mainFooter.childNodes[3];
        
        this.articleRead = articleTemplate.createElement("a");
        this.articleRead.innerHTML = "Read";

        this.aritcleIdHolder.value = articleId;

        this.setReadEvent(articleId);

        this.headerText.innerHTML = header;

        this.articleText.innerHTML = article;
        this.articleText.appendChild(this.articleRead);

        uploadDateText.innerHTML = "Uploaded: "+uploadDate;
        authorText.innerHTML = "Author: "+author;
    }

    setReadEvent = (ArticleID) => {
        this.articleRead.href = "/read/"+ArticleID; 
        redirectEvent(this.articleRead);
    }

    makeArticle = () => {
        return this.mainBox;
        //this.mainBoxArea.appendChild(this.mainBox);
    }

    makeSubmenu = (submenuTemplate, deleteCallback) => {

        //Make the submenu
        this.submenu = new SubMenu(submenuTemplate);
        this.submenu.setSubmenuPosition();
        this.submenu.setDeleteButtonEvent(this.aritcleIdHolder.value, this.mainBox, deleteCallback, "article");
        this.submenu.setEditEvent(this.aritcleIdHolder.value);
        this.submenu.setExpandButtonEvent();
        this.submenu.setContentBoxResizeEvent(this.mainBox);
        this.submenu.addSubmenu(this.mainBox);
        this.submenu.addSubmenuButton(this.mainHeader);
    }

    
}