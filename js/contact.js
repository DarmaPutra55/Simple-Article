import DBOperation from "/js/db.js";
import { toggleLoading } from "/js/loading.js";

class Contact {
    titleText;
    emailText;
    contentText;
    submitBtn;
    clearBtn;

    constructor(){
        this.titleText = document.getElementById("contact-title");
        this.emailText = document.getElementById("contact-email");
        this.contentText = document.getElementById("contant-content");
        this.submitBtn = document.getElementById("submit-email");
        this.clearBtn = document.getElementById("clear-email");
    }
}

class ContactBtnEvent extends Contact{
    constructor(){
        super();
        this.submitBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            this.#submitEvent();
        });
        this.clearBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            this.#clearEvent();
        });
    }

    #clearEvent = () =>{
        this.titleText.value = "";
        this.emailText.value = "";
        this.contentText.value= "";
    }

    #submitEvent = () => {
        try{
            const contact = new ContactContent();
            contact.submitMail();
            this.#clearEvent();
        }
        catch(err){
            console.error("Error occured: "+err);
        }
    }
}

class ContactContent extends Contact{
    constructor(){
        super();
    }

    submitMail = async () =>{
        try{
            toggleLoading();
            const dbOperation = new DBOperation();
            const email = (this.emailText.value).trim();
            const title = (this.titleText.value).trim();
            const content = (this.contentText.value).trim();
    
            if(email === "" || title === "" || content === ""){
                alert("One of the column is empty!");
                return;
            }

            const result = await dbOperation.sendMail(email, title, content);
            if(result !== "Message has been sent") throw new Error("Failed sending message.");
            alert(result+".");
        }

        catch(err){
            console.error("Error occured: "+err);
        }
        finally{
            toggleLoading();
        }
    }
}


export const getContent = async () => {
    const response = await fetch("/view/contact.html");
    const result = await response.text();
    return result;
}

export const setContact = async () => {
   new ContactBtnEvent();
}