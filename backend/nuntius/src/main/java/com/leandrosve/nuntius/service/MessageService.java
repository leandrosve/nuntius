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
import com.leandrosve.nuntius.model.*;
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


    public Message createMessage(User sender, MessageDTO messageDTO, Long chatId){

        final Chat chat = chatRepository.findById(chatId).orElseThrow(()-> new ChatNotFoundException());
        if(!chat.isUserMember(sender.getId())){throw new AccessDeniedException();}
        Message message= new Message(sender, chat, messageDTO.getText());
        List<User> users =chat.getMembers();
        users.remove(sender);
        message.setReceiverUsers(users);
        messageRepository.save(message);
        return message;
    }

    public MessageDTO getMessage(Long id){
        final User currentUser = authUtil.getCurrentUser(); 
        final Message message = messageRepository.findById(id).orElseThrow(()-> new ChatNotFoundException());
        if(!message.getChat().isUserMember(currentUser.getId())){throw new AccessDeniedException();}
        return mapToDTO(message);
    }



    public List<MessageDTO> getMessages(User user, Long chatId){
        final User currentUser = authUtil.getCurrentUser();
        final Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException());
        if(!chat.isUserMember(user.getId())){throw new AccessDeniedException();};

        ChatMembership membership = chat.getMembership(user);

        membership.setLastFetchTime(new Date());
        chatMembershipRepository.save(membership);

       // final List<Message> messages = chat.getMessages();
       final List<Message> messages = messageRepository.findAllByChatIdAndSentTimeLessThan(chatId, new Date());
        List<MessageDTO> messageDTOs = new ArrayList<MessageDTO>();
        messageDTOs = prepareMessages(messages, currentUser);
        return messageDTOs;
    }

    private void markReceptionsForChat(Chat chat, User user) {


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
        return messageDTO;
    }

    public List<MessageDTO> mapToDTO(List<Message> messages){
        List<MessageDTO> messageDTOs = new ArrayList<MessageDTO>();
        messages.forEach(m ->messageDTOs.add(mapToDTO(m)));
        return messageDTOs;
    }
    

	public Message createMessageForUser(User sender, User receiver, @Valid MessageDTO messageDTO) {

        List<Chat> chats = chatRepository.findPrivateChat(sender.getId(), receiver.getId());
        Chat chat;
        if(chats == null || chats.size() == 0){
            List<User> userIds = new ArrayList<User>(Arrays.asList(sender, receiver));
            chat = chatRepository.save(new Chat(userIds, null , false, ""));
        }else{
            chat= chats.get(0);
        }
        return createMessage(sender, messageDTO, chat.getId());
    }
    
    public List<MessageDTO> getMessagesFromUser(User user){
        final User currentUser = authUtil.getCurrentUser(); 
        List<Chat> chats = chatRepository.findPrivateChat(currentUser.getId(), user.getId());
        if(chats == null || chats.size() == 0){ throw new ChatNotFoundException();}
        Chat chat = chats.get(0);
        final List<Message> messages = messageRepository.findAllByChatIdAndSentTimeLessThan(chat.getId(), new Date());
        return prepareMessages(messages, currentUser);
    }

    public List<MessageDTO> prepareMessages(List<Message> messages, User sender){
        final Long senderId = sender.getId();
        List<MessageDTO> messageDTOs = new ArrayList<MessageDTO>();
        messages.forEach((m) -> {
            if(m.getSender().getId() == senderId ){
                messageDTOs.add(prepareMessageForSender(m));
            }else{
                messageDTOs.add(mapToDTO(m));
            }
        });
        return messageDTOs;
    }

    public MessageDTO prepareMessageForSender(Message message){
        MessageDTO messageDTO = mapToDTO(message);
        List<MessageReceptionDTO> receptions = new ArrayList<MessageReceptionDTO>();
        message.getReceivers().forEach((mr) -> receptions.add(new MessageReceptionDTO(mr.getUser().getId(), mr.getSeenTime(), mr.getReceivedTime())));
        messageDTO.setDetails(new MessageDetailsDTO(receptions,message.isReceived(),message.isSeen()));
        return messageDTO;
    }

    public MessageDTO prepareMessageForUser(Message message, User user){
        MessageDTO messageDTO = mapToDTO(message);
        if(message.getSender() == user) {
            List<MessageReceptionDTO> receptions = new ArrayList<MessageReceptionDTO>();
            message.getReceivers().forEach((mr) -> receptions.add(new MessageReceptionDTO(mr.getUser().getId(), mr.getSeenTime(), mr.getReceivedTime())));
            messageDTO.setDetails(new MessageDetailsDTO(receptions, message.isReceived(), message.isSeen()));
        }
        return messageDTO;
    }
    
}