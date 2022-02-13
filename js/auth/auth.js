import {getAuthUser} from '../user/user.js';
import {showErrors} from '../error/error.js';
import {redirect} from '../redirect/redirect.js';

function register(url, urls){
    const form = $('#register-form');

    form.submit(function (e){
        e.preventDefault();

        let formData = new FormData($(this).get(0));

        $.ajax({
            url: url+'register',
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function(data){
               return redirect(urls[2]);
            },
            error: function(jqXHR){
                let errorResponse = jqXHR.responseJSON.error;
                showErrors(errorResponse);
            }
        });
    })

}

function login(url, urls){
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
            localStorage.setItem('token', data.token);
            let user = getAuthUser(url, data.token);

            user.then(res => {
               return redirect(`${urls[3]}?id=${res.data.id}`);

            }).catch(e => console.log(e))
            
        }).fail(function (jqXHR) {
            let errorResponse = jqXHR.responseJSON.error;
            showErrors(errorResponse);
        });
    })

}

export {register, login}