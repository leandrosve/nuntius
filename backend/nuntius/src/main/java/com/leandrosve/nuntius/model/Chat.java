package com.leandrosve.nuntius.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private long id;

    @OneToMany(mappedBy = "chat", cascade = {CascadeType.ALL},orphanRemoval = true)
    private List<ChatMembership> memberships;

    @OneToMany(mappedBy = "chat", cascade = {CascadeType.ALL},orphanRemoval = true)
    private List<Message> messages;

    @Column(updatable = false, nullable = false)
    private Boolean groupal = false;

    private String title;

    private Date lastModifiedTime = new Date();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public Boolean getGroupal() {
        return groupal;
    }

    public void setGroupal(Boolean groupal) {
        this.groupal = groupal;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isUserMember(Long userId) {
        return getMemberships().stream().anyMatch(o -> o.getUser().getId() == userId);
    }

    public Chat(List<User> users, List<Message> messages, Boolean groupal, String title) {
        final List<ChatMembership> members = new ArrayList<ChatMembership>();
        users.forEach((u) -> members.add(new ChatMembership(u, this, new Date())));
        this.memberships = members;
        this.messages = messages;
        this.groupal = groupal;
        this.title = title;
    }

    public Chat() {
        super();
    }

    public Date getLastModifiedTime() {
        return lastModifiedTime;
    }

    public void setLastModifiedTime(Date lastModified) {
        this.lastModifiedTime = lastModified;
    }

    public Message getLastMessage() {
        if (messages != null && !messages.isEmpty()) {
            return messages.get(messages.size()-1);
        } else {
            return null;
        }
    }

    public List<ChatMembership> getMemberships() {
        return memberships;
    }

    public List<User> getMembers() {
        List<User> users = new ArrayList<User>();
        if (memberships != null) {
            memberships.forEach((m) -> users.add(m.getUser()));
        }
        return users;
    }

    public void setMemberships(List<ChatMembership> memberships) {
        this.memberships = memberships;
    }

    public ChatMembership getMembership(User user) {
        if (memberships != null) {
            for (ChatMembership member : memberships) {
                if (member.getUser() == user) {
                    return member;
                };
            }
        }
        return null;
    }

    public void addMember(User user) {
        ChatMembership member = new ChatMembership(user, this, new Date());
        this.memberships.add(member);
    }

    public boolean removeMember(User user) {
        for (ChatMembership member : memberships) {
            if (member.getUser() == user) {
                getMemberships().remove(member);
                return true;
            }
            ;
        }
        return false;
    }

}