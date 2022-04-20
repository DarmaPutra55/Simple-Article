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
    const headerText = document.createElement('h1');
    const articleText = document.createElement('p');
    mainBox.classList.add('content-box');
    mainHeader.classList.add('content-header');
    mainArticle.classList.add('content-body');
    headerText.innerHTML = header;
    articleText.innerHTML = article;
    mainHeader.appendChild(headerText);
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