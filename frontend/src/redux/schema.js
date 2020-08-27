import {schema} from 'normalizr';

export const contact = new schema.Entity('contacts', undefined, {idAttribute: 'userId'})    ;
export const arrayOfContacts = new schema.Array(contact)

export const user = new schema.Entity('users', undefined, {idAttribute: 'id'})    ;
export const arrayOfUsers = new schema.Array(user)


export const chat = new schema.Entity('chats', undefined, {idAttribute: 'id'})    ;
export const arrayOfChats = new schema.Array(chat)