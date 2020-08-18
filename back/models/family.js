'use strict';

import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';
var Schema = mongoose.Schema;

export default mongoose.model('FAMILY', Schema({
    name: { type : String , unique : true, required : true, dropDups: true }
}))


//module.exports = mongoose.model('ITEM', itemSchema)