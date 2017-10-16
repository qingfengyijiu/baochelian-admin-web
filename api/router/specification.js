var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 获取规格列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/op/specifications',
        token: getToken(req),
        data: req.query
    }).then(function(response) {
        res.send(response);
    })
});

router.post('/', function(req, res) {
    ws.post({
        url: '/op/specifications',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    })
});

router.post('/:id', function(req, res) {
    ws.post({
        url: '/op/specifications/' + req.params.id,
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    })
});

router.get("/:id", function(req,res) {
    ws.get({
        url: '/op/specifications/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        res.send(response);
    })
})

router.delete("/:id", function(req, res) {
    ws.delete({
        url: '/op/specifications/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        res.send(response);
    })
})

module.exports = router;
