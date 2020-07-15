package com.leandrosve.nuntius.exception;

import org.springframework.http.HttpStatus;

public class AccessDeniedException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "access.denied";
    }

    @Override
    public String getDetails() {
        return "You don't have permission to access the requested resource";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }

    
}