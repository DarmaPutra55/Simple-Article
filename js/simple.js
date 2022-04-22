const fetchArticle = async () =>{  
    try{
        const response = await fetch("php/fetch.php")
        const data = await response.json();
        
        return data;
    }
    catch(err){
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
    onTrans = false;

    constructor(articleId, header, article){   
        this.mainBox.classList.add('content-box');
        
        this.mainHeader.classList.add('content-header');
        
        this.mainArticle.classList.add('content-body');
        
        this.headerTextWrapper.classList.add('content-header-text');
        
        this.headerButtonWrapper.classList.add('content-header-button');
        
        this. headerButtonIcon.classList.add('fa', 'fa-solid', 'fa-ellipsis-vertical','fa-2x', 'icon-button-rotate-back');

        this.aritcleIdHolder.type = "hidden";
        this.aritcleIdHolder.value = articleId;

        this.headerText.innerHTML = header;
        
        this.articleText.innerHTML = article;

        this.mainHeader.appendChild(this.headerTextWrapper);
        this.mainHeader.appendChild(this.headerButtonWrapper);
    
        this. headerTextWrapper.appendChild(this.headerText);
    
        this.headerButton.appendChild(this.headerButtonIcon);
    
        this.headerButtonWrapper.appendChild(this.headerButton);
    
        this.mainArticle.appendChild(this.articleText);
    
        this.mainBox.appendChild(this.mainHeader);
        this.mainBox.appendChild(this.mainArticle);
        this.mainBox.appendChild(this.aritcleIdHolder);
        
        this.createArticleSubMenu();
        this.addIconAnnimation();
        this.mainBoxArea.appendChild(this.mainBox);
    }

    addIconAnnimation = ()=> {
        const subMenu = this.mainBox.lastChild;
    
        this.headerButton.addEventListener("click", ()=>{
            if(!this.onTrans){
                this.onTrans = true;
                this.headerButtonIcon.classList.toggle('icon-button-rotate-click');
                this.headerButtonIcon.classList.toggle('icon-button-rotate-back'); 
    
                this.headerButtonIcon.addEventListener('transitionend', ()=>{
                    subMenu.style.right = getComputedStyle(this.headerButtonWrapper).width;
                    
                    if(getComputedStyle(subMenu).display === 'none'){
                        subMenu.style.display = 'block';
                    }
                    else{
                        subMenu.style.display = 'none';
                    }

                    this.onTrans = false;
                }, {once: true})
            }
        });
    
    }

    createArticleSubMenu = ()=> {
        const articleSubMenuWrapper = document.createElement('div');
        const articleSubMenu = document.createElement('div');
        const articleEditButton = document.createElement('button');
        const articleDeleteButton = document.createElement('button');
        const articleEditButtonText = document.createElement('p');
        const articleDeleteButtonText = document.createElement('p');
    
        articleSubMenuWrapper.classList.add('content-submenu-wrapper');
    
        articleSubMenu.classList.add('content-submenu');
    
        articleEditButtonText.textContent = "Edit";
        articleDeleteButtonText.textContent = "Delete";
    
        articleEditButton.appendChild(articleEditButtonText);
        articleDeleteButton.appendChild(articleDeleteButtonText);
    
        articleSubMenu.appendChild(articleEditButton);
        articleSubMenu.appendChild(articleDeleteButton);
        
        articleSubMenuWrapper.appendChild(articleSubMenu);
    
        this.mainBox.appendChild(articleSubMenuWrapper);
    }
}

const showArticle = async ()=>{
    const articleArray = await fetchArticle();
    //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    for(const [index, value] of articleArray.entries()){
        const article = new Article(index, value.ArticleHeader, value.ArticleText);
    }
}

showArticle();