async function getUserById(url, user_id){
    let user = await $.get(url+`user/${user_id}`, function(data){
         return data;
     });

    return user;
}

async function getAuthUser(url, token){
    let user = await $.ajax({
        url: url+`auth/user`,         
        method: 'GET',
        headers: {
            Authorization: 'Bearer '+token
        },                           
        success: function(data){   
            return data;           
        },
    });

    return user;
}

export {getUserById, getAuthUser}



