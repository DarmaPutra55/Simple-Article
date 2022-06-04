import SubMenu from "/js/sub-article.js";

export default class Comment {
    constructor(commentTemplate, submenuTemplate, comment, username, uploadDate) {
        this.commentBox = commentTemplate.getElementsByClassName("article-comment")[0];
        this.commentText = commentTemplate.getElementsByClassName("comment-text")[0];
        this.usernameText = commentTemplate.getElementsByClassName("comment-username")[0];
        this.uploadDateText = commentTemplate.getElementsByClassName("comment-date")[0];

        this.commentText.innerHTML = comment;
        this.usernameText.innerHTML = username;
        this.uploadDateText.innerHTML = "Date: "+uploadDate;
        this.setComment(submenuTemplate);
    }

    setComment = (submenuTemplate) => {
        this.submenu = new SubMenu(submenuTemplate);
        this.submenu.setSubmenuPosition();
        this.submenu.setDeleteButtonEvent(null, null, this.commentBox, ()=>{return;}); //replace with deleteCallback later
        this.submenu.setEditEvent(2);
        this.submenu.setExpandButtonEvent();
        this.submenu.setContentBoxResizeEvent(this.commentBox);
        this.submenu.addSubmenu(this.commentBox);
        this.submenu.addSubmenuButton(this.commentBox);
    }

    getComment = () =>{
        return this.commentBox;
    }
}