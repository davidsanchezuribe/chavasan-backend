// libreria que recibe los llamados REST de la api
import express from 'express';
const exampleAPI = express.Router();

exampleAPI.get('/call', async (req, res) => {
    res.send('Success');
});

export default exampleAPI;