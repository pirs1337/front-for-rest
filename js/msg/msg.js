function showSuccessMsg(msg, element){
    $('.alert-danger').remove();
    let alert = `<div class="alert alert-success" role="alert">${msg}</div>`;
    $(element).prepend(alert);
    hideMsg('.alert-success');
}

function errorMsg(msg, element){
    $('.alert-danger').remove();
    let alert = `<div class="alert alert-danger" role="alert">${msg}</div>`;
    $(element).prepend(alert);
}

function hideMsg(element){
    setTimeout(function(){ 
        $(element).hide('slow'); 
    }, 2000);
}

export {showSuccessMsg, errorMsg}