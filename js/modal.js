const makeShadow = (modalCloseCallback) => {
    const body = document.getElementsByTagName('body')[0];
    const shadow = document.createElement('div');
    shadow.classList.add('modal-shadow');
    body.insertAdjacentElement('afterbegin', shadow);
    stopSroll();

    shadow.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-shadow')){
            shadow.remove();  
            stopSroll();
            modalCloseCallback();
        }
    });
}

const stopSroll = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('stop-scroll');
}