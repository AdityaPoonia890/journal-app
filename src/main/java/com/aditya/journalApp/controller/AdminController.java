package com.aditya.journalApp.controller;

import com.aditya.journalApp.cache.AppCache;
import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    AppCache appCache;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
       // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       // String userName = authentication.getName();
        List<User> list = userService.getAll();

        if (list != null || !list.isEmpty()) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        return new ResponseEntity<>("not found", HttpStatus.NO_CONTENT);
    }

    @PostMapping("create-admin")
    public  ResponseEntity<?> createAdmin(@RequestBody User user) {
        userService.saveAdminUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("clear-app-cache")
    public void clearAppCache() {
        appCache.init();
    }
}
