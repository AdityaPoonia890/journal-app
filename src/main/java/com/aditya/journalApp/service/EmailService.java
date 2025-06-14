package com.aditya.journalApp.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

//    @Autowired
//    JavaMailSender javaMailSender;

    public void sendMail(String to, String subject, String body) {

        try{
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(to);
            mail.setText(body);
            mail.setSubject(subject);

        } catch (Exception e) {
            log.error("error while sending mail," ,e);
        }


    }
}
