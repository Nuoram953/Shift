window.addEventListener('load', () => {

    setInterval(() => {
        if (document.querySelector('.error') != null ){
            setTimeout(() => {
                document.querySelector('.error').remove();
            }, 5000);
        }
    }, 500);


})






