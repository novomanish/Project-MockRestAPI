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
    get: function(key, callback){
        var dir = this._getDir(key);
        var bodyFile = dir+"/body";

        fs.readFile(bodyFile, 'utf8', function(err, contents) {
            callback({
                "headers": {
                    "Content-Type": "text/json"
                },
                "body": contents

            });
            console.log(contents);
        });
    },
    /*
     * params ==> key, headers, body, callback
     */
    put: function(params){
        var that = this;
        var dir = this._getDir(params.key);
        fs.mkdir(dir, function(){
            var bodyFile = dir+"/body";
            fs.writeFile(bodyFile, params.body, {flag: "w"}, function(err){
                var rs = that.get(params.key, function(rs){
                    params.callback(rs);
                });

            })
        });
    }
}