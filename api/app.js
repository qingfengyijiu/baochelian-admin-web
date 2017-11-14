var express = require('express');
var tokenFilter = require('./filter/tokenFilter');

var app = express();
app.use(tokenFilter);
app.use('/login', require('./router/login'));
app.use('/brand',  require('./router/brand'));
app.use('/classification', require('./router/classification'));
app.use('/specificationCategory', require('./router/specificationCategory'));
app.use('/specification', require('./router/specification'));
app.use('/spu', require('./router/spu'));
app.use('/sku', require('./router/sku'));
app.use('/upload', require('./router/file'));
app.use('/serviceCategory', require('./router/serviceCategory'));
app.use('/service', require('./router/service'));
app.use('/coupon', require('./router/coupon'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error json
    console.log(err);
    res.status(status);
    res.send(err.message);
});

module.exports = app;
