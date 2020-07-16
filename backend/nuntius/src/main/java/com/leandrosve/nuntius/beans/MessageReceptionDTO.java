package com.leandrosve.nuntius.beans;

import java.util.Date;

public class MessageReceptionDTO {

    private long userId;
    private Date seenTime;
    private Date receivedTime;

 

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getSeenTime() {
        return seenTime;
    }

    public void setSeenTime(Date seenTime) {
        this.seenTime = seenTime;
    }

    public Date getReceivedTime() {
        return receivedTime;
    }

    public void setReceivedTime(Date receivedTime) {
        this.receivedTime = receivedTime;
    }

    public MessageReceptionDTO(long userId, Date seenTime, Date receivedTime) {
        this.userId = userId;
        this.seenTime = seenTime;
        this.receivedTime = receivedTime;
    }

	public MessageReceptionDTO() {
        super();
	}

    
}