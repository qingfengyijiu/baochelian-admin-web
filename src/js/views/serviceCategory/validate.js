export function validate(field) {
    return function(value, model) {
      var error = null;
      switch (field){
        default:
          break;
      }
      return error;
    }
}

export function validateAll(model, validate) {
    let errors = {};
    for(let field in model) {
        let value = model[field];
        errors[field] = validate(field)(value, model);
    }
    return errors;
}
