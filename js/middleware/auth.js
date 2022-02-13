import { redirect } from '../redirect/redirect.js';
import { getAuthUser } from '../user/user.js';

function auth(url,urls, currentUrl){

    let user = getAuthUser(url, localStorage.getItem('token'));
    user.then(res => {
        if (currentUrl == urls[1] || currentUrl == urls[2]) {
            return redirect(urls[0]);
        }
    })
}

export {auth}