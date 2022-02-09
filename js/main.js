import {register, login} from './auth/auth.js';
import {getPosts} from './post/post.js';
import {getUserById} from './user/user.js';
import {home} from './auth/home.js';

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
          case urls[4]:
            home(url)
          break;
        default:
          alert( "Нет таких значений" );
    }
})


const currentUrl = document.location.pathname+document.location.search;

function getUrlParams(){
  const QueryString = window.location.search; 
  const urlParams = new URLSearchParams(QueryString); 

  return urlParams;
}

const urls = ['/', '/pages/unauth/auth/register.php', '/pages/unauth/auth/login.php', '/pages/auth/home.php?'];
urls.push(urls[3]+getUrlParams());

const url = 'http://127.0.0.1:8000/api/';

// if user auth 
if (localStorage.getItem('token')) {
  $('.nav-item, #login-link').remove();

  let homeLink = `<li class="nav-item"><a class="nav-link" href=${urls[3]+`id=${27}`}>Home</a></li>`;
  $('.navbar-nav').append($(homeLink));

  let logoutLink = `<li class="nav-item"><a class="nav-link" href=${currentUrl}>Logout</a></li>`;
  $('.navbar-nav').append($(logoutLink));
}


function showErrors(errors){
    $('.alert-danger').remove();

    if ('errors' in errors) {
      eachError(errors.errors)
    } else {
      eachError(errors)
    }
}

function eachError(errors){
  for (const key in errors) {
    let alert = `<div class="alert alert-danger">${errors[key]}</div>`;
    $(`#${key}`).after(alert);
  }
}


function redirect(url){
    window.location.href = url;
}