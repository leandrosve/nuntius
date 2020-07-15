package com.leandrosve.nuntius.util;

import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class LangUtil {

    @Autowired
    MessageSource messageSource;

    public String t(String message){
        final Locale locale =LocaleContextHolder.getLocale();
        String returnMessage= "";
        try{
            returnMessage = messageSource.getMessage(message, null, locale);  
        }catch(NoSuchMessageException e){
            returnMessage=message;
        }
        return returnMessage;
    }
   
}