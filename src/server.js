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

import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

const port = env.expresshttpsPort;
const { expresshttpPort, expresshttpsPort } = env;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/queue', queueAPI);
app.use('/user', userAPI);

const privateKey  = fs.readFileSync(path.resolve('dist', 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve('dist', 'server.crt'), 'utf8');
const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

//JHON SSL
dbInit().then(() => {
    httpServer.listen(expresshttpPort, () => {      
        console.log(`listen on port ${expresshttpPort}`);
    });
    httpsServer.listen(expresshttpsPort, () => {      
        console.log(`listen on port ${expresshttpsPort}`);
    }); 
}).catch(error => {
    console.log(error);
});
