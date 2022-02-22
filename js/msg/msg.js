function showSuccessMsg(msg, element){
    let alert = `<div class="alert alert-success" role="alert">${msg}</div>`
    $(element).prepend(alert);
    hideMsg('.alert-success');
}

function hideMsg(element){
    setTimeout(function(){ 
        $(element).hide('slow'); 
    }, 2000);
}

export {showSuccessMsg}