import { createPost, getPosts } from '../post/post.js';
import { register, login } from '../auth/auth.js';
import { home } from '../auth/home.js';
import { auth , guest } from '../middleware/middleware.js';
import { redirectNotFound } from '../redirect/redirect.js';

const currentUrl = document.location.pathname+document.location.search;

function getUrlParams(){
  const QueryString = window.location.search; 
  const urlParams = new URLSearchParams(QueryString); 

  return urlParams;
}

// let homePage = `/pages/auth/home.php`;

const urls = {
  'auth': {
    'createPost' :'/pages/auth/post/create.php'
  },
  'guest': {
   'register':'/pages/unauth/auth/register.php',
    'login': '/pages/unauth/auth/login.php'
  },
  'public': {
    'main': '/',
    'home': '/pages/auth/home.php',
    'homeParams': '/pages/auth/home.php'+'?'+getUrlParams()
  }
};


// '/', '/pages/unauth/auth/register.php', '/pages/unauth/auth/login.php', homePage, homePage+'?'+getUrlParams(), '/pages/auth/post/create.php'

const url = 'http://127.0.0.1:8000/api/';

function router() {
    switch (currentUrl) {
        case urls.public.main:
            getPosts(url);
          break;
        case urls.guest.register:
          register(url, urls);
          guest();
          break;
        case urls.guest.login:
            login(url, urls, currentUrl);
            guest();
          break;
        case urls.public.home:
            redirectNotFound();
          break;
          case urls.public.homeParams:
            home(url)
          break;
          case urls.auth.createPost:
            createPost(url);
            auth();
          break;
    }
}

export {router, url, urls, currentUrl}