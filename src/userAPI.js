import express from 'express';
import { getUsers } from './database';

const userAPI = express.Router();

userAPI.post('/list', async (req, res) => {
    const users = await getUsers();
    if(true){
        res.send(users);
    } else {
        res.status(500).send(`Error desconocido en la creación del canal `); 
    }
});

export default userAPI;