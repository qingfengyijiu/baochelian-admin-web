var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 代码资费配置列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/appCmdRelation',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

/**
 * 根据id查询单条代码资费
 */

router.get('/:id', function(req, res) {
    ws.get({
        url: '/appCmdRelation/' + req.params.id,
        token: getToken(req),
        qs:req.query
    }).then(function(response) {
        res.send(response);
        // ws.handleResponse(response, res);
    })
});

/**
 * 修改计费点资费
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/appCmdRelation/' + req.params.id,
        data: req.body,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 代码资费新增
 */
router.post('/', function(req, res) {
    ws.post({
        url: '/appCmdRelation',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * 删除cp代码资费配置
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/appCmdRelation/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});
module.exports = router;
