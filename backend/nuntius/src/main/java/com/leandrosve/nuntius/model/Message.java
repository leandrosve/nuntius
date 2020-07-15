package com.leandrosve.nuntius.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
    private Long id;
   
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID")
    @NotNull(message = "{user.notfound}")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CHAT_ID")
    @NotNull(message = "{chat.notfound}")
    private Chat chat;

    private String text;

    private Date sentTime = new Date();

    private Date receivedTime;

    private Date seenTime;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
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

    public void setSentTime(Date sendTime) {
        this.sentTime = sendTime;
    }

    public Date getReceivedTime() {
        return receivedTime;
    }

    public void setReceivedTime(Date receivedTime) {
        this.receivedTime = receivedTime;
    }

    public Date getSeenTime() {
        return seenTime;
    }

    public void setSeenTime(Date seenTime) {
        this.seenTime = seenTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Message(@NotNull(message = "{user.notfound}") User user, @NotNull(message = "{chat.notfound}") Chat chat,
            String text) {
        this.user = user;
        this.chat = chat;
        this.text = text;
    }

    public Message(){
        super();
    }
    
    
}