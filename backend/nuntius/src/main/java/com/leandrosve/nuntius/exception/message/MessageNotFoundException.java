package com.leandrosve.nuntius.exception.message;

import com.leandrosve.nuntius.exception.CustomException;

import org.springframework.http.HttpStatus;

public class MessageNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "message.notfound";
    }

    @Override
    public String getDetails() {
        return "The required message was not found in the system";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    
}