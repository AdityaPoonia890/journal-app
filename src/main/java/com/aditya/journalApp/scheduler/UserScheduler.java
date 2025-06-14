/*package com.aditya.journalApp.scheduler;

import com.aditya.journalApp.cache.AppCache;
import com.aditya.journalApp.entity.JournalEntry;
import com.aditya.journalApp.entity.User;
import com.aditya.journalApp.enums.Sentiment;
import com.aditya.journalApp.repository.UserRepoImpl;
import com.aditya.journalApp.service.EmailService;
import com.aditya.journalApp.service.SentimentAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class UserScheduler {

    @Autowired
    UserRepoImpl userRepo;
    @Autowired
    SentimentAnalysisService sentimentAnalysisService;
    @Autowired
    EmailService email;
    @Autowired
    AppCache appCache;
//    @Autowired
//    Sentiment sentiment;

    @Scheduled( cron = "0 0 10 * * SUN")
    public void fetchUsersAndSendSaMail() {
        List<User> users = userRepo.getUsersForSA();
        for (User user: users) {
            List<JournalEntry> journalEntries = user.getJournalEntries();
            List<String> sentiments = journalEntries.stream().filter(x -> x.getDate().isAfter(LocalDateTime.now().minus(7, ChronoUnit.DAYS))).map(x -> x.getSentiment()).collect(Collectors.toList());

//            String entries = String.join(" ", filteredEntries);
//            String sentiment = sentimentAnalysisService.getSentiment(entries);
//
//            email.sendMail(user.getEmail(), " weekly sentiment report", sentiment);

            Map<String, Integer> sentimentCounts = new HashMap<>();
            for (String sentiment : sentiments) {
                if (sentiment != null)
                    sentimentCounts.put(sentiment, sentimentCounts.getOrDefault(sentiment, 0) + 1);
            }
            String mostFrequentSentiment = null;
            int maxCount = 0;
            for (Map.Entry<String, Integer> entry : sentimentCounts.entrySet()) {
                if (entry.getValue() > maxCount) {
                    maxCount = entry.getValue();
                    mostFrequentSentiment = entry.getKey();
                }
            }

            email.sendMail(user.getEmail(), " weekly sentiment report",mostFrequentSentiment);
        }


    }



//    @Scheduled(cron = "0 0/10 * 1/1 * ? *")
//    public void clearAppCache() {
//        appCache.init();
//    }
}*/
