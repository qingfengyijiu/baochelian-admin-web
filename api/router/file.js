var express = require('express');
var router = express.Router();
var getToken = require('../util/cookieUtil').getToken;
var request = require('request');
var config = require('../config');
var path = require('path');
var fs = require('fs');

router.put('/', function(req, res) {
    var businessType = req.query.businessType;
    var file = req.files.file;
    var filePath = path.join(__dirname + '/../../tmp/' + file.name);
    var env = process.env.NODE_ENV || 'dev';
    var cfg = config[env];
    file.mv(filePath, function(err) {
        if(err) {
            res.status(500);
            res.send(err);
        } else {
            request.post({
                url: 'http://' + cfg.domain + '/upload/image',
                headers: {
                    'x-auth-token': getToken(req)
                },
                formData: {
	                type: businessType,
                    images: [fs.createReadStream(filePath)]
                },
            }, function(err, httpResponse, body) {
                fs.unlink(filePath);
                if(err) {
                    res.status(500);
                    res.send(err);
                } else {
                    try {
	                    res.json(JSON.parse(body));
                    } catch (error) {
	                    res.json(body);
                    }
                }
            })
        }
    })
});

module.exports = router;
