package com.aditya.journalApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // ✅ No path here
public class HealthController {

    @GetMapping("/health")  // ✅ Path goes here
    public ResponseEntity<String> healthCheck() {  // ✅ Non-static method, String response
        return ResponseEntity.ok("UP");
    }
}
