'use strict';

import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';
var Schema = mongoose.Schema;

export default mongoose.model('ITEM', Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    visible: {type:Boolean, default:true},
    price: {type:Decimal128, default:true},
    family:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FAMILY'
    }
}))
