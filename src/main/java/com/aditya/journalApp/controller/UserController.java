package com.aditya.journalApp.controller;

import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.entity.Weather;
import com.aditya.journalApp.repository.UserRepoImpl;
import com.aditya.journalApp.service.UserService;
import com.aditya.journalApp.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    WeatherService weatherService;

    @Autowired
    UserRepoImpl userRepoImpl;

    /*@GetMapping("get-all")
    public List<User> getAllUser() {
        return userService.getAll();
    }*/



    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User userIndb = userService.findByUserName(userName);
        if (userIndb != null) {
            userIndb.setUserName(user.getUserName());
            userIndb.setPassword(user.getPassword());
            userService.saveNewUser(userIndb);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        return new ResponseEntity<>(userService.deleteByUserName(), HttpStatus.NO_CONTENT);
    }

    @GetMapping()
    public ResponseEntity<?> greet() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Weather body = weatherService.getWeather("Mumbai");
        String greeting =  " , todays weather feels like " + body.getCurrent().getFeelslike();
        return new ResponseEntity<>("hey " + authentication.getName() +greeting, HttpStatus.OK);

    }

    @GetMapping("/sentiment")
    public List<User> getusersForSentiment(){
        return userRepoImpl.getUsersForSA();
    }


}
