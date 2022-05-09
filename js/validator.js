export const checkUservalidity = async () =>{
    const response = await fetch("/php/userValidation.php");
    const result = await response.json();
    if(result.error === undefined){
        return result.username;
    }

    return "";   
}
    