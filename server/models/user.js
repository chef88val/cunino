'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    email: { type : String , unique : true, required : true, dropDups: true },
    money: {type:Number, default:0},
    lastCall: Date,
    profile:  {type:String,enum: ['SF'], default:'SF'},
    role: {
        type: String,
        enum: ['user', 'admin', 'caller']
    },
    notify:  {type:Boolean, default:true},
    visible: {type:Boolean, default:true}
})


module.exports = mongoose.model('USER', userSchema)