// libreria que recibe los llamados REST de la api
import express from 'express';
import { 
    validateChannelName, 
    validateMembers, 
    validateChannelOwner,
    validateChannelMember,
    validateUser,
    validateMessage,
} from './validation';

import { 
    createChannel, 
    deleteChannel, 
    getMessages,
    addMessage 
} from './database';

const queueAPI = express.Router();

queueAPI.post('/create', async (req, res) => {
    const { name, owner, members } = req.body;
    if (!validateChannelName(name).valid) {
        res.status(500).send(validateChannelName(name).msg); 
        return;
    }
    if (!validateMembers(members, owner).valid) {
        res.status(500).send(validateMembers(members, owner).msg); 
        return;
    }
    const response = createChannel(name, owner, members);
    if(response){
        res.send(`Canal "${name}" creado exitosamente`);
    } else {
        res.status(500).send(`Error desconocido en la creación del canal "${name}"`); 
    }
});

queueAPI.post('/delete', async (req, res) => {
    const { uid, owner } = req.body;
    if(!validateChannelOwner(uid, owner).valid){
        res.status(500).send(validateChannelOwner(uid, owner).msg); 
        return;
    }
    const response = deleteChannel(uid);
    if(response){
        res.send(`Canal "${uid}" eliminado exitosamente`);
    } else {
        res.status(500).send(`Error desconocido en la eliminación del canal "${uid}"`); 
    }
});

queueAPI.post('/list', async (req, res) => {
    const { member } = req.body;
    if(!validateUser(member).valid){
        res.status(500).send(validateUser(member).msg); 
        return;
    }
    res.send(getMessages(member));

});

queueAPI.post('/sendmessage', async (req, res) => {
    const { channeluid, memberuid, content } = req.body;
    if(!validateChannelMember(channeluid, memberuid).valid){
        res.status(500).send(validateChannelMember(channeluid, memberuid).msg); 
        return;
    }
    if(!validateMessage(content).valid){
        res.status(500).send(validateMessage(content).msg); 
        return;  
    }
    const response = addMessage(channeluid, memberuid, content);
    if(response){
        res.send(`Mensaje añadido exitosamente`);
    } else {
        res.status(500).send(`Error desconocido en el envío del mensaje`); 
    }

});

export default queueAPI;