import DBOperation from '/js/db.js';

export const logout = async () => {
    const db = new DBOperation();
    const result = await db.logoutUser();

    if(result.success === "ok"){
        deleteUsernameCookies();
        alert("Logout success!");
        window.location.href = "/index";
    }

    else{
        alert("Logout failed!");
    }
}

const deleteUsernameCookies = () => {
    document.cookie = "username=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}