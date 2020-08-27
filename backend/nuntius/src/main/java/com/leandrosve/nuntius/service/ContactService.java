package com.leandrosve.nuntius.service;

import java.util.*;

import com.leandrosve.nuntius.beans.ContactDTO;
import com.leandrosve.nuntius.beans.UserDTO;
import com.leandrosve.nuntius.beans.UserDTOv2;
import com.leandrosve.nuntius.exception.BadRequestException;
import com.leandrosve.nuntius.exception.contact.ContactAlreadyExistsException;
import com.leandrosve.nuntius.exception.contact.ContactNotFoundException;
import com.leandrosve.nuntius.model.Contact;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IContactRepository;
import com.leandrosve.nuntius.util.AuthUtil;
import com.leandrosve.nuntius.util.LangUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    
    @Autowired 
    IContactRepository contactRepository;

    @Autowired
    UserService userService;

    @Autowired
    AuthUtil authUtil;

    @Autowired
    LangUtil langUtil;

    private ContactDTO mapToDTO(Contact c){
        ContactDTO contact = new ContactDTO(c.getId(), c.getUser().getUsername(), c.getAlias(), 
                                c.getUser().getBiography(), c.getUser().getName(), 
                                c.getUser().getId());
        if(contact.getAlias() == null || contact.getAlias().isEmpty()){
            contact.setAlias(c.getUser().getName());
        }
        return contact;
    }

    public UserDTOv2 updateContact(Long id, ContactDTO contactDTO){
        final Contact contact= contactRepository.findById(id).get();
        if(contact == null ){throw new ContactNotFoundException();}
        authUtil.authenticate(contact.getOwnerId());
        contact.setAlias(contactDTO.getAlias());
        Contact createdContact = contactRepository.save(contact);
        return mapToDTOv2(contact);
    }

    public UserDTOv2 getContact(Long id){
        final Contact contact= contactRepository.findById(id).orElseThrow(()-> new ContactNotFoundException());
        authUtil.authenticate(contact.getOwnerId());
        return mapToDTOv2(contact);
    }

    public UserDTOv2 deleteContact(Long id){
        final Contact contact= contactRepository.findById(id).orElseThrow(()-> new ContactNotFoundException());
        authUtil.authenticate(contact.getOwnerId());
        contactRepository.delete(contact);
        UserDTOv2 user = mapToDTOv2(contact);
        user.setContactId(null);
        user.setAlias(null);
        return user;
    }

    /* ================= v2 ================= */

    public List<UserDTOv2> getContacts() {
        final User user = authUtil.getCurrentUser();
        Set<Contact> contacts = user.getContacts();
        List<UserDTOv2> contactDTOs = new ArrayList<UserDTOv2>();
        if (contacts != null && contacts.size() > 0) {
            for(Contact contact : contacts){
                UserDTOv2 dto = mapToDTOv2(contact);
                contactDTOs.add(dto);
            }
        }
        return contactDTOs;
    }

    public UserDTOv2 createContact(ContactDTO contactDTO){
        final User owner= authUtil.getCurrentUser();
        if(contactDTO.getUserId() == owner.getId()){throw new BadRequestException(langUtil.t("contact.invalid"));}
        final User user= userService.getUser(contactDTO.getUserId());
        if(contactRepository.findByOwnerAndUser(owner, user)!= null){ throw new ContactAlreadyExistsException();}
        Contact contact = new Contact(contactDTO.getAlias(),user, owner );
        Contact createdContact = contactRepository.save(contact);
        return mapToDTOv2(contact);
    }

    private UserDTOv2 mapToDTOv2(Contact contact){
        UserDTOv2 dto = new UserDTOv2();
        dto.setId(contact.getUser().getId());
        dto.setBiography(contact.getUser().getBiography());
        dto.setName(contact.getUser().getName());
        dto.setUsername(contact.getUser().getUsername());
        String alias = contact.getAlias();
        if(alias == null || alias.isEmpty()){ alias = dto.getName();}
        dto.setAlias(alias);
        dto.setContactId(contact.getId());
        return dto;
    }
}