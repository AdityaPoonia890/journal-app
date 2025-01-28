package com.aditya.journalApp.service;

import com.aditya.journalApp.cache.AppCache;
import com.aditya.journalApp.entity.Weather;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WeatherService {

    public enum keys{
        WEATHER_API;
    }

    @Value("${weather.api.key}")
    private String apiKey;

    @Autowired
    AppCache appCache;

    //private static final String api = "http://api.weatherstack.com/current?access_key=API_KEY&query=CITY";

    private final RestTemplate restTemplate;
    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Weather getWeather(String city) {
        String finalApi = appCache.appCache.get(keys.WEATHER_API).replace("CITY",city).replace("API_KEY",apiKey);
        ResponseEntity<Weather> response = restTemplate.exchange(finalApi, HttpMethod.GET, null, Weather.class);

        Weather body = response.getBody();
        return body;

    }
}
