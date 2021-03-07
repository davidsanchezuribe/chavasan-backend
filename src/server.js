// libreria que recibe los llamados REST de la api
import express from 'express';
// librería para permitir el accesso desde localhost:3000
import cors from 'cors';
// libreria para detectar el formato json automáticamente
import bodyParser from 'body-parser';

import exampleAPI from './exampleAPI.js';
import env from './env';
import { dbInit } from './database';

const app = express();
app.use(bodyParser.json());
// para permitir el origen desde localhost:3000
app.use(cors());

app.use('/example', exampleAPI);

const port = env.expressPort;

app.listen(port, () => {
    console.log(`listen on port ${port}`);
}); 

/*dbInit().then(() => {
    app.listen(port, () => {
        console.log(`listen on port ${port}`);
    }); 
});*/
