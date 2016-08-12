/**
 * Created by mjaiswal on 11/08/16.
 */

var fs = require('fs');


var DataService = module.exports = {
    _dataFolder: "./data",
    _getDir: function(key){
        var dir = this._dataFolder + key;
        return dir;
    },
    get: function(uri, callback){
        var dir = this._getDir(uri);
        var bodyFile = dir+"/json";

        fs.readFile(bodyFile, 'utf8', function(err, contents) {
            if(err){
                callback(null);
            }else{
                var dataObj = JSON.parse(contents);
                callback({
                    "headers": {
                    },
                    "body": dataObj.body

                });
            }
        });
    },
    /*
     * params ==> key, headers, body, callback
     */
    put: function(params){
        var that = this,
            uri = params.uri,
            body = params.body;
        var dir = this._getDir(uri);
        fs.mkdir(dir, function(){
            var bodyFile = dir+"/json";

            var dataObj = {body: body};

            fs.writeFile(bodyFile, JSON.stringify(dataObj), {flag: "w"}, function(err){
                that.get(uri, function(rs){
                    params.callback(rs);
                });

            })
        });
    }
}