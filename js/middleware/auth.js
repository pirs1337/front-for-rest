import {redirectAuth} from '../redirect/redirect.js';
import { getAuthUser } from '../user/user.js';
import token from '../main.js';

function auth(url,urls, currentUrl){

    if (token) {
        let user = getAuthUser(url, token);
        user.then(res => {
            if (currentUrl == urls[1] || currentUrl == urls[2]) {
                return redirectAuth(res);
            }
        })
    }
}

export {auth}