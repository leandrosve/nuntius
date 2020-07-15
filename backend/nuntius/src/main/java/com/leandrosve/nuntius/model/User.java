package com.leandrosve.nuntius.model;

import java.util.Collection;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class User implements UserDetails {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
    private long id;

    @NotBlank
    @Size(min=3, message="{username.short}")
    @Pattern(regexp = "^\\S+$", message="{username.nospaces}")
    @Column(unique = true)
    private String username;
  
    @NotBlank(message="{email.notempty}")
    @Email(message="{email.notvalid}")
    @Column(unique=true)
    private String email;

    @NotBlank(message="{name.notempty}")
    private String name;

    @Size(max=128, message="{biography.toolong}")
    private String biography;
   
    @NotBlank(message="{password.insecure}")
    @Size(min=3, message="{password.insecure}")
    @JsonProperty(access = Access.WRITE_ONLY)
    @Pattern(regexp ="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", message="{password.insecure}")
    private String password;

    @OneToMany(mappedBy="owner")
    private Set<Contact> contacts;
    
    
    @ManyToMany(mappedBy="users", cascade = CascadeType.ALL,  fetch = FetchType.EAGER)
    private Set<Chat> chats;

    public String getUsername() {
        
        return username;
    }
  
    public void setUsername(String username){
        this.username = username;
    }

 
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<Chat> getChats() {
        return chats;
    }

    public void setChats(Set<Chat> chats) {
        this.chats = chats;
    }
   
}