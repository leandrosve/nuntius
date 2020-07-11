package com.leandrosve.nuntius.exception;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import com.leandrosve.nuntius.util.LangUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
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
    
    @Autowired
    LangUtil langUtil;

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex,WebRequest request)  {
        final HttpStatus status= HttpStatus.INTERNAL_SERVER_ERROR;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(),ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public final ResponseEntity<Object> handleAllExceptions(AccessDeniedException ex)  {
        final HttpStatus status= HttpStatus.FORBIDDEN;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(), ex.getMessage(), "Te requested resource is not yours");

        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public final ResponseEntity<Object> handleUsernameAlreadyExistsException(DataIntegrityViolationException ex)  {
        final HttpStatus status= HttpStatus.BAD_REQUEST;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(),ex.getMessage().split(";")[0], ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<Object> handleBadRequestException(BadRequestException ex)  {
        final HttpStatus status= HttpStatus.BAD_REQUEST;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(), ex.getMessage(), ex.getDetails());
        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    @ExceptionHandler(CustomException.class)
    public final ResponseEntity<Object> handleCustomException(CustomException ex)  {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getHttpStatus().value(), ex.getMessage(), ex.getDetails());
        return new ResponseEntity<Object>(exceptionResponse,ex.getHttpStatus());
    }

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<Object> handleNotFoundException(NotFoundException ex)  {
        final HttpStatus status= HttpStatus.NOT_FOUND;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(), ex.getMessage(), ex.getDetails());
        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    
    @ExceptionHandler(ConstraintViolationException.class)
    public final ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex)  {
        final HttpStatus status= HttpStatus.BAD_REQUEST;
        String message = "";
        for(ConstraintViolation<?> constraintsViolations: ex.getConstraintViolations()) {
            message=constraintsViolations.getMessage();
            break;
        }
        String[] parsedMessage= message.split("[\\{\\}]");
        if (parsedMessage.length == 2){message=langUtil.t(parsedMessage[1]);};
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(),message , ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public final ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameNotFoundException ex)  {
        final HttpStatus status= HttpStatus.BAD_REQUEST;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(),ex.getMessage(), ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,status);
    }

    @Override
    protected  ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(),ex.getBindingResult().getFieldError().getDefaultMessage(),ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,status);
    } 
    
    @ExceptionHandler(BadCredentialsException.class)
    protected  ResponseEntity<Object> handleBadCredentials(BadCredentialsException ex) {
        final HttpStatus status= HttpStatus.UNAUTHORIZED;
        ExceptionResponse exceptionResponse = new ExceptionResponse(status.value(),langUtil.t("login.failed"), ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.UNAUTHORIZED);
    }
}