package com.leandrosve.nuntius.exception.contact;

import com.leandrosve.nuntius.exception.CustomException;
import com.leandrosve.nuntius.util.LangUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

public class ContactNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Autowired
    LangUtil langUtil;

    @Override
    public String getMessage() {
        return "contact.notfound";
    }

    @Override
    public String getDetails() {
        return "The requested contact was not found in the system";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    
}