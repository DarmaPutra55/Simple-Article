export const getContent = async () =>{
    const response = await fetch("/view/about-us.html");
    const result = response.text();
    return result;
}