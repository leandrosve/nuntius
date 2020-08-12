package com.leandrosve.nuntius.controller;

import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.MessageDTO;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.service.MessageService;
import com.leandrosve.nuntius.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @Autowired
    MessageService messageService;

    @Autowired
    UserService userService;
    

    @PostMapping("/chats/{chatId}/messages")
    public ResponseEntity<MessageDTO> createMessage(@Valid @RequestBody MessageDTO messageDTO, @PathVariable long chatId){   
      final MessageDTO createdMessage=messageService.createMessage(messageDTO, chatId);
      return new ResponseEntity<MessageDTO>(createdMessage, HttpStatus.CREATED);
    }

    @PostMapping("/users/{userId}/messages")
    public ResponseEntity<MessageDTO> createMessageForUser(@Valid @RequestBody MessageDTO messageDTO, @PathVariable long userId){  
      User user =  userService.getUser(userId);
      final MessageDTO createdMessage=messageService.createMessageForUser(messageDTO, user);
      return new ResponseEntity<MessageDTO>(createdMessage, HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}/messages")
    public List<MessageDTO> getMessagesFromUser(@PathVariable long userId){  
      User user =  userService.getUser(userId);
      final List<MessageDTO> messages= messageService.getMessagesFromUser(user);
      return messages;
    }


    


    @GetMapping("/chats/{chatId}/messages")
    public List<MessageDTO> getMessages(@PathVariable long chatId){   
      return messageService.getMessages(chatId);
    }

    @DeleteMapping("/messages/{id}")
    public MessageDTO deleteMessage(@PathVariable Long id){   
      return messageService.deleteMessage(id);
    }

}