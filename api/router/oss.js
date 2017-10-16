var express = require('express');
var router = express.Router();
var oss = require('ali-oss').Wrapper;
var path = require('path');
var fs = require('fs');
var uuidV1 = require('uuid/v1');
var logger = require('../../logger')();

var store = oss({
    accessKeyId: 'GRQCHaq3ePbhuy7h',
    accessKeySecret: 'jTdQy6NzwIReaYAMDVCgfTtYFpWoR7',
    bucket: 'wapstie-image',
    region: 'oss-cn-beijing',
    endpoint: 'oss-cn-beijing.aliyuncs.com'
});

function generateOssFileName(fileName) {
    fileName = fileName ? fileName : '';
    return uuidV1().replace(/-/g, '') + '__upay360__' + fileName;
}

router.put('/', function(req, res) {
    var file = req.files.file;
    var fileName = file.name;
    var filePath = path.join(__dirname + '/../../tmp/' + fileName);
    file.mv(filePath, function(err) {
        if(err) {
            res.status(500);
            res.send(err);
        } else {
            fs.createReadStream(filePath);
            var ossFileName = generateOssFileName(fileName);
            logger.info('oss开始上传:' + fileName);
            store.put(ossFileName, filePath).then(function(response) {
                logger.info(fileName + '上传成功：');
                fs.unlink(filePath, function() {});
                res.json({
                    code: 0,
                    msg: '上传成功',
                    data: response
                });
            }).catch(function(err) {
                logger.error(fileName + '上传失败:' + JSON.stringify(err));
                fs.unlink(filePath, function() {});
                res.status(500);
                res.send(err);
            });
        }
    })
});

router.get('/list', function(req, res) {
    logger.info('init oss');
    var store = oss({
        accessKeyId: 'GRQCHaq3ePbhuy7h',
        accessKeySecret: 'jTdQy6NzwIReaYAMDVCgfTtYFpWoR7',
        bucket: 'wapstie-image',
        region: 'oss-cn-beijing',
        endpoint: 'oss-cn-beijing.aliyuncs.com'
    });
    logger.info('开始查询');
    store.list().then(function(response) {
        logger.info('查询结果：' + JSON.stringify(response));
        res.send('111');
    }).catch(function(err) {
        logger.error(err);
        res.send('err');
    });
});

module.exports = router;
