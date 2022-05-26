export const getContent = async() =>{
    const response = await fetch("/view/article-read.html");
    const result = response.text();
    return result;
}