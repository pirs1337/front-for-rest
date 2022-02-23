function showErrors(errors, form){
    $('.alert-danger').remove();

    if ('errors' in errors) {
      eachError(errors.errors, form)
    } else {
      eachError(errors, form)
    }
}

function eachError(errors, form){
  for (const key in errors) {
    let alert = `<div class="alert alert-danger">${errors[key]}</div>`;
    $(`form#${form.id} #${key}`).after(alert);
  }
}

export {showErrors, eachError}