async function getUserById(url, user_id){
    let user = await $.get(url+`user/${user_id}`, function(data){
         return data;
     });
 
     return user;
}

export {getUserById}