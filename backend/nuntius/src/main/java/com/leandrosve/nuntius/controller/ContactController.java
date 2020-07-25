package com.leandrosve.nuntius.controller;

import java.util.Set;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.ContactDTO;
import com.leandrosve.nuntius.service.ContactService;
import com.leandrosve.nuntius.service.UserService;
import com.leandrosve.nuntius.util.AuthUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
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
    public ResponseEntity<ContactDTO> createContact(@Valid @RequestBody ContactDTO contact){   
      final ContactDTO createdContact=contactService.createContact(contact);
      return new ResponseEntity<ContactDTO>(createdContact, HttpStatus.CREATED);
    }

    @PatchMapping("/contacts/{id}")
    public ContactDTO updateContact(@PathVariable Long id, @Valid @RequestBody ContactDTO contact){   
      return contactService.updateContact(id, contact);
    }

    @DeleteMapping("/contacts/{id}")
    public ContactDTO deleteContact(@PathVariable Long id) {   
        final ContactDTO contact = contactService.deleteContact(id);
        return contact;
    }

}