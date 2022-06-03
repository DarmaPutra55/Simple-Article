
import DBOperation from "/js/db.js";
import Comment from "/js/comment.js";

const fetchArticle = async(id) =>{
    const db = new DBOperation();
    const result = await db.fetchArticle(id);
    return result;
}

const fetchComment = async(id) =>{
    const db = new DBOperation();
    const result = await db.fetchComment(id);
    return result;
}

const setUpComment = async(id) =>{
    const parser = new DOMParser();
    const commentArea = document.getElementById("article-comment-area");
    const commentArray = await fetchComment(id);
    const responseComment = await fetch("/view/article-comment.html");
    const commentTemplateBase = parser.parseFromString(await responseComment.text(), "text/html");
    for(const value of commentArray){
        const commentTemplate = commentTemplateBase.cloneNode(true);
        const comment = new Comment(commentTemplate, value.CommentText, value.Username, value.CommentDate);
        commentArea.appendChild(comment.getComment());
    }
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
    await setUpComment(id);
}