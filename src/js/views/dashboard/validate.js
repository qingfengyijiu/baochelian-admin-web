export function validate(field) {
    return function(value, model) {
        var error = null;
        var mobileReg = /(^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$)|(^(\d{3,4}-\d{8})$)/;
        var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        switch (field) {
            case 'name':
                if(value == null || value.length == 0){
                  error = '请输入SP简称';
                };
                break;
            case 'fullName':
                if(value == null || value.length == 0){
                  error = '请输入SP公司全称';
                };
                break;
            case 'upayCompany':
                if(value == null || value.length == 0){
                  error = '请选择所属公司';
                };
                break;
            case 'mobile':
                if( !mobileReg.test(value) && value != null){
                  error = '请输入正确的手机号码或电话号码';
                };
                break;
            case 'email':
                if( !emailReg.test(value) && value != null){
                  error = '请输入正确的邮箱';
                };
                break;
            default:
                // do nothing
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
