class DBOperation {
    fetchArticle = async () => {
        try {
            const response = await fetch("php/fetch.php")
            const data = await response.json();

            return data;
        }
        catch (err) {
            console.error(err);

            return;
        }
    }

    deleteArticle = async (articleID) => {
        try {
            let data = new FormData();
            data.append('ArticleID', articleID);
            const response = await fetch('php/delete.php', {
                method: 'POST',
                body: data
            })
            const result = await response.json();
            return result;
        }

        catch (err) {
            alert("Error has occured: " + err);
        }
    }
}

class Article {
    constructor(articleId, header, article) {
        this.mainBoxArea = document.getElementById('main-box');
        this.mainBox = document.createElement('div');
        this.mainHeader = document.createElement('div');
        this.mainArticle = document.createElement('div');
        this.headerTextWrapper = document.createElement('div');
        this.headerButtonWrapper = document.createElement('div');
        this.headerText = document.createElement('h1');
        this.headerButton = document.createElement('button');
        this.headerButtonIcon = document.createElement('i');
        this.articleText = document.createElement('p');
        this.aritcleIdHolder = document.createElement('input');
        this.submenu = new SubMenu();
        this.onTrans = false;

        this.mainBox.classList.add('content-box');

        this.mainHeader.classList.add('content-header');

        this.mainArticle.classList.add('content-body');

        this.headerTextWrapper.classList.add('content-header-text');

        this.headerButtonWrapper.classList.add('content-header-button');

        this.headerButtonIcon.classList.add('fa', 'fa-solid', 'fa-ellipsis-vertical', 'fa-2x', 'icon-button-rotate-back');

        this.aritcleIdHolder.type = "hidden";
        this.aritcleIdHolder.value = articleId;

        this.headerText.innerHTML = header;

        this.articleText.innerHTML = article;
    }

    addArticle = (DeleteCallback) => {
        this.mainHeader.appendChild(this.headerTextWrapper);
        this.mainHeader.appendChild(this.headerButtonWrapper);

        this.headerTextWrapper.appendChild(this.headerText);

        this.headerButton.appendChild(this.headerButtonIcon);

        this.headerButtonWrapper.appendChild(this.headerButton);

        this.mainArticle.appendChild(this.articleText);

        this.mainBox.appendChild(this.mainHeader);
        this.mainBox.appendChild(this.mainArticle);
        this.mainBox.appendChild(this.aritcleIdHolder);
        this.mainBoxArea.appendChild(this.mainBox);
        this.submenu.addSubmenu(this.mainBox);
        this.submenu.setSubmenuPosition(this.headerButtonWrapper);
        this.submenu.setDeleteButtonEvenet(this.aritcleIdHolder.value, DeleteCallback);
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

class SubMenu {
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

const showArticle = async () => {
    const dbOperation = new DBOperation();
    const articleArray = await dbOperation.fetchArticle();
    //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    if(articleArray !== null){
        for (value of articleArray) {
            const article = new Article(value.ArticleID, value.ArticleHeader, value.ArticleText);
            article.addArticle(refreshArticle);
        }
    }
}

const refreshArticle = async () => {
    document.getElementById('main-box').innerHTML = '';
    await showArticle();
}

showArticle();
