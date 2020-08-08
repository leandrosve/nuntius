package com.leandrosve.nuntius.beans;

import java.util.List;

public class ChatDTO {
    private long id;
    private List<Long> userIds;
    private boolean groupal = true;
    private String title;
    private MessageDTO lastMessage;

    public List<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }

    public boolean getGroupal() {
        return groupal;
    }

    public void setGroupal(boolean groupal) {
        this.groupal = groupal;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ChatDTO(long id,List<Long> userIds, boolean groupal, String title) {
        this.id = id;
        this.userIds = userIds;
        this.groupal = groupal;
        this.title = title;
    }

    public ChatDTO() {
        super();
    }


    public long getId() {
        return id;
    }

    public MessageDTO getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(MessageDTO lastMessage) {
        this.lastMessage = lastMessage;
    }

    
}