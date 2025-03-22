package com.aditya.journalApp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "counter")
@Data
@NoArgsConstructor@AllArgsConstructor
public class Counter {
    @Id
    private String id;
    private int seq;
}
