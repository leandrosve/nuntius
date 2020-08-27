package com.leandrosve.nuntius.controller;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.ContactDTO;
import com.leandrosve.nuntius.beans.UserDTOv2;
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

    @GetMapping("/contacts/{id}")
    public UserDTOv2 getContact(@PathVariable Long id) {
        final UserDTOv2 contact = contactService.getContact(id);
        return contact;
    }

    @PatchMapping("/contacts/{id}")
    public UserDTOv2 updateContact(@PathVariable Long id, @RequestBody ContactDTO contact){
      return contactService.updateContact(id, contact);
    }

    @DeleteMapping("/contacts/{id}")
    public UserDTOv2 deleteContact(@PathVariable Long id) {
        final UserDTOv2 user = contactService.deleteContact(id);
        return user;
    }


    /* ================= v2 ================= */

    @GetMapping("/contacts")
    public List<UserDTOv2> contacts() {
        List<UserDTOv2> contacts = contactService.getContacts();
        return contacts;
    }

    @PostMapping("/contacts")
    public ResponseEntity<UserDTOv2> createContact(@Valid @RequestBody ContactDTO contact){
        final UserDTOv2 createdContact=contactService.createContact(contact);
        return new ResponseEntity<UserDTOv2>(createdContact, HttpStatus.CREATED);
    }

}