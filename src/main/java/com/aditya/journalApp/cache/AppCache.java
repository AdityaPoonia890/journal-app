package com.aditya.journalApp.cache;

import com.aditya.journalApp.entity.ConfigJournalAppEntity;
import com.aditya.journalApp.repository.ConfigJournalAppRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AppCache {

    @Autowired
    ConfigJournalAppRepo configJournalAppRepo;

    public HashMap<String, String> appCache;

    @PostConstruct
    public void init() {

        appCache = new HashMap<>();

        List<ConfigJournalAppEntity> all = configJournalAppRepo.findAll();

        for (ConfigJournalAppEntity configJournalAppEntity: all) {
            appCache.put(configJournalAppEntity.getKey(), configJournalAppEntity.getValue());
        }
    }

}
