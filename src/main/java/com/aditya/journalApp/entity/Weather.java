package com.aditya.journalApp.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

// import com.fasterxml.jackson.databind.ObjectMapper; // version 2.11.1
// import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
/* ObjectMapper om = new ObjectMapper();
Root root = om.readValue(myJsonString, Root.class); */


    @Getter
    @Setter public class Weather {
        private Current current;

        @Getter
        @Setter
        public class Current {
            private int temperature;
            @JsonProperty("weather_descriptions")
            private List<String> weatherDescriptions;
            private int feelslike;
        }


    }


