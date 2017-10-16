var Captcha = require("trek-captcha");
var bcrypt = require("bcrypt");

function generate() {
    return new Promise(function(resolve, reject) {
        try {
            var result = Captcha();
            var captchaText = result.token;
            var saltRounds = 10;
            var captchaEncrypted = bcrypt.hashSync(captchaText.toLowerCase(), saltRounds);
            result.encryptedCode = captchaEncrypted;
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}


function validate(captcha, encryptCaptcha) {
    captcha = captcha != null ? captcha : "";
    encryptCaptcha = encryptCaptcha != null ? encryptCaptcha : "";
    return bcrypt.compareSync(captcha.toLowerCase(), encryptCaptcha);
}

module.exports = {
    generate,
    validate
}