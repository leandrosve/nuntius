package com.leandrosve.nuntius.controller;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.MessageDTO;
import com.leandrosve.nuntius.model.Message;
import com.leandrosve.nuntius.model.MessageReception;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.service.MessageService;
import com.leandrosve.nuntius.service.UserService;

import com.leandrosve.nuntius.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    AuthUtil authUtil;

    @PostMapping("/chats/{chatId}/messages")
    public ResponseEntity<MessageDTO> createMessage(@Valid @RequestBody MessageDTO messageDTO, @PathVariable long chatId){
      final User currentUser = authUtil.getCurrentUser();
      final Message createdMessage=messageService.createMessage(currentUser,messageDTO, chatId);

      final MessageDTO messageToSend = messageService.mapToDTO(createdMessage);

      for(MessageReception reception : createdMessage.getReceivers()){
          //send through web socket
          messagingTemplate.convertAndSendToUser(reception.getUser().getUsername(), "/queue/messages", messageToSend);
      }

      return new ResponseEntity<MessageDTO>(messageService.prepareMessageForSender(createdMessage), HttpStatus.CREATED);
    }

    @PostMapping("/users/{userId}/messages")
    public ResponseEntity<MessageDTO> createMessageForUser(@Valid @RequestBody MessageDTO messageDTO, @PathVariable long userId){  
      final User receiver =  userService.getUser(userId);
      final User currentUser = authUtil.getCurrentUser();
      final Message createdMessage=messageService.createMessageForUser(currentUser,receiver,messageDTO);
      final MessageDTO messageToSend= messageService.mapToDTO(createdMessage);

      //send through web socket
      messagingTemplate.convertAndSendToUser(receiver.getUsername(), "/queue/messages", messageToSend);
      messagingTemplate.convertAndSendToUser(currentUser.getUsername(), "/queue/messages", messageService.prepareMessageForSender(createdMessage));

      return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}/messages")
    public List<MessageDTO> getMessagesFromUser(@PathVariable long userId){  
      User user =  userService.getUser(userId);
      final List<MessageDTO> messages= messageService.getMessagesFromUser(user);

      return messages;
    }

    @GetMapping("/chats/{chatId}/messages")
    public List<MessageDTO> getMessages(@PathVariable long chatId){
        final User currentUser = authUtil.getCurrentUser();
        return messageService.getMessages(currentUser, chatId);
    }

    @DeleteMapping("/messages/{id}")
    public MessageDTO deleteMessage(@PathVariable Long id){   
      return messageService.deleteMessage(id);
    }


}