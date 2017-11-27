var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 获取品牌列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/op/classifications',
        token: getToken(req),
        data: req.query
    }).then(function(response) {
        res.send(response);
    })
});

router.post('/', function(req, res) {
    ws.post({
        url: '/op/classifications',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    })
});

router.post('/:id', function(req, res) {
    ws.post({
        url: '/op/classifications/' + req.params.id,
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    })
});

router.get("/list/simple", function(req,res) {
	ws.get({
		url: '/op/classifications/simple?level=1',
		token: getToken(req)
	}).then(function(response) {
		res.send(response);
	})
});

router.get("/simple", function(req,res) {
	ws.get({
		url: '/op/classifications/simple',
		token: getToken(req)
	}).then(function(response) {
		res.send(response);
	})
});

router.get("/:id", function(req,res) {
    ws.get({
        url: '/op/classifications/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        res.send(response);
    })
});

router.delete("/:id", function(req, res) {
    ws.delete({
        url: '/op/classifications/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        res.send(response);
    })
})

module.exports = router;
