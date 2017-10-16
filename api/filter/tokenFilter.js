var cookieUtil = require('../util/cookieUtil');

function urlMatch(url, rules) {
    var result = false,
        rule;
    rules = rules ? rules : [];
    for(var i = 0; i < rules.length; i++) {
        rule = rules[i];
        if(new RegExp('^' + rules[i] + '$', 'm').test(url)) {
            result = true;
            break;
        }
    }
    return result;
}

module.exports = function(req, res, next) {
    var rules = [
        "/login",
        "/auth/captcha"
    ];

    var path = req.url;
    var isMatch = urlMatch(path, rules);
    if(isMatch) {
        next();
    } else {
        if(cookieUtil.verifyToken(req)) {
            next();
        } else {
            var err = new Error('Not Authenticated');
            err.status = 403;
            next(err);
        }
    }
}
