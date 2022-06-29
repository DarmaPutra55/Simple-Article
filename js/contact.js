class Contact {
    titleText;
    emailText;
    contentText;
    submitBtn;
    clearBtn;

    constructor(){
        this.titleText = document.getElementById("contant-title");
        this.emailText = document.getElementById("contact-email");
        this.contentText = document.getElementById("contant-content");
        this.submitBtn = document.getElementById("submit-email");
        this.clearBtn = document.getElementById("clear-email");
    }
}

export class ContactBtnEvent extends Contact{
    constructor(){
        this.submitBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            this.submitEvent();
        });
        this.clearBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            this.clearEvent();
        });
    }

    clearEvent = () =>{
        this.emailText.value = "";
        this.contentText.value= "";
    }

    submitEvent = () => {

    }
}

export const getContent = async () => {
    const response = await fetch("/view/contact.html");
    const result = await response.text();
    return result;
}