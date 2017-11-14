export function validate(field) {
    return function(value, model) {
      var error = null;
      switch (field){
        case "name":
          if (value!=null) {
            if((value.toString().length) >= 12){
              error = "请输入少于12位的字符串";
            }
          }
          break;
        case "key":
          if (value == null || value.length == 0) {
            error = '请输入计费点编号';
          }
          break;
        case "price":
          if (value == null || value.length == 0) {
            error = '请输入计费点金额';
          }
          break;
        case'isDefaultDialog':
          if (value == null || value.length == 0) {
            error = '请输入UPAY支付界面状态';
          }
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
