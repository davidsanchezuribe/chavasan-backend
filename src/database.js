import MongoClient from 'mongodb';
import { queues, users } from './model';
import env from './env';
const { v4 } = require('uuid');
// para almacenar la conexión a la base de datos
const { mongoServer, database } = env;

const eraseAfterRead = false;

export let db = null;

export async function dbInit() {
    const client = await MongoClient.connect(`mongodb://${mongoServer}:27017/mom`
        , { useUnifiedTopology: true });
    db = client.db(database);
    console.log('mongo successfully conected');
    return;
}

export async function userExists(userId) {
    const users = await db.collection('users').find().toArray();
    return [...users].filter(user => user.uid == userId).length > 0;
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
    const response = await db.collection('queues').insertOne(newChannel);
    return response.result.ok === 1;
}

export async function deleteChannel(uid) {
    const response = await db.collection('queues').deleteOne({ 'uid': uid })
    return response.result.ok === 1 && response.result.n === 1;
}

export async function channelExists(channelUID) {
    const count = await db.collection('queues').find({ 'uid': channelUID }).count();
    return count > 0;
}

export async function checkChannelOwnership(channelUID, owner) {
    const count = await db.collection('queues').find({ 'uid': channelUID, 'owner': owner }).count();
    return count > 0;
}

export async function belongsToChannelUID(uid, member) {
    const count = await db.collection('queues').find({ 'uid': uid, 'members.id': member }).count();
    return count > 0;
}

export async function subscribeToChannel(uid, member) {
    const response = await db.collection('queues').updateOne({ 'uid': uid }, { $addToSet: { members: { id: member, messages: [] } } })
    return response.result.ok === 1 && response.result.n === 1;
}

export async function unsubscribeFromChannel(uid, member) {
    const response = await db.collection('queues').updateOne({ 'uid': uid }, { $pull: { members: { id: member } } })
    return response.result.ok === 1 && response.result.n === 1;
}

function getChannelData(channel, member) {
    const newChannel = { ...channel };
    let messages = [];

    const members = newChannel.members;
    members.forEach(user => {
        if (user.id === member) {
            messages = user.messages;
        }
    });
    delete newChannel.members;
    newChannel.messages = messages;
    return newChannel;
}

export async function getMessages(member) {
    //await db.collection('queues').updateMany({ 'members.id': member }, { $set: { 'members.$[element].messages.$[].readed': true } }, { arrayFilters: [{ 'element.id': member }] });
    const channels = await db.collection('queues')
        .aggregate([
            { $match: { 'members.id': member } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'members.messages.creator',
                    foreignField: "uid",
                    as: "users"
                }
            }
        ]);

    const allMessages = [];
    await channels.forEach(channel => {
        allMessages.push(getChannelData(channel, member));
    })
    if (eraseAfterRead) {
        await db.collection('queues').updateMany({ 'members.id': member }, { $set: { 'members.$[element].messages': [] } }, { arrayFilters: [{ 'element.id': member }] });
    }
    return allMessages;
}

export async function addMessage(channeluid, memberuid, message) {
    const newMessage = {
        uid: v4(),
        creator: memberuid,
        date: Date.now(),
        text: message,
        readed: false
    };
    const response = await db.collection('queues').updateOne({ 'uid': channeluid }, { $addToSet: { 'members.$[].messages': newMessage } });
    return response.result.ok === 1;
}

export async function getUsers() {
    const response = await db.collection('users').find().toArray();
    return response;
}

export async function getAvailableChannels(userid) {
    const response = await db.collection('queues').find({'members.id': {$ne: userid}}).project({uid: 1, name: 1}).toArray();
    console.log(response)
    return response;
}