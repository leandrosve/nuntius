package com.leandrosve.nuntius.model;

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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;


@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
    private long id;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL })
    @JoinTable(
	        name = "chat_user", 
	        joinColumns = { @JoinColumn(name = "chat_id") }, 
	        inverseJoinColumns = { @JoinColumn(name = "user_id") }
        )
    private List<User> users;

    @OneToMany(mappedBy="chat")
    private List<Message> messages;

    @Column(updatable = false, nullable = false)
    private Boolean groupal = false;

    private String title;

  
    private Date lastModified=new Date(); 

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
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

    public boolean isUserMember(Long userId){
        return users.stream().anyMatch(o -> o.getId() == userId);
    }

    public Chat(List<User> users, List<Message> messages, Boolean groupal, String title) {
        this.users = users;
        this.messages = messages;
        this.groupal = groupal;
        this.title = title;
    }

    public Chat() {
        super();
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public Message getLastMessage(){
        if(messages != null && !messages.isEmpty()){
            return messages.get(0);
        }else{
            return null;
        }
    }
    
}