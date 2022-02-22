import { showErrors} from "../error/error.js";
import { urls , currentUrl} from "../router/router.js";
import { getAuthUser, getUserById } from "../user/user.js";
import { showSuccessMsg} from "../msg/msg.js";
import token from "../main.js";

function getPosts(url){
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
    $('.row').html('');

    let authUser = null;
    if (token) {
        authUser = getAuthUser(url, token);
    } else {
        authUser = false;
    }
    

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

        editAndDeleteBtns(authUser, element, i, url);
    });

}

function editAndDeleteBtns(authUser, element, i, url){
    if (urls[4] == currentUrl) {
        if (authUser) {
            authUser.then(res => {
                if (res.data.id == element.user_id) {
                    let buttons = 
                        `<div class="d-flex">
                            <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#exampleModalEdit${element.id}">Edit</button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModalDelete${element.id}">Delete</button>
                        </div>`;
                        
                    $('.card-body').eq(i).append(buttons);

                    let formEdit = $(
                        `<form id="edit-post">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" value=${element.title} class="form-control" name="title" id="title">
                            </div>
                            <div class="mb-3">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" name="text" id="text" style="height: 100px">${element.text}</textarea>
                                    <label for="text">Text</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="mb-2"><img class="img-fluid" src=${element.img}></div>
                                <label for="img" class="form-label">Upload image</label>
                                <input class="form-control" name="img" type="file" id="img">
                            </div>
                            <input type="hidden" name="post_id" id="post_id" value=${element.id}>
                            <button type="submit" class="btn btn-success">Save</button>
                        </form>`);

                    let formDelete = $(
                        `<p>Do you really want to delete the  <b>${element.title}</b> post?</p>
                        <form id="delete-post">
                            <input type="hidden" name="post_id" id="post_id" value=${element.id}>
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>`)
        
                    modal(element.id, i, 'Edit', formEdit, url, editPost);
                    modal(element.id, i, 'Delete', formDelete, url, deletePost);  
                }
            }).catch(e => {
                console.log(e);
            })
        }
    }
}

function editPost(i, url) {
    $('form#edit-post').eq(i).submit(function (e){
        e.preventDefault();
        
        let form = $(this)[0];
        let formData = new FormData(form);
        formData.append('_method', 'PUT');

        $.ajax({
            url: `${url}posts/${formData.get('post_id')}`,
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+token,
            }, 
            processData: false,
            contentType: false,
            data: formData,
            dataType: 'json',
            success: function(data){
                $('form#edit-post .img-fluid').attr('src', data.data.img);
                showSuccessMsg(data.msg, form);

                $('#exampleModalEdit'+data.data.id).on('hidden.bs.modal', function () {
                    getUserPosts(url, data.data.user_id);
                })
            },
            error: function(jqXHR){
                let errorResponse = jqXHR.responseJSON.error
                showErrors(errorResponse);
            }
        });
    })
}


function modal(id, i, title, body, url, form){
   
    let modal = 
        `<div class="modal fade" id="exampleModal${title+id}" tabindex="-1" aria-labelledby="exampleModal${title}Label${id}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModal${title}Label${id}">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body"></div>
            </div>
          </div>
        </div>`

    $('.card-body').eq(i).append(modal);
    $(`#exampleModal${title+id} .modal-body`).append(body);

    form(i, url);
}


function createPost(url) {
    $('#create-post').submit(function (e){
        e.preventDefault();
        let form = $(this)[0];
        let formData = new FormData(form);

        $.ajax({
            url: `${url}posts`,
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+token,
            }, 
            processData: false,
            contentType: false,
            data: formData,
            dataType: 'json',
            success: function(data){
                form.reset();
                showSuccessMsg('Post was created', form); 
            },
            error: function(jqXHR){
                let errorResponse = jqXHR.responseJSON.error
                showErrors(errorResponse);
            }
        });
    })
}

function deletePost(i, url){
    console.log(i);
    $('form#delete-post').eq(i).submit(function (e){
        e.preventDefault();
        let form = $(this)[0];
        let formData = new FormData(form);

        $.ajax({
            url: `${url}posts/${formData.get('post_id')}`,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer '+token,
            },
            dataType: 'json',
            success: function(data){
                location.reload();
            },
            error: function(jqXHR){
                // let errorResponse = jqXHR.responseJSON.error
                // showErrors(errorResponse);
                console.log(jqXHR);
            }
        });
        
    })
}

export {getPosts, getUserPosts, createPost}