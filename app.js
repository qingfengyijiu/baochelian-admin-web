var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var log4js = require('log4js');
var getTokenInfo = require('./api/util/cookieUtil').getTokenInfo;
var generateCaptcha = require('./api/util/captchaUtil').generate;

var app = express();
var api = require('./api/app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(log4js.connectLogger(require('./logger')(), {level: 'auto'}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/captcha', function(req, res) {
    generateCaptcha().then(function(result) {
        res.cookie("captcha", result.encryptedCode);
        res.status(200).send(result.buffer);
    }).catch(function(error) {
        res.status(500);
        res.send("生成图片验证码失败");
    })
});

app.get('*', function(req, res) {
    var tokenInfo = getTokenInfo(req);
    if(tokenInfo) {
        res.render('index', {
            title: '保车连后台管理系统',
            userName: tokenInfo.name,
            loginType: tokenInfo.loginType,
            roleId: tokenInfo.role && tokenInfo.role.key != null ? tokenInfo.role.key : '',
            roleName: tokenInfo.role && tokenInfo.role.value != null ? tokenInfo.role.value : '',
        });
    } else {
        res.redirect('/login');
    }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;