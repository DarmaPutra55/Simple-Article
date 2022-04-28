import DBOperation from "/js/db.js";

export default class SubMenu {
    constructor() {
        this.articleSubMenuWrapper = document.createElement('div');
        this.articleSubMenu = document.createElement('div');
        this.articleEditButton = document.createElement('button');
        this.articleDeleteButton = document.createElement('button');
        this.articleEditButtonText = document.createElement('p');
        this.articleDeleteButtonText = document.createElement('p');

        this.articleSubMenuWrapper.classList.add('content-submenu-wrapper', 'content-submenu-close');

        this.articleSubMenu.classList.add('content-submenu');

        this.articleEditButtonText.textContent = "Edit";
        this.articleDeleteButtonText.textContent = "Delete";

        this.articleEditButton.appendChild(this.articleEditButtonText);
        this.articleDeleteButton.appendChild(this.articleDeleteButtonText);

        this.articleSubMenu.appendChild(this.articleEditButton);
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

    setDeleteButtonEvenet = async (ArticleID, DeleteCallback) => {
        this.articleDeleteButton.addEventListener('click', async () => {
            const dbOperation = new DBOperation();
            const dbOperationResult = await dbOperation.deleteArticle(ArticleID);
            await DeleteCallback();
            alert(dbOperationResult.Success);
        })
    }
}