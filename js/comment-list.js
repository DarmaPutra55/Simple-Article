import Comment from "/js/comment.js";
import DBOperation from "/js/db.js";
import { cekCookiesUsername } from "/js/getUsername.js";

class CommentList {
    constructor(){
        this.mainArray = [];
        this.viewArray = [];
    }

    fetchComment = async(id) =>{
        const db = new DBOperation();
        const result = await db.fetchComment(id);
        return result;
    }
    
    addCommentToList = async(id) =>{
        const parser = new DOMParser();
        const commentArray = await this.fetchComment(id);
        const responseComment = await fetch("/view/article-comment.html");
        const responseSubmenu = await fetch("/view/submenu.html");
        const commentTemplateBase = parser.parseFromString(await responseComment.text(), "text/html");
        const submenuTemplateBase = parser.parseFromString(await responseSubmenu.text(), "text/html");
        for(const value of commentArray){
            const commentTemplate = commentTemplateBase.cloneNode(true);
            const comment = new Comment(commentTemplate, value.CommentID, value.CommentText, value.Username, value.CommentDate);
            if(cekCookiesUsername()){
                const submenuTemplate = submenuTemplateBase.cloneNode(true);
                comment.makeSubmenu(submenuTemplate, this.deleteComment);
            }
            this.mainArray.push(comment.getComment());
        }
    }

    setComment = async (articleID) => {
        await this.addCommentToList(articleID);
        this.viewArray = this.mainArray;
    }

    refreshComment= () => {
        this.viewArray = this.mainArray;
        this.fillList();
    }

    deleteComment = (targetElement) => {
        this.mainArray = this.mainArray.filter(element => element !== targetElement);
        this.refreshComment();
    }

    fillList = () => {
        const mainBox = document.getElementById('article-comment-area');
        mainBox.innerHTML = "";

        for(const value of this.viewArray){
            mainBox.appendChild(value);
        }
    }
}

export const showCommentList = async (articleID) => {
    try{
        const commentList = new CommentList();
        await commentList.setComment(articleID);
        commentList.fillList();
       
        //let newArticle = articleArray.filter(el => el.ArticleHeader.includes("Test"));
    }

    catch(err){
        console.error("Error occured: "+err);
    }
}