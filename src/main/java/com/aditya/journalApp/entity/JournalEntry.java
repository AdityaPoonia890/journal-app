package com.aditya.journalApp.entity;

import com.aditya.journalApp.enums.Sentiment;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;



@Data
@NoArgsConstructor//@AllArgsConstructor@RequiredArgsConstructor
@Document("journal_entries")
public class JournalEntry {
    @Id
    private Integer id;
    private String title;
    private String content;
    private LocalDateTime date;
    private String sentiment;

    private byte[] imageData;

    private String base64Image;


}
