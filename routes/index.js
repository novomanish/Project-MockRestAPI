var express = require('express');
var ds = require('../lib/DataSource');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express5' });
});

function handleResponse(resource, res){
    if(resource.headers){
        res.set(resource.headers);
    }
    res.send(resource.body);
}
router.get('/*', function(req, res, next) {
    ds.get(req.url, function(resource){
        handleResponse(resource, res);
    });
});

router.put('/*', function(req, res, next) {
    var resource = ds.put({
        "key": req.url,
        "body": JSON.stringify(req.body),
        "callback": function(resource){
            handleResponse(resource, res);
        }
    });
});

module.exports = router;
