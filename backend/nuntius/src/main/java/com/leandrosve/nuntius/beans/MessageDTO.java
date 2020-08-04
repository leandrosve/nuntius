package com.leandrosve.nuntius.beans;

import java.util.Date;

public class MessageDTO {

    private long id;
    private long userId;
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

    

    public MessageDTO(long id, long userId, String text, Date sentTime) {
        this.id = id;
        this.userId = userId;
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