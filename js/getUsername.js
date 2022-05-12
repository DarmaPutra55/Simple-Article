export const getUsername = async () =>{
    const response = await fetch("/simplePHPFetch/php/userValidation.php");
    const result = await response.json();
    if(result.error === undefined){
        return result.username;
    }
    return "";   
}
    