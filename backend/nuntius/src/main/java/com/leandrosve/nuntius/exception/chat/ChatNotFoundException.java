package com.leandrosve.nuntius.exception.chat;

import com.leandrosve.nuntius.exception.CustomException;

import org.springframework.http.HttpStatus;

public class ChatNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "chat.notfound";
    }

    @Override
    public String getDetails() {
        return "The required chat data was not found in the system";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    
}