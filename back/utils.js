import moment from 'moment';

import db from 'mongoose';
import os from 'os';
function stringToBoolean(val) {
    console.log(isNaN(val) + typeof val)
    try {
        if (isNaN(val))
            return val == 'true';
         
    } catch (error) {}
}

function numberToBoolean(val) {
    console.log(isNaN(val) + typeof val)
    try {

            return parseInt(val) == 1;
    } catch (error) {}
}


function valueToBoolean(val) {
    console.log(isNaN(val) + typeof val)
    try {
        if (isNaN(val))
            return val == 'true';
        else
            return parseInt(val) == 1;
    } catch (error) {}
}


function returnMomentFormat() {
    return moment().format("DD/MM/YYYY");
}

function makeMigration(type) {
    console.log('makeMigration')
    if (type == 'user') {
        let model = require('./models/user'); 
         
        
        model.updateMany({ visible:true}, {$set: {
            profile:'SF', role:'User', notify:true
        }});
        }
}

'use strict';

var ifaces = os.networkInterfaces();
function getIPAddress(){
    var address='';
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      address =  iface.address;
    }
    ++alias;
  });
});
return address;
}

function getUsersPedido(users){
    var res =[];
    users.forEach(element => {
        res.push(element.user.email);
    });
    return res;
}
module.exports = {
    stringToBoolean, numberToBoolean, valueToBoolean,
    returnMomentFormat,
    makeMigration,
    getIPAddress,getUsersPedido
}