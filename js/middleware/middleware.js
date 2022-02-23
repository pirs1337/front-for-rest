import {redirectAuth, redirectNotAuth} from '../redirect/redirect.js';
import { getAuthUser } from '../user/user.js';
import token from '../main.js';
import {url} from '../router/router.js';

async function auth(){
    if (!token || !await getAuthUser(url,token)) {
        redirectNotAuth();
    }
}

async function guest(){
    if (token) {
        try {
            let user = await getAuthUser(url, token);
            return redirectAuth(user);   
        } catch (error) {}
    }
}

export {auth, guest}