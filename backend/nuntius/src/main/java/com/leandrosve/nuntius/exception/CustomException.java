package com.leandrosve.nuntius.exception;

import org.springframework.http.HttpStatus;

public abstract class CustomException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public abstract String getMessage();

    public abstract String getDetails();

    public abstract HttpStatus getHttpStatus();
    
}