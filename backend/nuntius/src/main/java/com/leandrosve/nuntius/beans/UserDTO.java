package com.leandrosve.nuntius.beans;

import javax.validation.constraints.NotNull;

public class UserDTO {

    private Long id;
	private String username;
    private String biograpgy;
	private String name;
	


     
	public UserDTO(Long id, String username, String biograpgy, String name) {
		this.username = username;
		this.biograpgy = biograpgy;
		this.name = name;
        this.id= id;
        
    }
    
    public UserDTO(){
        super();
    }

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    
}