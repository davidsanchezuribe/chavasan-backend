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
    const validMembers = await validateMembers(members, owner);
    if (!validMembers.valid) {
        res.status(500).send(validMembers.msg); 
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
    const validChannelOwner = await validateChannelOwner(uid, owner);
    if(!validChannelOwner.valid){
        res.status(500).send(validChannelOwner.msg); 
        return;
    }
    const response = await deleteChannel(uid);
    if(response){
        res.send(`Canal "${uid}" eliminado exitosamente`);
    } else {
        res.status(500).send(`Error desconocido en la eliminación del canal "${uid}"`); 
    }
});

queueAPI.post('/list', async (req, res) => {
    const { member } = req.body;
    const validMember = await validateUser(member);
    if(!validMember.valid){
        res.status(500).send(validMember.msg); 
        return;
    }
    const messages = await getMessages(member);
    res.send(messages);

});

queueAPI.post('/sendmessage', async (req, res) => {
    const { channeluid, memberuid, content } = req.body;
    const validChannelMember = await validateChannelMember(channeluid, memberuid);
    if(!validChannelMember.valid){
        res.status(500).send(validChannelMember.msg); 
        return;
    }
    if(!validateMessage(content).valid){
        res.status(500).send(validateMessage(content).msg); 
        return;  
    }
    const response = await addMessage(channeluid, memberuid, content);
    if(response){
        res.send(`Mensaje añadido exitosamente`);
    } else {
        res.status(500).send(`Error desconocido en el envío del mensaje`); 
    }

});

export default queueAPI;