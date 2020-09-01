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
import com.leandrosve.nuntius.service.ChatService;
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
    private String groupImagesDirectory =  System.getProperty("user.dir").concat("/uploads/group_images/");

    private AuthUtil authUtil;

    @Autowired
    private ChatService chatService;

    private Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    public ImageController(AuthUtil authUtil) {
        this.authUtil = authUtil;
    }

    @RequestMapping(value = "/users/{userId}/avatar", method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable @Valid long userId) throws IOException {
        Path imagePath =  Paths.get(profileImagesDirectory+userId+".png");
        byte[] image = retrieveImage(imagePath);
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.maxAge(5, TimeUnit.SECONDS))
                .contentType(MediaType.IMAGE_PNG)
                .body(image);
    }

    @RequestMapping(value = "/group/{chatId}/avatar", method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getGroupImage(@PathVariable @Valid long chatId) throws IOException {
        chatService.getChat(chatId); //throws AccessDeniedException
        Path imagePath =  Paths.get(groupImagesDirectory+chatId+".png");
        byte[] image = retrieveImage(imagePath);
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.maxAge(5, TimeUnit.SECONDS))
                .contentType(MediaType.IMAGE_PNG)
                .body(image);
    }


    @PutMapping(value="/profile/avatar", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> storeImage(@RequestBody String avatar) throws IOException {
        final User currentUser = authUtil.getCurrentUser();
        Path fileNameAndPath = Paths.get(profileImagesDirectory + currentUser.getId()+".png");
        byte[] image = saveImage(avatar, fileNameAndPath);
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.maxAge(5, TimeUnit.SECONDS))
                .contentType(MediaType.IMAGE_PNG)
                .body(image);
    }

    @PutMapping(value="/group/{chatId}/avatar", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<?> storeGroupAvatar(@RequestBody String avatar, @PathVariable @Valid Long chatId) throws IOException {
        chatService.getChat(chatId);

        Path fileNameAndPath = Paths.get(groupImagesDirectory + chatId +".png");

        saveImage(avatar, fileNameAndPath);

        return new ResponseEntity(HttpStatus.OK);
    }

    private byte[] saveImage(String imageString, Path fileNameAndPath) throws IOException {
        final User currentUser = authUtil.getCurrentUser();
        String encodedImg = imageString.split(",")[1];
        logger.debug(encodedImg);
        byte[] image = Base64.getMimeDecoder().decode(encodedImg);
        try {
            Files.write(fileNameAndPath, image);
        }catch(NoSuchFileException e){
            throw new BadRequestException("Unable to upload the image");
        }
        return image;
    }
    private byte[] retrieveImage (Path fileNameAndPath) throws IOException {
        byte[] bytes;
        try {
            bytes = Files.readAllBytes(fileNameAndPath);
        }catch (Exception e){
            throw new NotFoundException("Profile image not found");
        }
        return bytes;
    }
}