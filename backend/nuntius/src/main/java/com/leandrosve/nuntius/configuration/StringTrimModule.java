package com.leandrosve.nuntius.configuration;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdScalarDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;

import org.springframework.stereotype.Component;

@Component
public class StringTrimModule extends SimpleModule {

    private static final long serialVersionUID = 1L;

    public StringTrimModule() {
        addDeserializer(String.class, new StdScalarDeserializer<String>(String.class) {

            private static final long serialVersionUID = 1L;
            
            @Override
            public String deserialize(JsonParser jsonParser, DeserializationContext ctx) throws IOException,
                    JsonProcessingException {
                return jsonParser.getValueAsString().trim();
            }
        });
    }
}