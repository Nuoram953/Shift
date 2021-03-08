window.addEventListener('load',()=>{
    console.log("test page login");

    let button = document.getElementById('login_confirm')

    button.addEventListener('click',()=>{
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        
        fetch("/director/login/connection",{
            method: 'POST',
            body:JSON.stringify({"username":username,"password":password}),
            headers: {"Content-Type": "application/json"}
        })
        


})})