var express = require('express');
var sysinfo = require('systeminformation');
var router = express.Router();

router.get('/', function(req, res, next) {
    sysinfo.getStaticData()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

router.get('/cpu',function (req, res, next) {
    sysinfo.cpu()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

router.get('/processes',function (req, res, next) {
    sysinfo.processes()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

router.get('/currentLoad',function (req, res, next) {
    sysinfo.currentLoad()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

router.get('/osInfo',function (req, res, next) {
    sysinfo.osInfo()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

router.get('/networkConnections',function (req, res, next) {
    sysinfo.networkConnections()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

router.get('/networkStats',function (req, res, next) {
    sysinfo.networkStats()
        .then(data => res.send(data))
        .catch(data => res.send(data));
});

module.exports = router;
