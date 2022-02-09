function getPosts(url, getUserById){
    $.get(url+'posts', function(data){
        postCard(url, data.data, getUserById);
    });
}

function getUserPosts(url, id){
    $.get(`${url}user/posts/${id}`, function(data){
        postCard(url, data.data);
    });

}

function postCard(url, data, getUserById = false){

    $('.row').append('');

    data.forEach(async function(element, i) {
       
        $('.row').append(
            `<div class="col mb-5">
                <div class="card h-100" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <p class="card-text">Опубликовано: <b>${element.created_at}</b></p>
                    </div>
                </div>
            </div>`
        );

        if (element.img) {
            $('div.card').eq(i).prepend(`<img src="${element.img}" class="card-img-top" alt="post img">`);
        }

        if (element.updated_at) {
            $('.card-body').eq(i).append(`<p class="card-text">Редактировано: <b>${element.updated_at}</b></p>`);
        }

        if (getUserById) {
            let user = await getUserById(url, element.user_id);

            let userInfo = `<div class="d-flex">
                    <img src=${user.data.avatar} class="img-fluid w-50 me-2" alt="user avatar">
                    <p class="card-text">Автор: <b>${user.data.login}</b></p>
                </div>`
            $('.card-body').eq(i).append(userInfo);
        }
    });

}

export {getPosts, getUserPosts}