package com.leandrosve.nuntius.exception;

public class NotFoundException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;
    
    public NotFoundException(String message){
        super(message);
    }

    public String getDetails(){
        return "Requested resource was not found";
    }
}