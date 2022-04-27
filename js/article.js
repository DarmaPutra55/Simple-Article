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