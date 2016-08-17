var express = require('express'),
    url = require("url"),
    ds = require('../lib/DataSource');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express5' });
});

router.post('/', function(req, res, next) {
    var parsedURI = url.parse(req.body.uri);
    var uri = parsedURI.pathname;
    var resource = ds.put({
        "uri": uri,
        "body": req.body.body,
        "callback": function(resource){
            sendResourceResponse(resource, res);
        }
    });
});

router.get('/*', function(req, res, next) {
    var apiURI = "/" + req.params[0];

    ds.get(apiURI, function(resource){
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
    res.set("Content-Type", "application/json");

    if(resource.headers){
        res.set(resource.headers);
    }
    res.send(resource.body);
}

module.exports = router;
