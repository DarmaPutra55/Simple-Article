export default class DBOperation {
    fetchArticle = async () => {
        try {
            const response = await fetch("/php/fetch.php");
            const data = await response.json();

            return data;
        }
        catch (err) {
            alert("Error has occured: "+err);
        }
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
}