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
        this.onTrans = false;
        this.headerButtonWrapper = submenuTemplate.getElementsByClassName("content-header-button")[0];
        this.headerButton = submenuTemplate.getElementsByClassName('submenu-button')[0];
        this.headerButtonIcon = submenuTemplate.getElementsByClassName('submenu-icon')[0];

        this.mainHeader.appendChild(this.headerButtonWrapper);
        
        //Make the submenu
        this.submenu = new SubMenu(submenuTemplate);
        this.submenu.addSubmenu(this.mainBox);
        this.submenu.setSubmenuPosition(this.headerButtonWrapper);
        this.submenu.setDeleteButtonEvent(this.aritcleIdHolder.value, this.mainBox, deleteCallback);
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