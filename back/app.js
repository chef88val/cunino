import express from 'express';

import http from 'http';
import https from 'https';
import os from 'os';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import *  as controllers from './controllers/controllers';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import itemRouter from './routes/item';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import _ from 'lodash';


console.log(process.env);
console.log(path.join(__dirname, '../back/.env'));
console.log(dotenv.config({ path: path.join(__dirname, '../back/.env') }));

var app = express();
var port = 3800;
var nameApp = 'Cunino';
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${nameApp}`, {
  useNewUrlParser: true
})
  .then(
    () => {
      console.log(`Conexion a Base de datos ${nameApp} OK, ${process.env.NAME_APP}`)
      //Creando servidor
      // app.listen(port, () => {
      /*var api = express.Router();
      var app = express();
      initApplication(app, api);
      console.log("Corriendo")*/
      //})
    }
  ).catch(err => console.log('err', err))


const initApplication = (app, router) => {
  app = app || express();
  router = router || express.Router();


  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

  app.use('/', indexRouter);
  /*app.use('/admin', adminRouter)
  app.use('/cashflow', cashflowRouter)
  app.use('/delivery', deliveryRouter)
  app.use('/history', historyRouter)
  app.use('/item', itemRouter)
  app.use('/stock', stockRouter)
  app.use('/user', usersRouter);*/

  if ("dev" === process.env.NODE_ENV) {
    let server;
    if (process.env.HTTPS) {
      //fix ssl localhost
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      server = https.createServer(
        {
          key: fs.readFileSync(__dirname + "/ssl/server.key"),
          cert: fs.readFileSync(__dirname + "/ssl/server.crt"),
          ca: fs.readFileSync(__dirname + "/ssl/ca.crt"),
          requestCert: true,
          rejectUnauthorized: false
        },
        app
      );
    } else {
      server = http.createServer(app);
    }

    server.listen(process.env.PORT || 3000, process.env.HOST, () => {
      console.log(
        `up and running @: ${os.hostname()} on port: ${process.env.PORT || 3000}`
      );
      console.log(`enviroment: ${process.env.NODE_ENV || "Development"}`);
    });
  }

  // error handlers
  app.use((err, req, res, next) => {
    let statusCode =
      req.status || req.statusCode || err.code || err.statusCode || 500;

    const msg = !_.isEmpty(err.message)
      ? !_.isEmpty(err.message.sqlMessage)
        ? err.message.sqlMessage
        : err.message
      : "Something went wrong";

    return res.status(statusCode).json({
      data: null,
      message: msg
    });
  });
};

console.log("ENV", process.env.NODE_ENV)

if ("dev" == process.env.NODE_ENV) {
  initApplication();
} else {
  module.exports.init = function(app, router) {
    return initApplication(app, router);
  };
}
export default app;
