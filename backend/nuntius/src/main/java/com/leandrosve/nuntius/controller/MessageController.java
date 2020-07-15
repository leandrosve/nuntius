package com.leandrosve.nuntius.controller;

import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.MessageDTO;
import com.leandrosve.nuntius.service.MessageService;

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
    
    @PostMapping("/chats/{chatId}/messages")
    public ResponseEntity<MessageDTO> createMessage(@Valid @RequestBody MessageDTO messageDTO, @PathVariable long chatId){   
      final MessageDTO createdMessage=messageService.createMessage(messageDTO, chatId);
      return new ResponseEntity<MessageDTO>(createdMessage, HttpStatus.CREATED);
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