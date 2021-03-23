// libreria que recibe los llamados REST de la api
import express from 'express';
// librería para permitir el accesso desde localhost:3000
import cors from 'cors';
// libreria para detectar el formato json automáticamente
import bodyParser from 'body-parser';

import queueAPI from './queueAPI.js';
import userAPI from './userAPI.js';

import env from './env';
import { dbInit } from './databasememory';

/*
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
*/

const app = express();
app.use(bodyParser.json());
// para permitir el origen desde localhost:3000
app.use(cors());

app.use('/queue', queueAPI);
app.use('/user', userAPI);

const port = env.expressPort;

/*app.listen(port, () => {
    console.log(`listen on port ${port}`);
});*/ 

//JHON SSL
dbInit().then(() => {
    app.listen(port, () => {
        console.log(`listen on port ${port}`);
    }); 
}).catch(error => {
    console.log(error);
});
