package com.learnhub.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/dummy")
public class DummyController {
    @GetMapping
    public ResponseEntity<String> getDummy() {
        return ResponseEntity.ok("Dummy value");
    }
}
