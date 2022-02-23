import {urls} from '../router/router.js';

function redirect(url){
    return window.location.href = url;
}

function redirectNotFound() {
    return window.location.href = '/pages/error/404.php';
}

function redirectAuth(user){
    return redirect(`${urls.public.home}?id=${user.data.id}`);
}

function redirectNotAuth(){
    return redirect(urls.guest.login);
}

export {redirect, redirectNotFound, redirectAuth, redirectNotAuth}