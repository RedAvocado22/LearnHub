package com.learnhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LearnhubApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(LearnhubApiApplication.class, args);
    }
}
