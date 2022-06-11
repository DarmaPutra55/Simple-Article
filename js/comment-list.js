import Comment from "/js/comment.js";
import DBOperation from "/js/db.js";
import { cekCookiesUsername } from "/js/getUsername.js";

const commentList = {
    mainArray : [],
    viewArray : [],

    setTemplate : async function () {
        const parser = new DOMParser();
        const responseComment = await fetch("/view/article-comment.html");
        const responseSubmenu = await fetch("/view/submenu.html");
        this.commentTemplateBase = parser.parseFromString(await responseComment.text(), "text/html");
        this.submenuTemplateBase = parser.parseFromString(await responseSubmenu.text(), "text/html");
    },

    fetchComment : async function (id){
        const db = new DBOperation();
        const result = await db.fetchComment(id);
        return result;
    },
    
    makeList : async function (id){
        
        const commentArray = await this.fetchComment(id);
        
        if(commentArray === null){
            return;
        }
        
        for(const value of commentArray){
            this.addCommentToList(this.commentTemplateBase, this.submenuTemplateBase, value.CommentID, value.CommentText, value.Username, value.CommentDate);
        }
            
    },

    addCommentToList : function (commentTemplateBase, submenuTemplateBase, CommentID, CommentText, Username, CommentDate){
        const commentTemplate = commentTemplateBase.cloneNode(true);
        const comment = new Comment(commentTemplate, CommentID, CommentText, Username, CommentDate);
        if(cekCookiesUsername()){
            const submenuTemplate = submenuTemplateBase.cloneNode(true);
            comment.makeSubmenu(submenuTemplate, this.deleteComment.bind(this));
        }
        this.mainArray.push(comment.getComment());
    },

    setComment : async function (articleID){
        await this.makeList(articleID);
        this.viewArray = this.mainArray;
    },

    refreshComment : function() {
        this.viewArray = this.mainArray;
        this.fillList();
    },

    deleteComment : function (targetElement){
        this.mainArray = this.mainArray.filter(element => element !== targetElement);
        this.refreshComment();
    },

    fillList : function() {
        const mainBox = document.getElementById('article-comment-area');
        mainBox.innerHTML = "";

        for(const value of this.viewArray){
            mainBox.appendChild(value);
        }
    }
}

//Start Insert Comment

const insertComment = async (commentID) => {
    const commentText = document.getElementById("article-create-textarea");
    const commentTextTrimmed = commentText.value.trim();
    
    if(commentTextTrimmed === ""){
        return;
    }

    const db = new DBOperation();
    const result = await db.insertComment(commentID, commentTextTrimmed, getDateNow());
    if(result.status === "ok"){
        alert("Comment Uploaded");
    }
}

const clearComment = () => {
    const commentText = document.getElementById("article-create-textarea");
    commentText.value = "";
}

const submitButtonEvent = async () => {
    const commentInputButton = document.getElementById("comment-submit-button");
    const articleID = document.getElementById("read-article-id");
    commentInputButton.addEventListener("click", async (e) =>{
        e.preventDefault();
        await insertComment(articleID.value);
        clearComment();
        await commentList.setComment(articleID.value);
        commentList.refreshComment();
    });
}

const clearButtonEvent = () => {
    const commentClearButton = document.getElementById("comment-clear-button");
    commentClearButton.addEventListener('click', (e)=>{
        e.preventDefault();
        clearComment();
    });
}

const setInsertComment = async () => {
    await submitButtonEvent();
    clearButtonEvent();
}

const getDateNow = () => {
    let date = new Date();
    let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    return today;
}

//End Insert Comment

export const showCommentList = async (articleID) => {
    try{
        await commentList.setTemplate();
        await commentList.setComment(articleID);
        commentList.fillList();
        await setInsertComment();
       
        //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    }

    catch(err){
        console.error("Error occured: "+err);
    }
}