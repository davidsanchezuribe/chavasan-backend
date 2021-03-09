import MongoClient from 'mongodb';
import { queues, users } from './model';
import env from './env';
const { v4 } = require('uuid');
// para almacenar la conexión a la base de datos
const { mongoServer, database } = env;

export let db = null;

export async function dbInit(){
    const client = await MongoClient.connect(`mongodb://${mongoServer}`
    , { useUnifiedTopology: true });
    db = client.db(database);
    console.log('mongo successfully conected');
    return;
}

export function userExists(userId){
    return [...users].filter(user => user.uid == userId).length > 0;
}

export function createChannel(name, owner, members){
    const newMembers = [{id: owner, messages: []}];
    members.forEach(member => {
        newMembers.push({id: member, messages: []});
    });
    const newChannel = {
        uid: v4(),
        owner,
        date: Date.now(),
        name,
        members: newMembers,
    }
    queues.push(newChannel);
    return true;
}

export function deleteChannel(uid) {
    console.log(queues);
    queues.forEach((queue, index) => {
        console.log(index);
        if(uid === queue.uid){
            queues.splice(index, 1); 
        }
    });
    queues.filter(queue => queue.uid != uid);
    console.log(queues);
    return true;
}

export function channelExists(channelUID){
    return [...queues].filter(queue => queue.uid == channelUID).length > 0; 
}

export function checkChannelOwnership(channelUID, owner){
    return [...queues].filter(queue => queue.uid == channelUID)[0].owner === owner;

}

export function belongsToChannelUID(uid, member){
    return belongsToChannel([...queues].filter(queue => queue.uid == uid)[0], member);
}

function belongsToChannel(channel, member){
    const members = channel.members;
    let ret = false;
    members.forEach(user => {
        if(user.id == member){
            ret = true;
        }  
    });
    return ret;
}

function getChannelData(channel, member){
    const newChannel = {...channel};
    let messages = [];

    const members = newChannel.members;
    members.forEach(user => {
        if(user.id === member){
            messages = user.messages;
        }
    });
    delete newChannel.members;
    newChannel.messages = messages;
    return newChannel;
}

export function getMessages(member){
    const allMessages = [];
    queues.forEach(queue => {
        if(belongsToChannel(queue, member)){
            allMessages.push(getChannelData(queue, member));
        }   
    });
    return allMessages;
}

function addMessage2Channel(channeluid, message){
    queues.forEach((queue) => {
        if(queue.uid === channeluid){
            queue.members.forEach((member) => {
                member.messages.push(message);
            });
        }       
    });
}

export function addMessage(channeluid, memberuid, message){
    const newMessage = {
        uid: v4(),
        creator: memberuid,
        date: Date.now(),
        text: message,
        readed: false
    };
    addMessage2Channel(channeluid, newMessage);
    return true;
}

/*MongoClient.connect(`mongodb://${mongoServer}`
    , { useUnifiedTopology: true }).then(client => {
        db = client.db('issuetracker');
        console.log('mongo successfully conected')
    }).catch(error => {
        console.log('ERROR: ', error);
    });*/