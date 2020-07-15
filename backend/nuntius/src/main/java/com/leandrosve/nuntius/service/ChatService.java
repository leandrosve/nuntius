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
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    AuthUtil authUtil;

    @Autowired
    IChatRepository chatRepository;

    @Autowired
    MessageService messageService;

    public ChatDTO createChat(ChatDTO chatDTO) {
        final User currentUser = authUtil.getCurrentUser();
        Set<Long> userIds = new HashSet<Long>();
        userIds.add(currentUser.getId());
        if (chatDTO.getUserIds() != null) {
            userIds.addAll(chatDTO.getUserIds());
        }
        List<User> users = userRepository.findByUserIds(userIds);
        Chat chat = new Chat(users, null, true, chatDTO.getTitle());
        return mapToDTO(chatRepository.save(chat));
    }

    public ChatDTO addMember(long chatId, long userId) {
        final Chat chat = retrieveChat(chatId);
        if(chat.isUserMember(userId)){throw new UserAlreadyMemberException();};
        final User user = userRepository.findById(userId).orElseThrow( () -> new UserNotFoundException());
        chat.getUsers().add(user);
        chatRepository.save(chat);
        return mapToDTO(chat);
    }

    public List<ChatDTO> getChats() {
        final Set<Chat> chats = authUtil.getCurrentUser().getChats();
        List<ChatDTO> chatDTOs = new ArrayList<ChatDTO>();
        chats.forEach(c -> chatDTOs.add(mapToDTO(c)));
        return chatDTOs;
    }

    public ChatDTO getChat(Long id) {
        Chat chat = retrieveChat(id);
        return mapToDTO(chat);
    }

    public ChatDTO deleteChat(Long id) {
        Chat chat = chatRepository.findById(id).orElseThrow(() -> new ChatNotFoundException());
        final User currentUser = authUtil.getCurrentUser();
        if (!chat.isUserMember(currentUser.getId())) {
            throw new AccessDeniedException();
        }
        chat.getUsers().remove(currentUser);
        if(chat.getUsers().isEmpty()){
            chatRepository.delete(chat);
            return null;
        }
        chatRepository.save(chat);
        return mapToDTO(chat);
    }

    private ChatDTO mapToDTO(Chat chat) {
        List<Long> usersIds = new ArrayList<Long>();
        chat.getUsers().forEach(u -> {
            usersIds.add(u.getId());
        });
        ChatDTO chatDTO = new ChatDTO(chat.getId(), usersIds, chat.getGroupal(), chat.getTitle());
        final Message lastMessage = chat.getLastMessage();
        if (lastMessage != null) {
            chatDTO.setLastMessage(messageService.mapToDTO(lastMessage));
        }
        return chatDTO;
    }


    private Chat retrieveChat(Long id) throws AccessDeniedException, ChatNotFoundException{
        Chat chat = chatRepository.findById(id).orElseThrow(() -> new ChatNotFoundException());
        final User currentUser = authUtil.getCurrentUser();
        if (!chat.isUserMember(currentUser.getId())) {
            throw new AccessDeniedException();
        }
        return chat;
    }
}