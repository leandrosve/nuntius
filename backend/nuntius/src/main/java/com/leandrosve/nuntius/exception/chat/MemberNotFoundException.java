package com.leandrosve.nuntius.exception.chat;

import com.leandrosve.nuntius.exception.CustomException;

import org.springframework.http.HttpStatus;

public class MemberNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "member.notfound";
    }

    @Override
    public String getDetails() {
        return "The required user is not a member of the given chat";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    
}