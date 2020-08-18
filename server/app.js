'use strict';

var dataAdmin= require('./dataAdmin')
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes/api')
var fs = require('fs');
var utils = require('./utils')
var moment = require('moment')
var controllerPedido = require('./controllers/pedido');
var controllerUser = require('./controllers/user');
var _ = require('lodash')
var senderEmails = require('./sendemails')

module.exports =  app;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', routes)

global.fnError = function () {

    return {
        message: "No se ha podido identificar el usuario"
    }
}
global.fnPagination = (page) => {

    if (page) {
        page--;
    }
    var itemsPage = 50;
    return itemsPage * page
}
//console.log(this.cryptPassword('everis'))
var nodeoutlook = require('nodejs-nodemailer-outlook')
var caller;


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
console.log('SEND_EMAIL',typeof process.env.SEND_EMAIL + typeof utils.numberToBoolean(process.env.SEND_EMAIL) + utils.stringToBoolean(process.env.SEND_EMAIL) + typeof process.env.SEND_EMAIL)

const emaails= [
    {
        name:'Admin',
        email: 'jsm.multimedia@gmail.com'
    },
    {
        name:'cowapps',
        email: 'jsm88.live@gmail.com'
    },
    {
        name:'Javier Segarra Martinez',
        email: 'jsegarrm@everis.com'
    },
    
]
console.log('process.env.USER_PARSER',process.env.USER_PARSER,utils.numberToBoolean(process.env.USER_PARSER))
if(utils.numberToBoolean(process.env.USER_PARSER)){
    var emailsParser = require('./emails')
    emailsParser.formatContacts()
}
if(utils.numberToBoolean(process.env.BOCATAS_PARSER)){
    var bocatasParser = require('./items')
    bocatasParser.formatBocatas()
}
/*emaails.forEach(element => {
    if(controllerUser.saveUser(element)!=null) console.log(element.name)
});*/

var listUsers = [];
var listUsersToNotify = [];
utils.makeMigration('user');

function randomUser() {

    //console.log(listUsers)
    let numberRandom = Math.floor(Math.random() * (listUsers.length))

    console.log('2' + 'numberRandom' + numberRandom)
    console.log('3' + 'listUsers[numberRandom]' + listUsers[numberRandom])
}
setTimeout(() => {

    //randomUser();
    if (utils.stringToBoolean(process.env.SEND_EMAIL)) {

        console.log('111' + process.env.NODE_ENV, typeof process.env.SEND_EMAIL)
        senderEmails.sendEmail()

    }
}, 2000);
var currentPedido;

function initPedidoDay(profile) {
    let querylistUsers = controllerUser.getUsers(profile);
    querylistUsers.exec((err, users) => {
        if (users) {
            //listUsersToNotify = users;
            console.log('-' + users.length)
            users.forEach((user) => {
                if (!(listUsersToNotify.includes(user.email))) listUsersToNotify.push(user.email)
                if ((isNaN(user.lastCall) || user.lastCall != null) &&
                 !(moment(user.lastCall).isBetween(moment().subtract(listUsersToNotify.length || 7, 'days'), moment().format()))) {
                    listUsers.push(user)
                }
            })
        }
        console.log('listUsers' + listUsers.length)
        console.log('listUsersToNotify' + listUsersToNotify.length)


        let numberRandom = Math.floor(Math.random() * (listUsers.length))
        caller = listUsers[numberRandom]
        console.log(numberRandom, caller)
        console.log('-' + listUsersToNotify.length)
        console.log(utils.numberToBoolean(process.env.SAVE_PEDIDO),'process.env.SAVE_PEDID',process.env.SAVE_PEDIDO)
        if (utils.numberToBoolean(process.env.SAVE_PEDIDO))
            currentPedido = controllerPedido.savePedido(caller)
        /*.exec((err, pedido)=>{
            controllerUser.updateCallerUser(caller).exec((err, ok)=>{
                console.log(err, ok)
            });
        });*/
    });
}


setTimeout(() => {
    console.log(dataAdmin)
    dataAdmin.profilesAPI.forEach((profile) => {
        console.log('profileAPI', profile)
        initPedidoDay(profile)
    })


}, 1000);/*
var CronJob = require('cron').CronJob;
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
new CronJob('00 10 * * 0-5', function () {
    // Código a ejecutar

    initPedidoDay()
    //let idPedido = controllerPedido.savePedido();
}, function () {

    //let listUsers = controllerUser.getUsers();
    //let numberRandom = Math.random(1 + listUsers.length)
    // Código a ejecutar cuando la tarea termina. 
    // Puedes pasar null para que no haga nada
    if (utils.stringToBoolean(process.env.SEND_EMAIL)) {
        var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
        console.log('111' + process.env.NODE_ENV, typeof process.env.SEND_EMAIL)
        sendEmail()

    }
}, true);*/


