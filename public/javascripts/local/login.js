/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(675);


/***/ },

/***/ 675:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by liuyuan on 2016/12/14.
	 */

	function _alertError(info) {
	    document.getElementById("error").innerHTML = info;
	}

	window.reloadCaptcha = function () {
	    var captchaImage = document.getElementById("captchaReloadButton");
	    captchaImage.src = "/captcha?ts=" + new Date().getTime();
	};

	window.login = function () {
	    var name = document.getElementById("name").value,
	        password = document.getElementById("password").value,
	        captchaView = document.getElementById("captcha"),
	        captcha = captchaView.value;
	    if (name == null || name == '') {
	        _alertError('请输入用户名! ');
	        return;
	    }
	    if (password == null || password == '') {
	        _alertError('请输入密码！');
	        return;
	    }
	    if (captcha == null || captcha === '') {
	        _alertError('请输入验证码');
	        return;
	    } else if (captcha.length < 5) {
	        _alertError('请输入完整的验证码');
	        return;
	    }
	    var xhr;
	    if (window.XMLHttpRequest) {
	        xhr = new XMLHttpRequest();
	    } else {
	        xhr = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xhr.onreadystatechange = function () {
	        _alertError("");
	        if (this.readyState == 4 && this.status == 200) {
	            var rsp = JSON.parse(this.responseText);
	            switch (rsp.code) {
	                case 0:
	                    window.location.href = '/';
	                    break;
	                case 100001:
	                    _alertError(rsp.msg);
	                    captchaView.value = "";
	                    window.reloadCaptcha();
	                    captchaView.focus();
	                    break;
	                default:
	                    _alertError(rsp.msg);
	                    window.reloadCaptcha();
	            }
	        }
	    };
	    xhr.open("POST", "/api/login", true);
	    xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.send(JSON.stringify({
	        name: name,
	        password: password,
	        captcha: captcha
	    }));
	};

	if (document.addEventListener) {
	    document.addEventListener('keydown', function (event) {
	        var key = event.which || event.keyCode;
	        if (key == 13) {
	            window.login();
	        }
	    });
	}

/***/ }

/******/ });