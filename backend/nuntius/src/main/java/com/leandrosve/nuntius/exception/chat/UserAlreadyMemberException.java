package com.leandrosve.nuntius.exception.chat;

import com.leandrosve.nuntius.exception.CustomException;

import org.springframework.http.HttpStatus;

public class UserAlreadyMemberException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "chat.user.alreadymember";
    }

    @Override
    public String getDetails() {
        return "User is already a member of the given chat.";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    
}