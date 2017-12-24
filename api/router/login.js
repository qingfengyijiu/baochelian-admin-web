var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');
var validateCaptcha = require("../util/captchaUtil").validate;

router.post('/', function(req, res) {
    var data = req.body;
    var captchaEncrypted = req.cookies["captcha"];
    var captcha = req.body.captcha;
    var isCaptchaValid = validateCaptcha(captcha, captchaEncrypted);
    if(!isCaptchaValid) {
        res.send({
            code: 100001,
            message: "验证码不正确"
        });
    } else {
        ws.post({
            url: '/op/auth/credentials',
            data: data
        }).then(function(response) {
            if(response.code == 0) {
                cookieUtil.setToken(res, response.data);
            }
            delete response.data.token;
            res.status(200).send(response);
        });
    }

});

router.post('/logout', function(req, res) {
    cookieUtil.clearToken(res);
    res.send({
        code: 0,
        message: '登出成功'
    });
});

module.exports = router;
