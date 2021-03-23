import MongoClient from 'mongodb';
import { queues, users } from './model';
import env from './env';
import Query from 'query';

const { v4 } = require('uuid');
// para almacenar la conexión a la base de datos
const { mongoServer, database } = env;

const eraseAfterRead = false;

export let db = null;

export async function dbInit() {
    console.log('Working on Memory');
    return;
}

export async function userExists(userId) {
    return Query.query(users, {uid: userId}).length > 0;
}

export async function createChannel(name, owner) {
    const members = [{ id: owner, messages: [] }];
    const newChannel = {
        uid: v4(),
        owner,
        date: Date.now(),
        name,
        members,
    }
    queues.push(newChannel);
    return true;
}

export async function channelNameExists(name) {
    return Query.query(queues, { 'name': name }).length > 0;
}

export async function deleteChannel(uid) {
    queues.splice(queues.findIndex(queue => queue.uid === uid), 1)
    return true; 
}

export async function channelExists(channelUID) {
    return Query.query(queues, { 'uid': channelUID }).length > 0;
}

export async function checkChannelOwnership(channelUID, owner) {
    return Query.query(queues, { 'uid': channelUID, 'owner': owner }).length > 0;
}

export async function belongsToChannelUID(uid, memberuid) {
    return queues.filter(queue => queue.uid === uid)[0].members.filter(member => member.id === memberuid).length > 0;
}

export async function subscribeToChannel(uid, member) {
    queues.forEach(queue => {
        if(queue.uid === uid){
            queue.members.push({ id: member, messages: [] });
        }
    })
    return true;
}

export async function unsubscribeFromChannel(channeluid, memberuid) {
    const queueindex = queues.findIndex(queue => queue.uid === channeluid);
    const memberindex = queues[queueindex].members.findIndex(member => member.id === memberuid);
    queues[queueindex].members.splice(memberindex, 1);
    return true;
}

export async function getMessages(memberuid) {
    const channels = [];
    queues.forEach(queue => {
        const { members } = queue;
        const memberinfo = members.filter(member => member.id === memberuid);
        if(memberinfo.length > 0){
            const { messages } = memberinfo[0];
            const channelUsers = members.map(member => {
                const { id } = member;
                return users.find(user => user.uid === id);
            });
            const channel = {...queue, users: channelUsers, messages}
            delete channel.members;
            channels.push(channel);
        }
    })
    return channels;
}


export async function addMessage(channeluid, memberuid, message) {
    const newMessage = {
        uid: v4(),
        creator: memberuid,
        date: Date.now(),
        text: message,
        readed: false
    };
    for(let i = 0; i < queues.length; i++){
        const { uid, members } = queues[i];
        if(uid === channeluid){
            for(let j = 0; j < members.length; j++){
                members[j].messages.push(newMessage);
            }         
        }
    }
    return true;
}

export async function getUsers() {
    return users;
}

export async function getAvailableChannels(userid) {
    const response = [];
    for(let i = 0; i < queues.length; i++){
        const { members } = queues[i];
        let belong = false;
        for(let j = 0; j < members.length; j++){
            if(members[j].id === userid){
                belong = true;
            }
        }
        if(!belong){
            const { uid, name } = queues[i];
            response.push({uid, name});
        }
    }
    return response;
}
