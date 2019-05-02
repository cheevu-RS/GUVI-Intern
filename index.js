$(document).ready(function(){
    let signInBtn = $('#signin');
    let signUpBtn = $('#signup');
    let smallDiv = $('.white');
    let bigDiv = $('.bg-green');
    let smallSignIn = $('.white > .signin');
    let smallSignUp = $('.white > .signup');
    let bigSignIn = $('.bg-green > .signin');
    let bigSignUp = $('.bg-green > .signup');
    let registerBtn = $('#register');
    let loginBtn = $('#login');
    
    function click(){
        if(!smallDiv.hasClass('small-left') && !smallDiv.hasClass('small-right'))
        {
            smallDiv.addClass('small-right');
        }
        else
        {
            smallDiv.toggleClass('small-right');
            smallDiv.toggleClass('small-left');
            
        }
        smallSignIn.fadeIn("slow",function(){smallSignIn.toggleClass('hidden');});
        smallSignUp.fadeIn("slow",function(){smallSignUp.toggleClass('hidden');});
        if(!bigDiv.hasClass('big-left') && !bigDiv.hasClass('big-right'))
        {
            bigDiv.addClass('big-left');
        }
        else
        {
        bigDiv.toggleClass('big-left');
        bigDiv.toggleClass('big-right');
        }
        bigSignIn.fadeIn("slow",function(){bigSignIn.toggleClass('hidden');});
        bigSignUp.fadeIn("slow",function(){bigSignUp.toggleClass('hidden');});
    }
    function login(){
        let user = $('.bg-green .signin .username').val();
        let pwd =  $('.bg-green .signin .password').val();
        if(user === "" || pwd === "")
        new PNotify({
            title: 'Error',
            text: "username and password can't be blank",
            styling: "brighttheme",
            delay: 3000,
        });
        else
        {
            let hash = CryptoJS.SHA1(pwd);
            let pwd_hash = CryptoJS.enc.Hex.stringify(hash).toUpperCase();
            let data = '[{"user":"'+user+'","pwd_hash":"'+pwd_hash+'"}]';
            $.ajax({
                type: 'POST',
                url: 'http://localhost:5000/login.php',
                data: {"data":data},
                cache: false,
                success: function (response) {
                    let res = JSON.parse(response);
                    if(res["code"]==0)
                    {
                        new PNotify({
                            title: 'Failed to log in',
                            text: res["message"],
                            styling: "brighttheme",
                            delay: 3000,
                        });
                    }
                    if(res["code"]==1)
                    {
                        new PNotify({
                            title: 'Success',
                            text: res["message"],
                            styling: "brighttheme",
                            delay: 3000,
                        });
                        $('.bg-green .signin .username').val("");
                        $('.bg-green .signin .password').val("");
                        //redirect to profile
                            window.location = "profile.html";
                    }
                }
            });
        }
    }
    function validateEmail(email) {
        var re = new RegExp ("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        return re.test(String(email).toLowerCase());
    }
    function register(){
        let name = $('.bg-green .signup #name').val();
        let username = $('.bg-green .signup #username').val();
        let email = $('.bg-green .signup #email').val();
        let password = $('.bg-green .signup #password').val();
        let rpassword = $('.bg-green .signup #rpassword').val(); 
        if(name === "" || username === "" || email === "" || password === "" || rpassword === "")
        new PNotify({
            title: 'Error',
            text: "input fields can't be blank",
            styling: "brighttheme",
            delay: 3000,
        });
        else if(!validateEmail(email))
        new PNotify({
            title: 'Error',
            text: "invalid email",
            styling: "brighttheme",
            delay: 3000,
        });
        else if(password !== rpassword)
        new PNotify({
            title: 'Error',
            text: "passwords don't match",
            styling: "brighttheme",
            delay: 3000,
        });
        else
        {
            let hash = CryptoJS.SHA1(password);
            let pwd_hash = CryptoJS.enc.Hex.stringify(hash).toUpperCase();
            let data = '[{"name":"'+name+'","username":"'+username+'","email":"'+email+'","pwd_hash":"'+pwd_hash+'"}]';
            console.log(data);
            $.ajax({
                type: 'POST',
                url: 'http://localhost:5000/register.php',
                data: {"data":data},
                cache: false,
                success: function (response) {
                    let res = JSON.parse(response);
                    if(res["code"]==0)
                    {
                        new PNotify({
                            title: 'Failed to register',
                            text: res["message"],
                            styling: "brighttheme",
                            delay: 3000,
                        });
                    }
                    if(res["code"]==1)
                    {
                        new PNotify({
                            title: 'Success',
                            text: res["message"],
                            styling: "brighttheme",
                            delay: 3000,
                        });
                        $('.bg-green .signup #name').val("");
                        $('.bg-green .signup #username').val("");
                        $('.bg-green .signup #email').val("");
                        $('.bg-green .signup #password').val("");
                        $('.bg-green .signup #rpassword').val(""); 
                    }
                }
            });
        }
    }
   
    signInBtn.click(click);
    signUpBtn.click(click);
    loginBtn.click(login);
    registerBtn.click(register);
});

   