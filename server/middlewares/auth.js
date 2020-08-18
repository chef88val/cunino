'use strict'
 
var fs = require('fs');
exports.ensureAuth = function (req, res, next) {
 
    req.user = true;
    next();

}

exports.ensureAuthAdmin = function (req, res, next) {
 
    //var auth = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
    //if(auth===req)
    req.user = true;
    next();

}