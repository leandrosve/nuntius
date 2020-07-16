package com.leandrosve.nuntius.service;

import java.util.ArrayList;
import java.util.List;

import com.leandrosve.nuntius.beans.MessageDTO;
import com.leandrosve.nuntius.beans.MessageReceptionDTO;
import com.leandrosve.nuntius.exception.AccessDeniedException;
import com.leandrosve.nuntius.exception.chat.ChatNotFoundException;
import com.leandrosve.nuntius.exception.message.MessageNotFoundException;
import com.leandrosve.nuntius.model.Chat;
import com.leandrosve.nuntius.model.Message;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IChatRepository;
import com.leandrosve.nuntius.repository.IMessageRepository;
import com.leandrosve.nuntius.util.AuthUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    AuthUtil authUtil;

    @Autowired
    IChatRepository chatRepository;

    
    @Autowired
    IMessageRepository messageRepository;


    public MessageDTO createMessage(MessageDTO messageDTO, Long chatId){
        final User currentUser = authUtil.getCurrentUser(); 
        final Chat chat = chatRepository.findById(chatId).orElseThrow(()-> new ChatNotFoundException());
        if(!chat.isUserMember(currentUser.getId())){throw new AccessDeniedException();}
        Message message= new Message(currentUser, chat, messageDTO.getText());
        List<User> users =chat.getMembers();
        users.remove(currentUser);
        message.setReceiverUsers(users);
        messageRepository.save(message);
        return mapToDTO(message);
    }

    public MessageDTO getMessage(Long id){
        final User currentUser = authUtil.getCurrentUser(); 
        final Message message = messageRepository.findById(id).orElseThrow(()-> new ChatNotFoundException());
        if(!message.getChat().isUserMember(currentUser.getId())){throw new AccessDeniedException();}
        return mapToDTO(message);
    }

    public List<MessageDTO> getMessages(Long chatId){
        final User currentUser = authUtil.getCurrentUser(); 
        final Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new MessageNotFoundException());
        if(!chat.isUserMember(currentUser.getId())){throw new AccessDeniedException();};
        final List<Message> messages = chat.getMessages();
        List<MessageDTO> messageDTOs = new ArrayList<MessageDTO>();
        if(messages != null && messages.size() > 0){
            messages.forEach((m) -> messageDTOs.add(mapToDTO(m)));
        }
        return messageDTOs;
    }

    
    public MessageDTO deleteMessage(Long id){
        final User currentUser = authUtil.getCurrentUser(); 
        final Message message = messageRepository.findById(id).orElseThrow(()-> new MessageNotFoundException());
        if(!message.getChat().isUserMember(currentUser.getId())){throw new AccessDeniedException();}
        messageRepository.delete(message);
        return mapToDTO(message);
    }

    public MessageDTO mapToDTO(Message message){
        MessageDTO messageDTO = new MessageDTO(message.getId(), message.getSender().getId(), message.getText(), message.getSentTime());
        List<MessageReceptionDTO> details = new ArrayList<MessageReceptionDTO>();
        message.getReceivers().forEach((mr) -> details.add(new MessageReceptionDTO(mr.getUser().getId(), mr.getSeenTime(), mr.getReceivedTime())));
        messageDTO.setDetails(details);
        return messageDTO;
    }
    
}