import DBOperation from '/js/db.js';

export const logout = async () => {
    const db = new DBOperation();
    const result = await db.logoutUser();
    
    if(result.success === "ok"){
        alert("Logout success!");
        window.location.href = "/index";
    }

    else{
        alert("Logout failed!");
    }
}