//Handle sub-menu for the article. Will only be used on article.js

import { redirectEvent } from "/js/router.js"
import DBOperation from "/js/db.js";

export default class SubMenu {
    constructor() {
        this.articleSubMenuWrapper = document.createElement('div');
        this.articleSubMenu = document.createElement('div');
        this.articleEdit = document.createElement('a');
        this.articleDeleteButton = document.createElement('button');

        this.articleSubMenuWrapper.classList.add('content-submenu-wrapper', 'content-submenu-close');

        this.articleSubMenu.classList.add('content-submenu');

        this.articleEdit.textContent = "Edit";
        this.articleDeleteButton.textContent = "Delete";

        this.articleSubMenu.appendChild(this.articleEdit);
        this.articleSubMenu.appendChild(this.articleDeleteButton);

        this.articleSubMenuWrapper.appendChild(this.articleSubMenu);
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

    setDeleteButtonEvent = async (articleID, parentDiv) => {
        this.articleDeleteButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const dbOperation = new DBOperation();
            const dbOperationResult = await dbOperation.deleteArticle(articleID);
            parentDiv.remove();
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