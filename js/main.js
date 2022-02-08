import {register, login} from './auth/auth.js';
import {getPosts} from './post/post.js';
import {getUserById} from './user/user.js';

$(document).ready(function (){
  
    switch (currentUrl) {
        case urls[0]:
            getPosts(url, getUserById);
          break;
        case urls[1]:
          register(url, urls, redirect, showErrors);
          break;
        case urls[2]:
            login(url, urls, redirect, showErrors);
          break;
        default:
          alert( "Нет таких значений" );
    }
})


const currentUrl = document.location.pathname;

console.log(currentUrl);

const urls = ['/', '/pages/unauth/auth/register.php', '/pages/unauth/auth/login.php'];

const url = 'http://127.0.0.1:8000/api/';


function showErrors(errors){

    $('.alert-danger').remove();

    for (const key in errors) {
        let alert = `<div class="alert alert-danger">${errors[key]}</div>`;
        $(`#${key}`).after(alert);
    }
}


function redirect(url){
    window.location.href = url;
}