
import DBOperation from "/js/db.js";
import { showCommentList } from "/js/comment-list.js";
import { cekCookiesUsername } from "/js/getUsername.js";

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
        const articleID = document.getElementById("read-article-id");
        articleID.value = id;
        const fetchedArticle = await fetchArticle(id);
        setArticleReadText(fetchedArticle[0].ArticleHeader, fetchedArticle[0].ArticleText);
    }
    catch(err){
        console.error(err);
    }
}

const setCommentEditor = async () =>{
    const commentEditorWrapper = document.getElementById("comment-create-wrapper");
    commentEditorWrapper.innerHTML = await getCommentEditor();
}

const getCommentEditor = async () =>{
    try{
        const response = await fetch("/view/comment-editor.html");
        const content = await response.text();
        return content;
    }

    catch(err){
        console.error("Error occured: "+err);
    }
}

export const getContent = async() =>{
    const response = await fetch("/view/article-read.html");
    const result = response.text();
    return result;
}

export const setUpArticleRead = async(id) =>{
    await setArticleContent(id);
    if(cekCookiesUsername()){
        await setCommentEditor();
    }
    await showCommentList(id);
}