
function register(url, urls, redirect, showErrors){

    const form = $('#register-form');

    form.submit(function (e){
        e.preventDefault();

        let login = $('#login').val();
        let email = $('#email').val()
        let password = $('#password').val();
        let password_confirmation = $('#password_confirmation').val();

        let formData  = {
            login: login,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }

        $.post(url+'register', formData, function(data){
            redirect(urls[2]);
        }).fail(function (jqXHR) {
            showErrors(jqXHR.responseJSON.error.errors)
        });
    })

}


function login(url, urls, redirect, showErrors){

    const form = $('#login-form');

    form.submit(function (e){
        e.preventDefault();

        let login = $('#login').val();
        let password = $('#password').val();

        let formData  = {
            login: login,
            password: password
        }

        $.post(url+'login', formData, function(data){
            redirect(urls[1]);
        }).fail(function (jqXHR) {
            showErrors(jqXHR.responseJSON.error.errors)
        });
    })

}

export {register, login}