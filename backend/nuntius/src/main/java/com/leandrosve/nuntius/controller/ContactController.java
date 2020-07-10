package com.leandrosve.nuntius.controller;

import java.util.Set;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.ContactDTO;
import com.leandrosve.nuntius.service.ContactService;
import com.leandrosve.nuntius.service.UserService;
import com.leandrosve.nuntius.util.AuthUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @Autowired
    UserService userService;

    @Autowired 
    ContactService contactService;

    @Autowired
    AuthUtil authUtil;

    @GetMapping("/contacts")
    public Set<ContactDTO> contacts() {   
        Set<ContactDTO> contacts = contactService.getContacts();
        return contacts;
    }

    @GetMapping("/contacts/{id}")
    public ContactDTO contacts(@PathVariable Long id) {   
        final ContactDTO contact = contactService.getContact(id);
        return contact;
    }

    @PostMapping("/contacts")
    public ContactDTO createContact(@Valid @RequestBody ContactDTO contact){   
      return contactService.createContact(contact);
    }

    @DeleteMapping("/contacts/{id}")
    public ContactDTO deleteContact(@PathVariable Long id) {   
        final ContactDTO contact = contactService.deleteContact(id);
        return contact;
    }

}