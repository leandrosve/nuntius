package com.leandrosve.nuntius.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.leandrosve.nuntius.beans.ChatDTO;
import com.leandrosve.nuntius.exception.AccessDeniedException;
import com.leandrosve.nuntius.exception.UserNotFoundException;
import com.leandrosve.nuntius.exception.chat.ChatNotFoundException;
import com.leandrosve.nuntius.exception.chat.UserAlreadyMemberException;
import com.leandrosve.nuntius.model.Chat;
import com.leandrosve.nuntius.model.Message;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IChatRepository;
import com.leandrosve.nuntius.repository.IUserRepository;
import com.leandrosve.nuntius.util.AuthUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private IUserRepository userRepository;
    private AuthUtil authUtil;
    private IChatRepository chatV2Repository;
    private MessageService messageService;
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatService(IUserRepository userRepository, AuthUtil authUtil, IChatRepository chatV2Repository, MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.authUtil = authUtil;
        this.chatV2Repository = chatV2Repository;
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    public ChatDTO createChat(ChatDTO chatDTO) {
        final User currentUser = authUtil.getCurrentUser();
        Set<Long> userIds = new HashSet<Long>();
        userIds.add(currentUser.getId());
        if (chatDTO.getUserIds() != null) {
            userIds.addAll(chatDTO.getUserIds());
        }
        List<User> users = userRepository.findByUserIds(userIds);

        Chat chat = new Chat(users, null, chatDTO.getGroupal(), chatDTO.getTitle());
        return prepareChatForUser(chatV2Repository.save(chat), currentUser);
    }


    public ChatDTO addMember(long chatId, long userId) {
        final Chat chat = retrieveChat(chatId);
        if(chat.isUserMember(userId)){throw new UserAlreadyMemberException();};
        final User user = userRepository.findById(userId).orElseThrow( () -> new UserNotFoundException());
        chat.addMember(user);
        chatV2Repository.save(chat);
        return mapToDTO(chat);
    }

    public List<ChatDTO> getChats() {
        final User currentUser = authUtil.getCurrentUser();
        List<ChatDTO> chatDTOs = new ArrayList<ChatDTO>();
        final Set<Chat> chats= currentUser.getChats();
        chats.forEach((c) -> chatDTOs.add(prepareChatForUser(c, currentUser)));
        return chatDTOs;
    }

    public ChatDTO getChat(Long id) {
        final User currentUser = authUtil.getCurrentUser();
        Chat chat = retrieveChat(id);
        return prepareChatForUser(chat, currentUser);
    }

    public ChatDTO deleteChat(Long id) {
        Chat chat = chatV2Repository.findById(id).orElseThrow(() -> new ChatNotFoundException());
        final User currentUser = authUtil.getCurrentUser();
        if (!chat.isUserMember(currentUser.getId())) {
            throw new AccessDeniedException();
        }
        chatV2Repository.delete(chat);
        ChatDTO chatDTO = mapToDTO(chat);
        chat.getMembers().forEach( user ->{
            if(user != currentUser){
                messagingTemplate.convertAndSendToUser(user.getUsername(), "/queue/chats/delete", chatDTO);
            }
        });
        return chatDTO;
    }


    private ChatDTO mapToDTO(Chat chat) {
        List<Long> usersIds = new ArrayList<Long>();
        chat.getMemberships().forEach(u -> {
            usersIds.add(u.getUser().getId());
        });
        ChatDTO chatDTO = new ChatDTO(chat.getId(), usersIds, chat.getGroupal(), chat.getTitle());
        return chatDTO;
    }

    private ChatDTO prepareChatForUser(Chat chat, User user){
        ChatDTO chatDTO = mapToDTO(chat);
        Message lastMessage = chat.getLastMessage();
        if(lastMessage != null){
            chatDTO.setLastMessage(messageService.prepareMessageForUser(lastMessage, user));
        }
        return chatDTO;
    }


    private Chat retrieveChat(Long id) throws AccessDeniedException, ChatNotFoundException{
        Chat chat = chatV2Repository.findById(id).orElseThrow(() -> new ChatNotFoundException());
        final User currentUser = authUtil.getCurrentUser();
        if (!chat.isUserMember(currentUser.getId())) {
            throw new AccessDeniedException();
        }
        return chat;
    }
}