package com.leandrosve.nuntius.controller;

import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.ChatDTO;
import com.leandrosve.nuntius.service.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;
    

    @PostMapping("/chats")
    public ResponseEntity<ChatDTO> createChat(@Valid @RequestBody ChatDTO chatDTO){   
      final ChatDTO createdChat=chatService.createChat(chatDTO);
      return new ResponseEntity<ChatDTO>(createdChat, HttpStatus.CREATED);
    }

    @PutMapping("/chats/{chatId}/users")
    public ResponseEntity<ChatDTO> addMember(@PathVariable Long chatId, @RequestBody Long userId){   
      final ChatDTO createdChat=chatService.addMember(chatId, userId);
      return new ResponseEntity<ChatDTO>(createdChat, HttpStatus.OK);
    }

    @PatchMapping("/group/{chatId}")
    public ResponseEntity<ChatDTO> editGroupTitle(@PathVariable Long chatId, @RequestBody  @Valid String title){
        ChatDTO chatDTO = chatService.editChatTitle(chatId, title);
        return new ResponseEntity<ChatDTO>(chatDTO, HttpStatus.OK);
    }

    @DeleteMapping("/group/{chatId}/users/{userId}")
    public ResponseEntity<?> deleteUserFromChat(@PathVariable @Valid Long userId, @PathVariable @Valid Long chatId){
        chatService.deleteUserFromChat(chatId, userId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/chats")
    public List<ChatDTO> getChats(){   
      return chatService.getChats();
    }
    
    @GetMapping("/chats/{id}")
    public ChatDTO getChat(@PathVariable Long id){   
      return chatService.getChat(id);
    }

    @DeleteMapping("/chats/{id}")
    public ResponseEntity<?> deleteChat(@PathVariable Long id){
        chatService.deleteChat(id);
      return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/group/{chatId}/users/{userId}")
    public ResponseEntity<?> addUserToChat(@PathVariable @Valid Long userId, @PathVariable @Valid Long chatId){
        ChatDTO chatDTO = chatService.addUserToChat(chatId, userId);
        return new ResponseEntity<ChatDTO>(chatDTO, HttpStatus.OK);
    }
}