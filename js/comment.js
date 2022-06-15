import SubMenu from "/js/sub-article.js";

export default class Comment {
    constructor(commentTemplate, commentID, comment, username, uploadDate) {
        this.commentBox = commentTemplate.getElementsByClassName("article-comment")[0];
        this.commentText = commentTemplate.getElementsByClassName("comment-text")[0];
        this.usernameText = commentTemplate.getElementsByClassName("comment-username")[0];
        this.uploadDateText = commentTemplate.getElementsByClassName("comment-date")[0];
        this.commentIDBox = commentTemplate.getElementsByClassName("comment-id")[0];

        this.commentText.innerHTML = comment;
        this.usernameText.innerHTML = username;
        this.uploadDateText.innerHTML = "Date: "+uploadDate;
        this.commentIDBox.value = commentID;
    }

    makeSubmenu = (submenuTemplate, deleteCallback) => {
        this.submenu = new SubMenu(submenuTemplate);
        this.submenu.setSubmenuPosition();
        this.submenu.setDeleteButtonEvent(this.commentIDBox.value, this.commentBox, deleteCallback, "comment"); //replace with deleteCallback later
        this.submenu.setEditEventComment(()=>{
            const commentText = document.getElementById("article-create-textarea");
            const commentID = document.getElementById("comment-edit-id");
            commentText.value = "";
            commentID.value = "";
            commentText.value = this.commentText.textContent;
            commentID.value = this.commentIDBox.value
        });
        this.submenu.setExpandButtonEvent();
        this.submenu.setContentBoxResizeEvent(this.commentBox);
        this.submenu.addSubmenu(this.commentBox);
        this.submenu.addSubmenuButton(this.commentBox);
    }

    getComment = () =>{
        return this.commentBox;
    }
}