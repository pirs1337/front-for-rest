import { getPosts } from '../post/post.js';
import { register, login } from '../auth/auth.js';
import { home } from '../auth/home.js';
import { auth } from '../middleware/auth.js';
import { redirectNotFound } from '../redirect/redirect.js';

const currentUrl = document.location.pathname+document.location.search;

function getUrlParams(){
  const QueryString = window.location.search; 
  const urlParams = new URLSearchParams(QueryString); 

  return urlParams;
}

let homePage = `/pages/auth/home.php`;

const urls = ['/', '/pages/unauth/auth/register.php', '/pages/unauth/auth/login.php', homePage, homePage+'?'+getUrlParams()];

const url = 'http://127.0.0.1:8000/api/';

console.log(currentUrl);

function router() {
    switch (currentUrl) {
        case urls[0]:
            getPosts(url);
          break;
        case urls[1]:
          register(url, urls);
          auth(url, urls, currentUrl)
          break;
        case urls[2]:
            login(url, urls, currentUrl);
            auth(url, urls, currentUrl)
          break;
        case urls[3]:
            redirectNotFound();
          break;
          case urls[4]:
            home(url)
          break;
        default:
        // redirectNotFound();
    }
}

export {router, url, urls, currentUrl}