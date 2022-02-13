import { router, urls, currentUrl, url } from './router/router.js';
import { getAuthUser } from './user/user.js';
import { redirectNotAuth } from './redirect/redirect.js';

let user = getAuthUser(url, localStorage.getItem('token'));

changeHtmlWhenAuth();

$(document).ready(function (){
  router();
})

function changeHtmlWhenAuth() {
  user.then(res => {
    $('.nav-item #login-link').remove();

    let addPostLink = `<li class="nav-item"><a class="nav-link" href="/pages/auth/post/add.php">Add post</a></li>`;
    let homeLink = `<li class="nav-item"><a class="nav-link" href=${urls[3]+`?id=${res.data.id}`}>Home</a></li>`;
    let logoutLink = `<li class="nav-item"><button class="btn btn-danger" id="logout-btn" href=${currentUrl}>Logout</button></li>`;

    let links = [addPostLink, homeLink, logoutLink];

    links.forEach(element => {
      $('.navbar-nav').append($(element));
    });

    //logout user
    $('#logout-btn').click(function (){
      localStorage.removeItem('token');
      return redirectNotAuth();
    })
  }).catch(e => {
    let loginLink = `<li class="nav-item"><a class="nav-link" id="login-link" href="/pages/unauth/auth/login.php">Login</a></li>`;
    $('.navbar-nav').append($(loginLink));
  })
}