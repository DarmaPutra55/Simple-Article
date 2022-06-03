export default class Comment {
    constructor(commentTemplate, comment, username, uploadDate) {
        this.commentBox = commentTemplate.getElementsByClassName("article-comment")[0];
        this.commentText = commentTemplate.getElementsByClassName("comment-text")[0];
        this.usernameText = commentTemplate.getElementsByClassName("comment-username")[0];
        this.uploadDateText = commentTemplate.getElementsByClassName("comment-date")[0];

        this.commentText.innerHTML = comment;
        this.usernameText.innerHTML = username;
        this.uploadDateText.innerHTML = "Date: "+uploadDate;
    }

    getComment = () =>{
        return this.commentBox;
    }
}