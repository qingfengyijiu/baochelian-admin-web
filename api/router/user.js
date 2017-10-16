"use strict";
var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

router.get('/', function(req, res) {
    ws.get({
        url: '/users/op',
        qs: req.query,
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.get('/:id', function(req, res) {
    ws.get({
        url: '/users/op/' + req.params.id,
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/', function(req, res) {
    ws.post({
        url: '/signUp/op',
        data: req.body,
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/:id', function(req, res) {
    ws.post({
        url: '/users/op',
        data: req.body,
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post("/:id/changeStatus", function(req, res) {
    ws.post({
        url: '/users/op/userStatus',
        token: cookieUtil.getToken(req),
        data: {
            id: req.params.id,
            userStatus: req.body.userStatus
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;