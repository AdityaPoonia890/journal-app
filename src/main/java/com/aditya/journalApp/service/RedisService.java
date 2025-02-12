package com.aditya.journalApp.service;

import com.aditya.journalApp.entity.Weather;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public <T> T get(String key, Class<T> entityClass) {
        try {
            Object o = redisTemplate.opsForValue().get(key);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(o.toString(),entityClass);
        } catch (Exception e) {
            log.error("Error while get" ,e);
            return null;
        }

    }
    public void set(String key, Object o) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            String s = mapper.writeValueAsString(o);
            redisTemplate.opsForValue().set(key, s);
        } catch (Exception e) {
            log.error("exception while setting", e);
        }
    }
}
