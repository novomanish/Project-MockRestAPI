var express = require('express');
var ds = require('../lib/DataSource');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express5' });
});

router.post('/', function(req, res, next) {
    var resource = ds.put({
        "uri": req.body.uri,
        "body": req.body.body,
        "callback": function(resource){
            sendResourceResponse(resource, res);
        }
    });
});

router.get('/*', function(req, res, next) {
    ds.get(req.url, function(resource){
        if(resource === null){
            res.status(404);
            next();
        }else{
            sendResourceResponse(resource, res);
        }
    });
});

function sendResourceResponse(resource, res){
    // Default Header as application/json
//    res.set({"Content-Type":"text/html"});

    if(resource.headers){
        res.set(resource.headers);
    }
    res.json(resource.body);
}

module.exports = router;
