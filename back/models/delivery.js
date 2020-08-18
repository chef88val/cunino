'use strict';

import mongoose from 'mongoose';
import { Decimal128, Timestamp } from 'mongodb';
var Schema = mongoose.Schema;

export default mongoose.model('DELIVERY',Schema({
    title: { type : String , unique : true, required : true, dropDups: true },
    /*users: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ITEM'
        },
        size: {
            type: String,
            enum: ['p', 'g']
        },
        extras:[{type: String}],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'
        }
        
    }],*/
    items: [{type:mongoose.Schema.Types.ObjectId, ref: 'ITEM'}],
    priceDelivery: {type:Decimal128, default:true},
    qty: {type:Number, default:true}
    /*author: {type:String, default:'system'},
    status: {type:String, default:'draft'},
    caller: {type:mongoose.Schema.Types.ObjectId, ref: 'USER'},
    pubDate: Date,
    visible: {type:Boolean, default:true}*/
}))



