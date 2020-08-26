package com.leandrosve.nuntius.controller;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

import javax.validation.Valid;

import com.leandrosve.nuntius.exception.BadRequestException;
import com.leandrosve.nuntius.exception.NotFoundException;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.util.AuthUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;

import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageController {

    private String profileImagesDirectory =  System.getProperty("user.dir").concat("/uploads/profile_images/");

    private AuthUtil authUtil;


    private Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    public ImageController(AuthUtil authUtil) {
        this.authUtil = authUtil;
    }

    @RequestMapping(value = "/users/{userId}/image", method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)

    public ResponseEntity<byte[]> getImage(@PathVariable @Valid long userId) throws IOException {
        Path imgFile =  Paths.get(profileImagesDirectory+userId+".png");
        byte[] bytes;
        try {
            bytes = Files.readAllBytes(imgFile);
        }catch (Exception e){
            throw new NotFoundException("Profile image not found");
        }
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.maxAge(5, TimeUnit.SECONDS))
                .contentType(MediaType.IMAGE_PNG)
                .body(bytes);
    }

    @PutMapping("/profile/avatar")
    public ResponseEntity<?> storeImage(@RequestBody String avatar) throws IOException {
        final User currentUser = authUtil.getCurrentUser();
        String encodedImg = avatar.split(",")[1];
        logger.debug(encodedImg);
        byte[] image = Base64.getMimeDecoder().decode(encodedImg);
        Path fileNameAndPath = Paths.get(profileImagesDirectory + currentUser.getId()+".png");
        try {
            Files.write(fileNameAndPath, image);
        }catch(NoSuchFileException e){
            throw new BadRequestException("Unable to upload the image");
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}