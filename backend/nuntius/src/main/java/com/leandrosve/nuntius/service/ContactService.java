package com.leandrosve.nuntius.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.leandrosve.nuntius.beans.ContactDTO;
import com.leandrosve.nuntius.exception.BadRequestException;
import com.leandrosve.nuntius.exception.NotFoundException;
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
        return new ContactDTO(c.getId(), c.getUser().getUsername(), c.getAlias(), 
                                c.getUser().getBiography(), c.getUser().getName(), 
                                c.getUser().getId());
    }

    public ContactDTO createContact(ContactDTO contactDTO){
        final User owner= authUtil.getCurrentUser();
        if(contactDTO.getUserId() == owner.getId()){throw new BadRequestException(langUtil.t("contact.invalid"));}
        final User user= userService.getUser(contactDTO.getUserId());

        if(contactRepository.findByOwnerAndUser(owner, user)!= null){ throw new BadRequestException(langUtil.t("contact.exists"));}
        Contact contact = new Contact(contactDTO.getAlias(),user, owner );
        return saveContact(contact);
    }

    public ContactDTO saveContact(Contact contact){
        Contact createdContact = contactRepository.save(contact);
        return mapToDTO(createdContact);

    }

    public ContactDTO getContact(Long id){
        final Optional<Contact> contact= contactRepository.findById(id);
        if(!contact.isPresent()){throw new NotFoundException(langUtil.t("contact.notfound"));}
        authUtil.authenticate(contact.get().getOwnerId());
        return mapToDTO(contact.get());
    }

    public ContactDTO deleteContact(Long id){
        final Optional<Contact> contact= contactRepository.findById(id);
        if(!contact.isPresent()){throw new NotFoundException(langUtil.t("contact.notfound"));}
        authUtil.authenticate(contact.get().getOwnerId());
        contactRepository.delete(contact.get());
        return mapToDTO(contact.get());
    }

    public Set<ContactDTO> getContacts(){
        final User owner= authUtil.getCurrentUser();
        final User user = userService.getUser(owner.getId());
        Set<Contact> contacts= user.getContacts();
        Set<ContactDTO> result= new HashSet<ContactDTO>();
        contacts.forEach((c)->result.add(mapToDTO(c)));
        return result;
    } 
      
}