package com.leandrosve.nuntius.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class ChatMembership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable=false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable=false)
    private Chat chat;

    private Date joinedTime;

    private Date lastFetchTime = new Date();

    public Long getId() {
        return id;
    }

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

    public Date getJoinedTime() {
        return joinedTime;
    }

    public void setJoinedTime(Date joinedTime) {
        this.joinedTime = joinedTime;
    }

    public Date getLastFetchTime() {
        return lastFetchTime;
    }

    public void setLastFetchTime(Date lastFetchDate) {
        this.lastFetchTime = lastFetchDate;
    }

    public ChatMembership() {
        super();
    }

    public ChatMembership(User user, Chat chat, Date joinedTime) {
        this.user = user;
        this.chat = chat;
        this.joinedTime = joinedTime;
    }

    
}