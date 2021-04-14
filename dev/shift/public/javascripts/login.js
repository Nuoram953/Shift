window.addEventListener('load', () => {


    //Remove error message each 5 seconds
    setInterval(() => {
        if (document.querySelector('.error') != null ){
            setTimeout(() => {
                document.querySelector('.error').remove();
            }, 5000);
        }
    }, 500);


})






