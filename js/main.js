import { router, urls, currentUrl, url } from './router/router.js';
import { getAuthUser } from './user/user.js';
import { redirectNotAuth } from './redirect/redirect.js';

const token = localStorage.getItem('token');

async function changeHtml() {
  if (token) {
    try {
      let user = await getAuthUser(url, token);
        $('.nav-item #login-link').remove();
        let postLink = `<li class="nav-item"><a class="nav-link" href="${urls.auth.createPost}">Create post</a></li>`;
        let homeLink = `<li class="nav-item"><a class="nav-link" href=${urls.public.home+`?id=${user.data.id}`}>Home</a></li>`;
        let logoutLink = `<li class="nav-item"><button class="btn btn-danger" id="logout-btn">Logout</button></li>`;
    
        let links = [postLink, homeLink, logoutLink];
    
        links.forEach(element => {
          $('.navbar-nav').append($(element));
        });
    
        //logout user
        $('#logout-btn').click(function (){
          localStorage.removeItem('token');
          return redirectNotAuth();
        })
    } catch (error) {
      console.log(error);
    }
  } else {
    if (currentUrl == urls.guest.login) {
      let loginLink = $('#login-link');
      loginLink.attr('href', urls.guest.register);
      loginLink.text('Register');
    }
  }
}

$(document).ready(function (){
  router();
  changeHtml();
})



export default token;
