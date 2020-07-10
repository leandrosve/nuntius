package com.leandrosve.nuntius.exception;

public class BadRequestException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;
    
    public BadRequestException(String message){
        super(message);
    }

    public String getDetails(){
        return "Argument not valid: encountered a business rule violation.";
    }
}