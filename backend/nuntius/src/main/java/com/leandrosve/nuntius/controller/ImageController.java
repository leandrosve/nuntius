package com.leandrosve.nuntius.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.core.io.ClassPathResource;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {

    @RequestMapping(value = "/users/{userId}/image", method = RequestMethod.GET
            )
    public ResponseEntity<byte[]> getImage(@PathVariable @Valid long userId) throws IOException {

        ClassPathResource imgFile = new ClassPathResource("static/profile_images/"+userId+".png");
        byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }
}