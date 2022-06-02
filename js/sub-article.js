//Handle sub-menu for the article. Will only be used on article.js

import { redirectEvent } from "/js/router.js"
import DBOperation from "/js/db.js";

export default class SubMenu {
    constructor(submenuTemplate) {
        this.articleSubMenuWrapper = submenuTemplate.getElementsByClassName('content-submenu-wrapper')[0];
        this.articleEdit = submenuTemplate.getElementsByClassName('edit-link')[0];
        this.articleDeleteButton = submenuTemplate.getElementsByClassName('delete-button')[0];;
    }

    addSubmenu = (parentDiv) => {
        parentDiv.appendChild(this.articleSubMenuWrapper);
    }

    setSubmenuPosition = (targetPositon) => {
        const subMenu = this.articleSubMenuWrapper;
        subMenu.style.right = getComputedStyle(targetPositon).width;
    }

    setSubmenuAnimation = () => {
        const subMenu = this.articleSubMenuWrapper;
        if (getComputedStyle(subMenu).display === 'hidden') {
            subMenu.style.display = 'block';
        }
        else {
            subMenu.style.display = 'hidden';
        }

        subMenu.classList.toggle('content-submenu-expand');
        subMenu.classList.toggle('content-submenu-close');
    }

    setDeleteButtonEvent = async (articleID, parentDiv, deleteCallback) => { //deleteCallback come from article-list.js but passed throught article.js
        this.articleDeleteButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const dbOperation = new DBOperation();
            const dbOperationResult = await dbOperation.deleteArticle(articleID);
            deleteCallback(parentDiv);
            //parentDiv.remove();
            if(dbOperationResult.status === "ok"){
                alert('Data sucessfully deleted!');
            }
        });
    }

    setEditEvent = (ArticleID) => {
        this.articleEdit.href = "/tambah/"+ArticleID; 
        redirectEvent(this.articleEdit);
    }
}