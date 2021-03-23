import { 
    userExists, 
    channelExists, 
    checkChannelOwnership, 
    belongsToChannelUID,
    channelNameExists 
} from './databasememory';

export async function validateChannelName(name){
    if(name === undefined){
        return {
            valid: false,
            msg: 'Se debe pasar el parámetro name el cual indica el nombre del canal',
        }
    }
    if(typeof(name) != 'string'){
        return {
            valid: false,
            msg: 'El parámetro name, nombre del canal, debe ser un string',
        }
    }

    const nameTaken = await channelNameExists(name);
    if(nameTaken){
        return {
            valid: false,
            msg: `El canal con nombre ${name} ya existe`,
        } 
    }
    return {
        valid: true,
        msg: null,
    }
}
export async function validateUser(user){
    if(user === undefined){
        return {
            valid: false,
            msg: 'el usuario no puede ser undefined',
        }
    }
    const exists = await userExists(user); 
    if(!exists){
        return {
            valid: false,
            msg: `el usuario ${user} no está registrado`,
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

export async function validateMembers(members, owner){
    const validOwner = await validateUser(owner);
    if(!validOwner.valid) {
        return validOwner;
    }
    if(members === undefined){
        return {
            valid: false,
            msg: 'la lista de miembros no debe ser undefined',
        }
    }
    if(!Array.isArray(members)){
        return {
            valid: false,
            msg: 'la lista de miembros debe ser un arreglo',
        } 
    }
    if(members.length === 0){
        return {
            valid: false,
            msg: 'la lista de miembros debe tener por lo menos un miembro',
        }  
    }
    if(members.includes(owner)){
        return {
            valid: false,
            msg: 'no hay necesidad de repetir el creador del canal en la lista de miembros',
        }
    }
    for(let index = 0; index < members.length; index++){
        const temp = await validateUser(members[index]);
        if(!temp.valid){
            return temp;
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

export async function validateChannel(uid){
    if(uid === undefined){
        return {
            valid: false,
            msg: 'El uid del canal no puede ser undefined',
        }
    }
    if(typeof(uid) != 'string'){
        return {
            valid: false,
            msg: 'El uid del canal debe ser un string',
        }
    }
    const existChannel = await channelExists(uid);
    if(!existChannel){
        return {
            valid: false,
            msg: `el canal con uid "${uid}" no está registrado`,
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

export async function validateChannelOwner(uid, owner){
    const validChannel = await validateChannel(uid);
    if(!validChannel.valid){
        return validChannel;
    }
    const validOwner = await validateUser(owner);
    if(!validOwner.valid){
        return validOwner;
    }
    const ownershipChannel = await checkChannelOwnership(uid, owner);
    if(!ownershipChannel){
        return {
            valid: false,
            msg: `El canal con uid "${uid}" no pertenece al usuario "${owner}"`,
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

export async function validateChannelMember(uid, member){
    const validChannel = await validateChannel(uid);
    if(!validChannel.valid){
        return validChannel;
    }
    const validMember = await validateUser(member);
    if(!validMember.valid){
        return validMember;
    }
    const channelMembership = await belongsToChannelUID(uid, member);
    if(!channelMembership){
        return {
            valid: false,
            msg: `El miembro ${member} no pertenece al canal con id ${uid}"`,
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

export async function alreadySubscribed(uid, member){
    const validChannel = await validateChannel(uid);
    if(!validChannel.valid){
        return validChannel;
    }
    const validMember = await validateUser(member);
    if(!validMember.valid){
        return validMember;
    }
    const channelMembership = await belongsToChannelUID(uid, member);
    if(channelMembership){
        return {
            valid: false,
            msg: `El miembro ${member} ya está suscrito al canal con id ${uid}"`,
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

export function validateMessage(message){
    if(message === undefined){
        return {
            valid: false,
            msg: 'El mensaje enviado no puede ser undefined',
        }       
    }
    if(typeof(message) !== 'string'){
        return {
            valid: false,
            msg: 'El mensaje enviado debe ser un string',
        }   
    }
    return {
        valid: true,
        msg: null,
    }
}