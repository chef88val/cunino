'use strict';

import mongoose from 'mongoose';
import { Decimal128, Timestamp } from 'mongodb';
var Schema = mongoose.Schema;

export default mongoose.model('CASHFLOW', Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    visible: {type:Boolean, default:true},
    value: {type:Decimal128, default:true},
    datevalue: {type:Date, default: Date.now()},
    timevalue: {type:Date, default: Date.now()},
    CreatedBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
    CreatedDate: {type:Date, default: Date.now()}
}))
