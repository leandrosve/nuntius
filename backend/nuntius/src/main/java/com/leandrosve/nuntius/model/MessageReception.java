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


@Entity
public class MessageReception {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade={})
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="message_id", nullable=false)
    private Message message;

    private Date seenTime;

    private Date receivedTime;

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Date getSeenTime() {
        return seenTime;
    }

    public void setSeenTime(Date seenDate) {
        this.seenTime = seenDate;
    }

    public Date getReceivedTime() {
        return receivedTime;
    }

    public void setReceivedTime(Date receivedDate) {
        this.receivedTime = receivedDate;
    }

    public MessageReception(User user, Message message, Date seenDate, Date receivedDate) {
        this.user = user;
        this.message = message;
        this.seenTime = seenDate;
        this.receivedTime = receivedDate;
    }

    public MessageReception() {
        super();
    }
    
}