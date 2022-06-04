//Handle sub-menu for the article. Will only be used on article.js

import { redirectEvent } from "/js/router.js"
import DBOperation from "/js/db.js";

export default class SubMenu {
    constructor(submenuTemplate) {
        this.onTrans = false;
        this.headerButtonWrapper = submenuTemplate.getElementsByClassName("content-header-button")[0];
        this.headerButton = submenuTemplate.getElementsByClassName('submenu-button')[0];
        this.headerButtonIcon = submenuTemplate.getElementsByClassName('submenu-icon')[0];

        this.articleSubMenuWrapper = submenuTemplate.getElementsByClassName('content-submenu-wrapper')[0];
        this.articleEdit = submenuTemplate.getElementsByClassName('edit-link')[0];
        this.articleDeleteButton = submenuTemplate.getElementsByClassName('delete-button')[0]; 
    }

    addSubmenu = (parentDiv) => {
        parentDiv.appendChild(this.articleSubMenuWrapper);
    }

    addSubmenuButton = (parentDiv) => {
        parentDiv.appendChild(this.headerButtonWrapper);
    }

    setSubmenuPosition = () => {
        this.articleSubMenuWrapper.style.right = getComputedStyle(this.headerButtonWrapper).width;
    }

    setSubmenuAnimation = () => {
        if (getComputedStyle(this.articleSubMenuWrapper).display === 'hidden') {
            this.articleSubMenuWrapper.style.display = 'block';
        }
        else {
            this.articleSubMenuWrapper.style.display = 'hidden';
        }

        this.articleSubMenuWrapper.classList.toggle('content-submenu-expand');
        this.articleSubMenuWrapper.classList.toggle('content-submenu-close');
    }

    setDeleteButtonEvent = async (articleID, commentID, parentDiv, deleteCallback) => { //deleteCallback come from article-list.js but passed throught article.js
        this.articleDeleteButton.addEventListener('click', async (e) => {
            e.preventDefault();
            let dbOperationResult;
            if(articleID ===  null){
                dbOperationResult = await this.deleteArticle(articleID);
            }
            else{
                dbOperationResult = await this.deleteComment(commentID)
            }
            deleteCallback(parentDiv);
            //parentDiv.remove();
            if(dbOperationResult.status === "ok"){
                alert('Data sucessfully deleted!');
            }
        });
    }

    deleteArticle = async (articleID) => {
        const dbOperation = new DBOperation();
        const dbOperationResult = await dbOperation.deleteArticle(articleID);
        return dbOperationResult;
    }

    deleteComment = async (commentID) => {
        const dbOperation = new DBOperation();
        const dbOperationResult = await dbOperation.deleteComment(commentID);
        return dbOperationResult;
    }

    setEditEvent = (ArticleID) => {
        this.articleEdit.href = "/tambah/"+ArticleID; 
        redirectEvent(this.articleEdit);
    }

    setExpandButtonEvent = () => {
        this.headerButton.addEventListener("click", () => {
            if (!this.onTrans) {
                this.onTrans = true;
                this.setIconAnnimation();
                this.setSubmenuAnimation();

                this.headerButtonIcon.addEventListener('transitionend', () => {
                    this.onTrans = false;
                }, { once: true })
            }
        })
    }

    setContentBoxResizeEvent = (targetElement) => {
        const resize = new ResizeObserver(() => {
            this.setSubmenuPosition();
        })
        resize.observe(targetElement);
    }

    setIconAnnimation = () => {
        this.headerButtonIcon.classList.toggle('icon-button-rotate-click');
        this.headerButtonIcon.classList.toggle('icon-button-rotate-back');
    }
}