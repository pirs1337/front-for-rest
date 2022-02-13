import {urls } from '../router/router.js';

function redirect(url){
    return window.location.href = url;
}

function redirectNotFound() {
    return window.location.href = '/pages/error/404.php';
}

function redirectNotAuth(){
    return redirect(urls[2]);
}

export {redirect, redirectNotFound, redirectNotAuth}