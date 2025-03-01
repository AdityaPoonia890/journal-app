package com.aditya.journalApp.controller;

import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.service.UserDetailsServiceImpl;
import com.aditya.journalApp.service.UserService;
import com.aditya.journalApp.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/public")
@CrossOrigin("*")
public class PublicController {

    private static final Logger log = LoggerFactory.getLogger(PublicController.class);
    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signup") //create-user
    public void createUser(@RequestBody User user) {
        userService.saveNewUser(user);
    }

    @PostMapping("/login") //login
    public ResponseEntity<String> loginUser(@RequestBody User user) {

        try{
            System.out.println("User entered password: " + user.getPassword()); // Print entered password

            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUserName());
            System.out.println("Stored password: " + userDetails.getPassword()); // Print stored password

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));


            String jwt = jwtUtils.generateToken(userDetails.getUsername());

            return new ResponseEntity<>(jwt, HttpStatus.OK);

        }
        catch (Exception e){
            log.error("error while logging in :" + e);
            return new ResponseEntity<>("error"+e, HttpStatus.BAD_REQUEST);
        }
    }
}
