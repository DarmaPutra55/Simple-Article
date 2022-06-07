
import DBOperation from "/js/db.js";
import { showCommentList } from "/js/comment-list.js";
const fetchArticle = async(id) =>{
    const db = new DBOperation();
    const result = await db.fetchArticle(id);
    return result;
}



const setArticleReadText = async(articleTitle, articleText) => {
    const articleReadHeader = document.getElementById("article-title");
    const articleReadContent = document.getElementById("article-text");

    articleReadHeader.textContent = articleTitle;
    articleReadContent.textContent = articleText;
}

const setArticleContent = async(id) =>{
    try{
        const fetchedArticle = await fetchArticle(id);
        setArticleReadText(fetchedArticle[0].ArticleHeader, fetchedArticle[0].ArticleText);
    }
    catch(err){
        console.error(err);
    }
}

export const getContent = async() =>{
    const response = await fetch("/view/article-read.html");
    const result = response.text();
    return result;
}

export const setUpArticleRead = async(id) =>{
    await setArticleContent(id);
    await showCommentList(id);
}