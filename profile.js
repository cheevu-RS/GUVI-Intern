$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/profile.php',
        cache: false,
        success: function (response) {
            console.log(response);
            var res = JSON.parse(response);
            if(res['code']===1)
            {   
                let name = $('form #name');
                console.log(name);
                let user = $('form #username');
                let dob = $('form #dob');
                let age = $('form #age');
                let email = $('form #email');
                let contact = $('form #contact');
                name.val(res['name']);
                user.val(res['username']);
                dob.val(res['dob']);
                age.val(res['age']);
                email.val(res['email']);
                contact.val(res['contact']);

                let btn = $('form #save');
                btn.click(function () {
                    if (user.val() !== res['username'])
                    {
                        new PNotify({
                            title: 'Error',
                            text: "Can't change username",
                            styling: "brighttheme",
                            delay: 3000,
                        });
                    }
                    if (name.val() !== res['name']||
                    dob.val() !== res['dob']||age.val() !== res['age']||
                    email.val() !== res['email']||contact.val() !== res['contact'])
                    {
                        let data = '[{"username":"'+user.val()+'","name":"'+name.val()+'","dob":"'+dob.val()+'","age":"'+age.val()
                        +'","email":"'+email.val()+'","contact":"'+contact.val()+'"}]';
                        console.log(data);
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:5000/profile.php',
                            data: {"data":data},
                            cache: false,
                            success: function (response) {
                                console.log(response);
                            }
                        })
                    }
                });
            }
        }
    });
});