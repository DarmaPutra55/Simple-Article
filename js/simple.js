import { addNavRedirectEvent, showContent } from "/js/router.js";
import { setUpRegister } from "/js/register.js";
import DBOperation from "/js/db.js";



//setLoginMenuEvent();
//setLoginButtonEvent();
setUpRegister();
addNavRedirectEvent();
showContent();