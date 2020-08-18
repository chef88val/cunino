'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export default mongoose.model('USER',Schema({
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
    visible: {type:Boolean, default:true},
    password: { type: String, select: false }
}))