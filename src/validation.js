import { userExists, channelExists, checkChannelOwnership, belongsToChannelUID } from './database';

export function validateChannelName(name){
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
    return {
        valid: true,
        msg: null,
    }
}
export function validateUser(user){
    if(user === undefined){
        return {
            valid: false,
            msg: 'el usuario no puede ser undefined',
        }
    }
    if(!userExists(user)){
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

export function validateMembers(members, owner){
    if(!validateUser(owner).valid) {
        return validateUser(owner);
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
        const temp = validateUser(members[index]);
        if(!temp.valid){
            return temp;
        }
    }
    return {
        valid: true,
        msg: null,
    }
}

function validateChannel(uid){
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
    if(!channelExists(uid)){
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

export function validateChannelOwner(uid, owner){
    if(!validateChannel(uid).valid){
        return validateChannel(uid);
    }
    if(!validateUser(owner).valid){
        return validateUser(owner);
    }
    if(!checkChannelOwnership(uid, owner)){
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

export function validateChannelMember(uid, member){
    if(!validateChannel(uid).valid){
        return validateChannel(uid);
    }
    if(!validateUser(member).valid){
        return validateUser(member);
    }
    if(!belongsToChannelUID(uid, member)){
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