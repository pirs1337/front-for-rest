import {getUserById} from '../user/user.js';
import {getUserPosts} from '../post/post.js';
import {redirectNotFound} from '../redirect/redirect.js';

function home(url){
    const QueryString = window.location.search; 
    const urlParams = new URLSearchParams(QueryString); 
    let id = urlParams.get('id');

    let user = getUserById(url, id);

    user.then(res => {
        $('h1').append(' '+res.data.login);
        $('h1').after(`<img class="img-fluid mb-5" alt="user avatar" src=${res.data.avatar}>`);
        getUserPosts(url, id);

    }).catch(e => {
       return redirectNotFound();
    })
}

export {home}