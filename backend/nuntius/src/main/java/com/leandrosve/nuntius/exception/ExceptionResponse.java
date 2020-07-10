package com.leandrosve.nuntius.exception;

import java.util.Date;

public class ExceptionResponse {
    private Date timestamp;
    private Integer status;
    private String message;
    private String details;

    public Integer getStatus(){
        return status;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

    public ExceptionResponse(Integer status, String message, String details) {
        this.timestamp = new Date();
        this.message = message;
        this.details = details;
        this.status = status;
    }
    
}