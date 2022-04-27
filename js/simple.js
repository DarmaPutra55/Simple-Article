class ArticleEditor{
    constructor(){
        this.articleIDInput = document.getElementById('article-id');
        this.articleTitleInput = document.getElementById('article-title');
        this.articleTextInput = document.getElementById('article-content');
        this.articleSubmitButton = document.getElementById('submit-article');
        this.articleClearButton = document.getElementById('clear-article');
        console.log("Created");
    }

    submitArticle = async (articleTitle, articleText, uploader = "Texas") => {
        try{
            const dbOperation = new DBOperation();
            const result = await dbOperation.uploadArticle(articleTitle, articleText, uploader, this.getDateNow());
            console.log(result);
            this.clearArticle();
        }
        catch(err){
            alert(err);
        }
    }

    clearArticle = () => {
        this.articleTitleInput.value = "";
        this.articleTextInput.value = "";
    }

    addSubmitButtonEvent = () => {
        this.articleSubmitButton.addEventListener('click', ()=>{
            if(this.articleTitleInput.value !=="" && this.articleTextInput.value !== ""){
                this.submitArticle(this.articleTitleInput.value, this.articleTextInput.value);
            }
            else{
                alert("Please fill the form first!");
            }
        });
    }

    addClearButtonEvent = () =>{
        this.articleClearButton.addEventListener('click', ()=> {
           this.clearArticle(); 
        });
    }

    getDateNow = () => {
        let date = new Date();
        let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        return today;
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

const getMainArticleContainer = async () => {
    const response = await fetch('view/article.html');
    const text = await response.text();
    return text;
}

const addMainContent = async (content) => {
    const mainContentArea = document.getElementById('main-content-area');
    mainContentArea.innerHTML = await content();
}

const mainArticleStart = async () =>{
    await addMainContent(getMainArticleContainer);
    await showArticle();
}

//mainArticleStart();
const setUp = () =>{
    let articleE = new ArticleEditor();
    articleE.addSubmitButtonEvent();
    articleE.addClearButtonEvent();
    console.log(articleE);
}

setUp();