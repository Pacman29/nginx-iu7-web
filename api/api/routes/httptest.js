var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next) {
    let p = path.join(__dirname, '../public/',req.originalUrl.substr(5));
    res.sendFile(p);
});

module.exports = router;