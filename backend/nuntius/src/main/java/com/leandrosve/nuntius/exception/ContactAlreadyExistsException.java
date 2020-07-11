package com.leandrosve.nuntius.exception;

import com.leandrosve.nuntius.util.LangUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

public class ContactAlreadyExistsException extends CustomException {

    private static final long serialVersionUID = 1L;

    @Autowired
    LangUtil langUtil;

    @Override
    public String getMessage() {
        return langUtil.t("contact.exists");
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