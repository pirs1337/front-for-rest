import {getUserByToken} from '../user/user.js';

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
            let errorResponse = jqXHR.responseJSON.error;
            showErrors(errorResponse);
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

        $.post(url+'login', formData, async function(data){
            console.log(data.token);
            localStorage.setItem('token', data.token);
            let user = await getUserByToken(url, data.token);

            redirect(urls[4]+`id=${user.data.id}`);
        }).fail(function (jqXHR) {
            let errorResponse = jqXHR.responseJSON.error;
            showErrors(errorResponse);
        });
    })

}

export {register, login}