export const getUsername = async () =>{
    const response = await fetch("/php/userValidation.php");
    const result = await response.json();
    if(result.error === undefined){
        return result.username;
    }
    return "";   
}

export const setCookiesUsername = (username) => {
    if(!cekCookiesUsername()){
        document.cookie = "username = "+username;
    }   
}

export const cekCookiesUsername = () => {
    if(getCookieUsername() !==""){
        return true;
    }
    return false;
}

export const getCookieUsername = () => {
    let cookie = document.cookie.split(";");
    for(let element of cookie){
        if(element.includes("username=")){
            let username = element.split("=");
            return username[username.length-1];
        }
    }
    return "";
}