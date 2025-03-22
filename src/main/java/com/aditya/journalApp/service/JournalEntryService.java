package com.aditya.journalApp.service;

import com.aditya.journalApp.entity.JournalEntry;
import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.repository.JournalEntryRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class JournalEntryService {

    @Autowired
    JournalEntryRepo journalEntryRepo;
    @Autowired
    UserService userService;
    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    @Transactional
    public void saveEntry(JournalEntry myEntry, String userName) {
        try{
           myEntry.setId(sequenceGeneratorService.getNextSequence("journal_entries"));

            User user = userService.findByUserName(userName);
            JournalEntry savedEntry = journalEntryRepo.save(myEntry);
            // user.setUserName(null);
            user.getJournalEntries().add(savedEntry);
            userService.saveUser(user);
        } catch(Exception e) {
            System.out.println(e);
            throw new RuntimeException("an error while saving the user" ,e);
        }

    }

    public void saveEntry(JournalEntry updatedEntry) {

        journalEntryRepo.save(updatedEntry);
    }

    public List<JournalEntry> getAll() {
        return journalEntryRepo.findAll();
    }

    public Optional<JournalEntry> findById(Integer id) {
        return journalEntryRepo.findById(id);
    }

    @Transactional
    public void deleteById(Integer id) throws Exception {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userName = authentication.getName();

            User user = userService.findByUserName(userName);
            boolean removed = user.getJournalEntries().removeIf(x -> x.getId().equals(id));

            if (removed) {
                JournalEntry entry = journalEntryRepo.findById(id).orElse(null);
                journalEntryRepo.delete(entry);
                userService.saveUser(user);
            }


        } catch (Exception e) {
            throw new Exception("Exception while deleting journal Entry " + e);
        }


        /*journalEntryRepo.deleteById(id);
        * */
    }

}
