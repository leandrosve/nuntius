package com.leandrosve.nuntius.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "SENDER_ID")
    @NotNull(message = "{user.notfound}")
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CHAT_ID")
    @NotNull(message = "{chat.notfound}")
    private Chat chat;

    @OneToMany(mappedBy= "message", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<MessageReception> receivers;

    private String text;

    private Date sentTime = new Date();

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

    public Long getId() {
        return id;
    }

    public Message(@NotNull(message = "{user.notfound}") User sender, @NotNull(message = "{chat.notfound}") Chat chat,
            String text) {
        this.sender = sender;
        this.chat = chat;
        this.text = text;
    }

    public Message() {
        super();
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public List<MessageReception> getReceivers() {
        return receivers;
    }

    public void setReceivers(List<MessageReception> receivers) {
        this.receivers = receivers;
    }

    public void setReceiverUsers(List<User> users) {
        List<MessageReception> receivers = new ArrayList<MessageReception>();
        users.forEach((u)->receivers.add(new MessageReception(u, this, null, null)));
        this.receivers = receivers;
    }

    public boolean isReceived(){
        for(MessageReception r: receivers){
            if(r.getReceivedTime() == null){
                return false;
            }
        }
        return true;
    }

    public boolean isSeen(){
        for(MessageReception r: receivers){
            if(r.getSeenTime() == null){
                return false;
            }
        }
        return true;
    }

    

}