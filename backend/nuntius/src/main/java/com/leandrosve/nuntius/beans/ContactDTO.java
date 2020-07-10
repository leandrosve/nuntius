package com.leandrosve.nuntius.beans;

import javax.validation.constraints.NotNull;

public class ContactDTO {

    private Long id;
	private String username;
    private String alias;
    private String biograpgy;
	private String name;
	@NotNull(message = "{error}")
    private Long userId;


     
	public ContactDTO(Long id, String username, String alias, String biograpgy, String name, Long userId) {
		this.username = username;
		this.alias = alias;
		this.biograpgy = biograpgy;
		this.name = name;
        this.userId = userId;
        this.id= id;
        
    }
    
    public ContactDTO(){
        super();
    }

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getBiograpgy() {
		return biograpgy;
	}
	public void setBiograpgy(String biograpgy) {
		this.biograpgy = biograpgy;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    
}