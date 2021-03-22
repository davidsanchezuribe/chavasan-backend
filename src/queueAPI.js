// libreria que recibe los llamados REST de la api
import express from 'express';
import { 
    validateChannelName, 
    validateChannelOwner,
    validateChannelMember,
    validateUser,
    validateMessage,
    alreadySubscribed
} from './validation';

import { 
    createChannel, 
    deleteChannel,
    subscribeToChannel,
    unsubscribeFromChannel,  
    getMessages,
    addMessage,
    getAvailableChannels
} from './database';

const queueAPI = express.Router();

queueAPI.post('/create', async (req, res) => {
    const { name, owner } = req.body;
    const validName = await validateChannelName(name);
    if (!validName.valid) {
        res.status(500).send(validName.msg); 
        return;
    }
    const response = createChannel(name, owner);
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

queueAPI.post('/subscribe', async (req, res) => {
    const { uidchannel, uiduser } = req.body;
    const validAlreadySubscribed = await alreadySubscribed(uidchannel, uiduser);
    if(!validAlreadySubscribed.valid){
        res.status(500).send(validAlreadySubscribed.msg); 
        return;
    }
    const response = await subscribeToChannel(uidchannel, uiduser);
    if(response){
        res.send(`El usuario "${uiduser}" fue suscrito correctamente al canal con uid "${uidchannel}"`);
    } else {
        res.status(500).send(`Error desconocido al suscribir el usuario "${uiduser}" al canal con uid "${uidchannel}"`); 
    }
});

queueAPI.post('/unsubscribe', async (req, res) => {
    const { uidchannel, uiduser } = req.body;
    const validChannelMember = await validateChannelMember(uidchannel, uiduser);
    if(!validChannelMember.valid){
        res.status(500).send(validChannelMember.msg); 
        return;
    }
    const response = await unsubscribeFromChannel(uidchannel, uiduser);
    //const response = true;
    if(response){
        res.send(`El usuario "${uiduser}" fue removido correctamente del canal con uid "${uidchannel}"`);
    } else {
        res.status(500).send(`Error desconocido al remover el usuario "${uiduser}" del canal con uid "${uidchannel}"`); 
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
    // desencriptar content usando el memberuid
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

queueAPI.post('/listavailable', async (req, res) => {
    const { user } = req.body;
    const validUser = await validateUser(user);
    if(!validUser.valid){
        res.status(500).send(validUser.msg); 
        return;
    }
    const channels = await getAvailableChannels(user);
    res.send(channels);
});

export default queueAPI;