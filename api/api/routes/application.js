var express = require('express');
var router = express.Router();

router.get('/port', function(req, res, next) {
    res.send(process.env.PORT);
});

module.exports = router;