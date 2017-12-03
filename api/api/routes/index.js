var express = require('express');
var sysinfo = require('systeminformation');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    sysinfo.osInfo()
        .then(data => res.render('index',{title: data.hostname}))
        .catch(data => res.send(data));
});

module.exports = router;
