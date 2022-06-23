import Comment from "/js/comment.js";
import DBOperation from "/js/db.js";
import { getCookieUsername } from "/js/getUsername.js";
import { toggleLoading } from "/js/loading.js";

const commentList = {
    mainArray : [],
    viewArray : [],

    setTemplate : async function () {
        try{
            const parser = new DOMParser();
            const responseComment = await fetch("/view/article-comment.html");
            const responseSubmenu = await fetch("/view/submenu.html");
            this.commentTemplateBase = parser.parseFromString(await responseComment.text(), "text/html");
            this.submenuTemplateBase = parser.parseFromString(await responseSubmenu.text(), "text/html");
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    },

    fetchComment : async function (id){
        const db = new DBOperation();
        const result = await db.fetchComment(id);
        return result;
    },
    
    makeList : async function (id){
        try{
            const commentArray = await this.fetchComment(id);
            
            if(commentArray === null){
                return;
            }
            
            for(const value of commentArray){
                this.addCommentToList(this.commentTemplateBase, this.submenuTemplateBase, value.CommentID, value.CommentText, value.Username, value.CommentDate);
            }
        }

        catch(err){
            console.error("Error occured: "+err);
        }
            
    },

    addCommentToList : function (commentTemplateBase, submenuTemplateBase, CommentID, CommentText, Username, CommentDate){
        const commentTemplate = commentTemplateBase.cloneNode(true);
        const comment = new Comment(commentTemplate, CommentID, CommentText, Username, CommentDate);
        if(getCookieUsername() === Username){
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

    emptyList : function() {
        this.mainArray = [];
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

const insertComment = async (articleID) => {
    const commentText = document.getElementById("comment-create-textarea");
    const commentTextTrimmed = commentText.value.trim();
        
    if(commentTextTrimmed === ""){
        return;
     }

    const db = new DBOperation();
    const result = await db.insertComment(articleID, commentTextTrimmed, getDateNow());
    if(result.status === "ok"){
        alert("Comment Uploaded");
     }
}

const updateComment = async () => {
        const commentText = document.getElementById("comment-create-textarea");
        const commentEditID = document.getElementById("comment-edit-id");
        const commentTextTrimmed = commentText.value.trim();
        
        if(commentTextTrimmed === ""){
            return;
        }

        const db = new DBOperation();
        const result = await db.updateComment(commentEditID.value, commentTextTrimmed, getDateNow());
        if(result.status === "ok"){
            alert("Comment Updated");
        }
}

const clearComment = () => {
    const commentEditID = document.getElementById("comment-edit-id");
    const commentText = document.getElementById("comment-create-textarea");
    commentText.value = "";
    commentEditID.value = "";
}

const submitButtonEvent = async () => {
    const commentEditID = document.getElementById("comment-edit-id");
    const commentInputButton = document.getElementById("comment-submit-button");
    const articleID = document.getElementById("read-article-id");
    commentInputButton.addEventListener("click", async (e) =>{
        e.preventDefault();
        try{
            toggleLoading();
            if(!commentEditID.value){
                await insertComment(articleID.value);
            }
            else{
                await updateComment();
            }
    
            clearComment();
            commentList.emptyList();
            await commentList.setComment(articleID.value);
            commentList.refreshComment();
            toggleLoading();
        }
        catch(err){
            toggleLoading();
            console.error("Error occured: "+err);
        }
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

const setScroll = () =>{
    const header = document.getElementById("header-wrapper");
    const headerHeight = parseInt(window.getComputedStyle(header).height) + 20 + "px";
    document.getElementById("comment-create-wrapper").style.scrollMarginTop = headerHeight;
}
//End Insert Comment

export const showCommentList = async (articleID) => {
    try{
        setScroll();
        commentList.emptyList();
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