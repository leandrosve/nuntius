package com.leandrosve.nuntius.service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.MessageDTO;
import com.leandrosve.nuntius.beans.MessageDetailsDTO;
import com.leandrosve.nuntius.beans.MessageReceptionDTO;
import com.leandrosve.nuntius.exception.AccessDeniedException;
import com.leandrosve.nuntius.exception.chat.ChatNotFoundException;
import com.leandrosve.nuntius.exception.message.MessageNotFoundException;
import com.leandrosve.nuntius.model.Chat;
import com.leandrosve.nuntius.model.ChatMembership;
import com.leandrosve.nuntius.model.Message;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IChatMembershipRepository;
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
    IChatMembershipRepository chatMembershipRepository;

    
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
        final Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException());
        if(!chat.isUserMember(currentUser.getId())){throw new AccessDeniedException();};

        ChatMembership membership = chat.getMembership(currentUser);      

        membership.setLastFetchTime(new Date());
        chatMembershipRepository.save(membership);

       // final List<Message> messages = chat.getMessages();
       final List<Message> messages = messageRepository.findAllByChatIdAndSentTimeLessThan(chatId, new Date());
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
        MessageDTO messageDTO = new MessageDTO(message.getId(), message.getSender().getId(), message.getChat().getId(), message.getText(), message.getSentTime());
        if(messageDTO.getUserId() == authUtil.getCurrentUser().getId()){
            List<MessageReceptionDTO> receptions = new ArrayList<MessageReceptionDTO>();
            message.getReceivers().forEach((mr) -> receptions.add(new MessageReceptionDTO(mr.getUser().getId(), mr.getSeenTime(), mr.getReceivedTime())));
            messageDTO.setDetails(new MessageDetailsDTO(receptions,message.isReceived(),message.isSeen()));
        }
        return messageDTO;
    }

    public List<MessageDTO> mapToDTO(List<Message> messages){
        List<MessageDTO> messageDTOs = new ArrayList<MessageDTO>();
        messages.forEach(m ->messageDTOs.add(mapToDTO(m)));
        return messageDTOs;
    }

	public MessageDTO createMessageForUser(@Valid MessageDTO messageDTO, User user) {    
        final User currentUser = authUtil.getCurrentUser(); 
        List<Chat> chats = chatRepository.findPrivateChat(currentUser.getId(), user.getId());
        Chat chat;
        if(chats == null || chats.size() == 0){
            List<User> userIds = new ArrayList<User>(Arrays.asList(currentUser, user));
            chat = chatRepository.save(new Chat(userIds, null , false, ""));
        }else{
            chat= chats.get(0);
        }
        return createMessage(messageDTO, chat.getId());
    }
    
    public List<MessageDTO> getMessagesFromUser(User user){
        final User currentUser = authUtil.getCurrentUser(); 
        List<Chat> chats = chatRepository.findPrivateChat(currentUser.getId(), user.getId());
        
        if(chats == null || chats.size() == 0){ throw new ChatNotFoundException();}
        Chat chat = chats.get(0);
        final List<Message> messages = messageRepository.findAllByChatIdAndSentTimeLessThan(chat.getId(), new Date());
        return mapToDTO(messages);


    }
    
}