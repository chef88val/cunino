"use strict";

var btoa = require('btoa');

var atob = require('atob');

var fs = require('fs');

function sendEmail(currentPedido) {
  var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

  try {
    console.log(caller, 'try', authEmail);
    nodeoutlook.sendEmail({
      auth: {
        user: authEmail.user,
        pass: authEmail.pass
      },
      from: 'jsegarrm@everis.com',
      to: listUsersToNotify,
      subject: "Pedido del dia ".concat(utils.returnMomentFormat(), "!"),
      html: "Para el dia de hoy ".concat(utils.returnMomentFormat(), ", el encargado de llamar ser\xE1\n            ").concat(caller.name, ", usa este <a href='http://").concat(utils.getIPAddress(), "'>enlace</a> para llamar.\n            Para el resto, este es vuestro enlace para reservar."),
      text: 'This is text version!'
    });
  } catch (error) {
    console.log(error);
  }
}

function sendStatusEmail(currentPedido, listUsersToNotify) {
  try {
    var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    console.log(caller, 'try', authEmail);
    nodeoutlook.sendEmail({
      auth: {
        user: authEmail.user,
        pass: authEmail.pass
      },
      from: 'jsegarrm@everis.com',
      to: listUsersToNotify,
      subject: "Pedido del dia ".concat(utils.returnMomentFormat(), "!. Que aproveche!"),
      html: "Para el dia de hoy ".concat(utils.returnMomentFormat(), ", el encargado de llamar ser\xE1\n            ").concat(currentPedido.caller.name, ", usa este <a href='http://").concat(utils.getIPAddress(), "'>enlace</a> para reservar tu bocadillo.\n Introduce tu correo largo y selecciona ").concat(currentPedido.caller.profile),
      text: 'This is text version!'
    });
  } catch (error) {
    console.log(error);
  }
}

function sendEmailRegister(email) {
  var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

  try {
    console.log(caller, 'try', authEmail);
    nodeoutlook.sendEmail({
      auth: {
        user: authEmail.user,
        pass: authEmail.pass
      },
      from: 'jsegarrm@everis.com',
      to: listUsersToNotify,
      subject: "Bienvenido a BocatApp!",
      html: "Utiliza este <a href='http://".concat(utils.getIPAddress(), "/new/").concat(btoa(email), "'>link</a> para registrate en la plataforma.\n            Para el resto, este es vuestro enlace para reservar."),
      text: 'This is text version!'
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendEmail: sendEmail,
  sendEmailRegister: sendEmailRegister,
  sendStatusEmail: sendStatusEmail
};