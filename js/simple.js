import { addNavRedirectEvent, showContent, addWindowHistoryEvent } from "/js/router.js";
import { checkUservalidity } from "/js/validator.js";
import DBOperation from "/js/db.js";

const pageStart = async () =>{    
    checkUservalidity();
    addNavRedirectEvent();
    showContent();
    addWindowHistoryEvent();
}

pageStart();