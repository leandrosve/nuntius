package com.leandrosve.nuntius.exception;

import java.util.Date;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class NuntiusResponseEntityHandler extends ResponseEntityExceptionHandler {
 
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex,WebRequest request)  {
        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public final ResponseEntity<Object> handleUsernameAlreadyExistsException(DataIntegrityViolationException ex)  {
        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage().split(";")[0], ex.getCause().getMessage());
        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public final ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameNotFoundException ex)  {
        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getCause().getMessage(), ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }

    @Override
    protected  ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getBindingResult().getFieldError().getDefaultMessage(),ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }    
    
    @ExceptionHandler(BadCredentialsException.class)
    protected  ResponseEntity<Object> handleBadCredentials(BadCredentialsException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), "Username and password do not match", ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.UNAUTHORIZED);
    }
}