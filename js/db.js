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
            alert("Error has occured: " + err);
        }
    }

    uploadArticle = async (articleTitle, articleContent, uploader, date) =>{
        try{
            let uploadFormData = new FormData();
            uploadFormData.append("articleTitle", articleTitle);
            uploadFormData.append("articleContent", articleContent);
            uploadFormData.append("uploader", uploader);
            uploadFormData.append("date", date);

            const response = await fetch('/php/insert.php', {
                method: 'POST',
                body: uploadFormData
            });
            
            const result = await response.json();
            return result;
        }

        catch (err) {
            alert("Error has occured: " + err);
        }
    }

    updateArticle = async (articleID, articleTitle, articleContent, uploader, date) =>{
        try{
            let updateFormData = new FormData();
            updateFormData.append("articleID", articleID);
            updateFormData.append("articleTitle", articleTitle);
            updateFormData.append("articleContent", articleContent);
            updateFormData.append("uploader", uploader);
            updateFormData.append("date", date);

            const response = await fetch('/php/update.php', {
                method: 'POST',
                body: updateFormData
            });
            
            const result = await response.json();
            return result;
        }

        catch (err) {
            alert("Error has occured: " + err);
        }
    }

}