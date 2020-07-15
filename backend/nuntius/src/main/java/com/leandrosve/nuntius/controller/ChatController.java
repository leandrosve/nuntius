package com.leandrosve.nuntius.controller;

import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.ChatDTO;
import com.leandrosve.nuntius.service.ChatService;

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
public class ChatController {

    @Autowired
    ChatService chatService;
    
    @PostMapping("/chats")
    public ResponseEntity<ChatDTO> createChat(@Valid @RequestBody ChatDTO chatDTO){   
      final ChatDTO createdChat=chatService.createChat(chatDTO);
      return new ResponseEntity<ChatDTO>(createdChat, HttpStatus.CREATED);
    }

    @PostMapping("/chats/{chatId}/users/{userId}")
    public ResponseEntity<ChatDTO> addMember(@PathVariable Long chatId, @PathVariable Long userId){   
      final ChatDTO createdChat=chatService.addMember(chatId, userId);
      return new ResponseEntity<ChatDTO>(createdChat, HttpStatus.OK);
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
    public ChatDTO deleteChat(@PathVariable Long id){   
      return chatService.deleteChat(id);
    }
}