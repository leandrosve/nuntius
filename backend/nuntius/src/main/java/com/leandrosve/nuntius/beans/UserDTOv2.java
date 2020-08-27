package com.leandrosve.nuntius.beans;

public class UserDTOv2 extends UserDTO {

	private Long contactId;
	private String alias;

	public UserDTOv2() {
		super();
	}

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

}