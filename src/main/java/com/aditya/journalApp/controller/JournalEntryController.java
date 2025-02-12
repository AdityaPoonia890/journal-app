package com.aditya.journalApp.controller;

import com.aditya.journalApp.entity.JournalEntry;
import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.service.JournalEntryService;
import com.aditya.journalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/journal")
public class JournalEntryController {

    @Autowired
    JournalEntryService journalEntryService;
    @Autowired
    UserService userService;

  /*
     @GetMapping
    public ResponseEntity<?> getAll() {
      return new ResponseEntity<>(journalEntryService.getAll(), HttpStatus.OK);
   }
   */

    @GetMapping()
    public ResponseEntity<?> getAllJournalEntriesOfUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User user = userService.findByUserName(userName);
        List all = user.getJournalEntries();
        if (all != null && !all.isEmpty()) {
            return new ResponseEntity<>(all , HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("id/{myId}")
    public ResponseEntity<?> getJournalEntryById(@PathVariable ObjectId myId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User user = userService.findByUserName(userName);
        List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(myId)).collect(Collectors.toList());

        if (!collect.isEmpty()) {
            return new ResponseEntity<>(journalEntryService.findById(myId), HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

  /*  @PostMapping("/test")
    public String testEndpoint(@RequestBody String payload) {
        System.out.println("Received Payload: " + payload);
        return "Payload received.";
    }*/

    @PostMapping
    public JournalEntry createEntry(@RequestBody JournalEntry myEntry ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        System.out.println("Received Journal Entry: " + myEntry);

       if (myEntry.getDate() == null) {
            myEntry.setDate(LocalDateTime.now()); // Set current date if none provided
        }
        journalEntryService.saveEntry(myEntry, userName);
        return myEntry;
    }



   @PutMapping("/id/{id}")
    public ResponseEntity<?> updateJournalById(@PathVariable ObjectId id, @RequestBody JournalEntry newEntry) {

       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String userName = authentication.getName();

       User user = userService.findByUserName(userName);
       List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(id)).collect(Collectors.toList());

       if (!collect.isEmpty()) {
           Optional<JournalEntry> journalEntry = journalEntryService.findById(id);

           if (journalEntry.isPresent()) {

               JournalEntry oldEntry = journalEntry.get();

               oldEntry.setContent(newEntry.getContent() != null && !newEntry.getContent().equals("") ? newEntry.getContent() : oldEntry.getContent());
               oldEntry.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().equals("") ? newEntry.getTitle() : oldEntry.getTitle());

               journalEntryService.saveEntry(oldEntry, userName);
               return new ResponseEntity<>(oldEntry, HttpStatus.OK);
           }

       }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @DeleteMapping("id/{myId}")
    public ResponseEntity<?> deleteJournalEntryById(@PathVariable ObjectId myId) throws Exception {
        journalEntryService.deleteById(myId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
