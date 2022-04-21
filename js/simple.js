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


const createArticleBox = (header, article) => {
    const mainBoxArea = document.getElementById('main-box');
    const mainBox = document.createElement('div');
    const mainHeader = document.createElement('div');
    const mainArticle = document.createElement('div');
    const headerTextWrapper = document.createElement('div');
    const headerButtonWrapper = document.createElement('div');
    const headerText = document.createElement('h1');
    const headerButton = document.createElement('button');
    const headerButtonIcon = document.createElement('i');
    const articleText = document.createElement('p');

    mainBox.classList.add('content-box');
    mainHeader.classList.add('content-header');
    mainArticle.classList.add('content-body');
    headerTextWrapper.classList.add('content-header-text');
    headerButtonWrapper.classList.add('content-header-button');
    headerButtonIcon.classList.add('fa', 'fa-solid', 'fa-ellipsis-vertical','fa-2x' );

    headerText.innerHTML = header;
    articleText.innerHTML = article;

    mainHeader.appendChild(headerTextWrapper);
    mainHeader.appendChild(headerButtonWrapper);
    headerTextWrapper.appendChild(headerText);
    headerButton.appendChild(headerButtonIcon);
    headerButtonWrapper.appendChild(headerButton);
    mainArticle.appendChild(articleText);
    mainBox.appendChild(mainHeader);
    mainBox.appendChild(mainArticle);
    mainBoxArea.appendChild(mainBox);
}

const showArticle = async ()=>{
    let articleArray = await fetchArticle();
    //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    for(value of articleArray){
        createArticleBox(value.ArticleHeader, value.ArticleText);
    }
}

showArticle();
showArticle();