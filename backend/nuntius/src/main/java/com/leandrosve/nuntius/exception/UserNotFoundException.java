package com.leandrosve.nuntius.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "user.notfound";
    }

    @Override
    public String getDetails() {
        return "The required user was not found in the system";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    
}