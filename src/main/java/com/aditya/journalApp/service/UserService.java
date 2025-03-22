package com.aditya.journalApp.service;

import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.repository.UserRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    static final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    UserRepo userRepo;

    public void saveNewUser(User user) {

        //PasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setId(sequenceGeneratorService.getNextSequence("users"));
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER"));
        userRepo.save(user);
    }

    public void saveUser(User user) {
        userRepo.save(user);
    }

    public void saveAdminUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("User","ADMIN"));
        userRepo.save(user);
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    public User findByUserName(String userName) {
        return userRepo.findByUserName(userName);//.orElse(null);
    }

    public void deleteById(Integer id) {
        User entry = userRepo.findById(id).orElse(null);
        userRepo.delete(entry);

        /*journalEntryRepo.deleteById(id);
         * */
    }

    public String deleteByUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();



        userRepo.deleteByUserName(userName);
        return "Deleted User";

    }

}
