import {schema} from 'normalizr';

export const contact = new schema.Entity('contacts', undefined, {idAttribute: 'userId'})    ;
export const arrayOfContacts = new schema.Array(contact)