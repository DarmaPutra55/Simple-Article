const fetchArticle = async () => {
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

class Article {
    mainBoxArea = document.getElementById('main-box');
    mainBox = document.createElement('div');
    mainHeader = document.createElement('div');
    mainArticle = document.createElement('div');
    headerTextWrapper = document.createElement('div');
    headerButtonWrapper = document.createElement('div');
    headerText = document.createElement('h1');
    headerButton = document.createElement('button');
    headerButtonIcon = document.createElement('i');
    articleText = document.createElement('p');
    aritcleIdHolder = document.createElement('input');
    submenu = new SubMenu();
    onTrans = false;

    constructor(articleId, header, article) {

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
    articleSubMenuWrapper = document.createElement('div');
    articleSubMenu = document.createElement('div');
    articleEditButton = document.createElement('button');
    articleDeleteButton = document.createElement('button');
    articleEditButtonText = document.createElement('p');
    articleDeleteButtonText = document.createElement('p');


    constructor() {
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
}

const showArticle = async () => {
    const articleArray = await fetchArticle();
    //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    for (const [index, value] of articleArray.entries()) {
        const article = new Article(index, value.ArticleHeader, value.ArticleText);
    }
}

showArticle();