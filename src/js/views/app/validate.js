export function validate(field) {
    return function(value, model) {
      var error = null;
      switch(field){
        case 'callbackUrl':
        if (value == null || value.length == 0) {
          error = '请输入回调地址';
        }
        default:
        break;
      }
      return error;
    }
}

export function validateAll(model) {
    let errors = {};
    for(let field in model) {
        let value = model[field];
        errors[field] = validate(field)(value, model);
    }
    return errors;
}

export function isValid(errors) {
    let isValid = true;
    for(let p in errors) {
        let value = errors[p];
        if(value && value.length > 0) {
            isValid = false;
            break;
        }
    }
    return isValid;
}
