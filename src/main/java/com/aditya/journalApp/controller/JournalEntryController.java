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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Base64;

@RestController
@RequestMapping("/journal")
@CrossOrigin
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
        List<JournalEntry> all = user.getJournalEntries();
        if (all != null && !all.isEmpty()) {
            // Convert the byte[] image data to a Base64 string for each journal entry
            for (JournalEntry journalEntry : all) {
                if (journalEntry.getImageData() != null) {
                    // Convert byte[] to Base64 String
                    String base64Image = Base64.getEncoder().encodeToString(journalEntry.getImageData());
                    journalEntry.setBase64Image(base64Image); // Assuming you added a setter for base64Image in JournalEntry
                }
            }
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/id/{myId}")
    public ResponseEntity<?> getJournalEntryById(@PathVariable Integer myId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User user = userService.findByUserName(userName);
        List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(myId)).collect(Collectors.toList());

        if (!collect.isEmpty()) {

            if (collect.get(0).getImageData() != null) {
                // Convert byte[] to Base64 String
                String base64Image = Base64.getEncoder().encodeToString(collect.get(0).getImageData());
                collect.get(0).setBase64Image(base64Image); // Assuming you added a setter for base64Image in JournalEntry
            }
             return new ResponseEntity<>(collect.get(0), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

  /*  @PostMapping("/test")
    public String testEndpoint(@RequestBody String payload) {
        System.out.println("Received Payload: " + payload);
        return "Payload received.";
    }*/

    @PostMapping
    public JournalEntry createEntry(    @RequestPart("title") String title,
                                        @RequestPart("content") String content,
                                        @RequestPart("image") MultipartFile image ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        System.out.println("Received Journal Entry: " + title + "," + content + "," + image);

        try {
            // Convert the image file to byte[]
            byte[] imageData = image.getBytes();

            // Create the journal entry
            JournalEntry myEntry = new JournalEntry();
            myEntry.setTitle(title);
            myEntry.setContent(content);
            myEntry.setImageData(imageData);   // Set the image data as byte[]
            myEntry.setDate(LocalDateTime.now());  // Set current date if none provided

            // Save the entry (service logic)
            journalEntryService.saveEntry(myEntry, userName);

            return myEntry;
        } catch (Exception e) {
            e.printStackTrace();
            return null;  // Handle exception as needed
        }
    }



   @PutMapping("/id/{id}")
    public ResponseEntity<?> updateJournalById(@PathVariable Integer id, @RequestBody JournalEntry newEntry) {

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

               journalEntryService.saveEntry(oldEntry);
               System.out.println(oldEntry);
               return new ResponseEntity<>(oldEntry, HttpStatus.OK);
           }

       }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @DeleteMapping("id/{myId}")
    public ResponseEntity<?> deleteJournalEntryById(@PathVariable Integer myId) throws Exception {
        journalEntryService.deleteById(myId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
