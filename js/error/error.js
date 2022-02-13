function showErrors(errors){
    $('.alert-danger').remove();

    if ('errors' in errors) {
      eachError(errors.errors)
    } else {
      eachError(errors)
    }
}

function eachError(errors){
  for (const key in errors) {
    let alert = `<div class="alert alert-danger">${errors[key]}</div>`;
    $(`#${key}`).after(alert);
  }
}

export {showErrors, eachError}