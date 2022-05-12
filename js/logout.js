import DBOperation from '/simplePHPFetch/js/db.js';

export const logout = async () => {
    const db = new DBOperation();
    const result = await db.logoutUser();
    
    if(result.success === "ok"){
        alert("Logout success!");
        window.location.href = "https://localhost/simplePHPFetch/";
    }

    else{
        alert("Logout failed!");
    }
}