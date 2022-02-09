import {getUserById} from '../user/user.js';
import {getUserPosts} from '../post/post.js';

async function home(url){
    const QueryString = window.location.search; 
    const urlParams = new URLSearchParams(QueryString); 
    let id = urlParams.get('id');
    
    let user = await getUserById(url, id);
    $('h1').append(' '+user.data.login);
    $('h1').after(`<img class="img-fluid mb-5" alt="user avatar" src=${user.data.avatar}>`);

    getUserPosts(url, id);
}

export {home}