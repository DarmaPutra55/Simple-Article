//Handle all server request.

export default class DBOperation {
    fetchArticle = async (id = null) => {
        try {
            if(id == null){
                return await this.fetchAllArticle();
            }
            else{
                return await this.fetchSingleArticle(id);
            }
        }
        catch (err) {
            alert("Error has occured: "+err);
        }
    }

    fetchSingleArticle = async (id) =>{
        let articlFormData = new FormData();
        articlFormData.append("aricleID", id);
        const response = await fetch("/php/fetch.php", {
            method: "POST",
            body: articlFormData,
        });

        const data = await response.json();
        return data;
    }

    fetchAllArticle = async () =>{
        const response = await fetch("/php/fetch.php");
        const data = await response.json();
        return data;
    }

    deleteArticle = async (articleID) => {
        try {
            let data = new FormData();
            data.append('ArticleID', articleID);
            const response = await fetch('/php/delete.php', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            return result;
        }

        catch (err) {
            console.error("Error occured: "+err);
        }
    }

    uploadArticle = async (articleTitle, articleContent, date) =>{
        try{
            let uploadFormData = new FormData();
            uploadFormData.append("articleTitle", articleTitle);
            uploadFormData.append("articleContent", articleContent);
            uploadFormData.append("date", date);

            const response = await fetch('/php/insert.php', {
                method: 'POST',
                body: uploadFormData
            });
            
            const result = await response.json();
            return result;
        }

        catch (err) {
            console.error("Error occured: "+err);
        }
    }

    updateArticle = async (articleID, articleTitle, articleContent, date) =>{
        try{
            let updateFormData = new FormData();
            updateFormData.append("articleID", articleID);
            updateFormData.append("articleTitle", articleTitle);
            updateFormData.append("articleContent", articleContent);
            updateFormData.append("date", date);

            const response = await fetch('/php/update.php', {
                method: 'POST',
                body: updateFormData
            });
            
            const result = await response.json();
            return result;
        }

        catch (err) {
            console.error("Error occured: "+err);
        }
    }

    loginUser = async (username, password) =>{
        let loginFormData = new FormData();
        loginFormData.append('username', username);
        loginFormData.append('password', password);

        try{
            const response = await fetch('/php/login.php', {
                method: 'Post',
                body: loginFormData
            });

            const result = await response.json();
            return result;
        }

        catch(err){
            console.error("Error occured: "+err);
        }
    }

    logoutUser = async () => {
        try{
            const response = await fetch('/php/logout.php');
            const result = await response.json();
            return result;
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }

    registerUser = async (username, password) =>{
        let registerFormData = new FormData();
        registerFormData.append('username', username);
        registerFormData.append('password', password);

        try{
            const response = await fetch('/php/register.php', {
                method: 'Post',
                body: registerFormData
            });

            const result = await response.json();
            return result;
        }

        catch(err){
            console.error("Error occured: "+err);
        }
    }

    fetchUsername = async () =>{
        try{
            const response = await fetch('/php/getUsername.php');
            const result = await response.json();
            return result; 
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }

    fetchComment = async (id) => {
        try{
            const commentFormData = new FormData();
            commentFormData.append("articleID", id);
            const response = await fetch("/php/comment/fetchComment.php", {
                method: "POST",
                body: commentFormData,
        });
            const data = await response.json();
            return data;
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }

    insertComment = async(articleID, commentContent, date) => {
        try{
            let commentFormData = new FormData();
            commentFormData.append('articleID', articleID);
            commentFormData.append('commentContent', commentContent);
            commentFormData.append('date', date);
            const response = await fetch('/php/comment/insertComment.php', {
                method: 'POST',
                body: commentFormData
            });
            const result = await response.json();
            return result;
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }
    
    deleteComment = async (commentID) => {
        try{
            let data = new FormData();
            data.append('CommentID', commentID);
            const response = await fetch('/php/comment/deleteComment.php', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            return result;
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }


}