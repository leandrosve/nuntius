package com.leandrosve.nuntius.beans;

import java.util.Date;

public class MessageDTO {

    private long id;
    private long userId;
    private long chatId;
    private String text;
    private Date sentTime;
    private MessageDetailsDTO details;
 


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getSentTime() {
        return sentTime;
    }

    public void setSentTime(Date sentTime) {
        this.sentTime = sentTime;
    }
    
    public long getChatId() {
        return chatId;
    }

    public void setChatId(long chatId) {
        this.chatId = chatId;
    }


    public MessageDTO(long id, long userId, long chatId, String text, Date sentTime) {
        super();
        this.id = id;
        this.userId = userId;
        this.chatId = chatId;
        this.text = text;
        this.sentTime = sentTime;
    }

    public MessageDTO() {
        super();
    }

   
    public MessageDetailsDTO getDetails() {
        return details;
    }

    public void setDetails(MessageDetailsDTO details) {
        this.details = details;
    }




}