var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');
var validateCaptcha = require("../util/captchaUtil").validate;

router.post('/', function(req, res) {
    var data = req.body;
    data.loginType = 2;
    data.role = 2;
    var captchaEncrypted = req.cookies["captcha"];
    var captcha = req.body.captcha;
    var isCaptchaValid = validateCaptcha(captcha, captchaEncrypted);
    if(!isCaptchaValid) {
        res.send({
            code: 100001,
            msg: "验证码不正确"
        });
    } else {
        ws.post({
            url: '/auth/credentials',
            data: data
        }).then(function(response) {
            if(response.code == 0) {
                cookieUtil.setToken(res, response.data);
            }
            delete response.data.token;
            console.log(response);
            res.status(200).send(response);
        });
    }

});

router.post('/logout', function(req, res) {
    cookieUtil.clearToken(res);
    res.send({
        code: 0,
        msg: '登出成功'
    });
});

module.exports = router;
