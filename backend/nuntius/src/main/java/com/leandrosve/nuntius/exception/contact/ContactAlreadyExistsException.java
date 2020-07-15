package com.leandrosve.nuntius.exception.contact;

import com.leandrosve.nuntius.exception.CustomException;

import org.springframework.http.HttpStatus;

public class ContactAlreadyExistsException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Override
    public String getMessage() {
      
        return "contact.exists";
    }

    @Override
    public String getDetails() {
        return "The contact already exists in the user contact list";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

    
}