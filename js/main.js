import { router, urls, currentUrl, url } from './router/router.js';
import { getAuthUser } from './user/user.js';
import { redirectNotAuth } from './redirect/redirect.js';

const token = localStorage.getItem('token');

function changeHtml() {
  if (token) {
    let user = getAuthUser(url, token);
    user.then(res => {
      $('.nav-item #login-link').remove();
  
      let postLink = `<li class="nav-item"><a class="nav-link" href="${urls[5]}">Add post</a></li>`;
      let homeLink = `<li class="nav-item"><a class="nav-link" href=${urls[3]+`?id=${res.data.id}`}>Home</a></li>`;
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
    })
  } else {
    if (currentUrl == urls[2]) {
      let loginLink = $('#login-link');
      loginLink.attr('href', urls[1]);
      loginLink.text('Register');
    }
  }
}

$(document).ready(function (){
  router();
  changeHtml();
})

export default token;
