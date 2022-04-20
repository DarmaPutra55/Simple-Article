const fetchArticle = async (id = null) =>{  
    try{
        let data;
        if(id !== null){
            data = await singleFetch(id);
        }
        else{
            data = await allFetch()
        }
        return data;
    }
    catch(err){
        console.error(err);
    }
}

const singleFetch = async (id)=> {
    let idFormData = new FormData();
    idFormData.append("id", id.toString());
    const response = await fetch("php/fetch.php", {
        method: "POST",
        body: idFormData
    })
    const data = await response.json();
    return data;
}

const allFetch = async ()=> {
    const response = await fetch("php/fetch.php")
    const data = await response.json();
    console.log(data);
    return data;
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

const showArticle = async (id = null)=>{
    try{
        if(id !== null){
            await addSingleArticleBox(id);
        }
        else{
            await addAllArticleBox();
        }
    } catch(err) {
        console.error(err);
    }
}

const addAllArticleBox = async ()=> {
    let articleArray = await fetchArticle(null);
    for(value of articleArray){
        createArticleBox(value.ArticleHeader, value.ArticleText);
    }
}

const addSingleArticleBox = async (id)=> {
    let articleArray = await fetchArticle(id);
    createArticleBox(articleArray[0].ArticleHeader, articleArray[0].ArticleText);
}

showArticle();