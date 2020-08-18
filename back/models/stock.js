'use strict';

import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';
var Schema = mongoose.Schema;

export default mongoose.model('STOCK', Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    visible: {type:Boolean, default:true},
    price: {type:Decimal128, default:true},
    qty: {type:Number, default:true},
    family:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
    item :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ITEM'
    }
}))