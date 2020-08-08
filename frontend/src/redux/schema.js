import {schema} from 'normalizr';

export const contact = new schema.Entity('contacts', undefined, {idAttribute: 'userId'})    ;
export const arrayOfContacts = new schema.Array(contact)


export const chat = new schema.Entity('chats', undefined, {idAttribute: 'id'})    ;
export const arrayOfChats = new schema.Array(chat)