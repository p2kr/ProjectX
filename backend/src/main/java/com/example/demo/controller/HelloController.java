package com.example.demo.controller;

import com.example.demo.dto.MessageDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public MessageDto hello(@RequestParam(value = "name", required = false) String name) {
        String who = (name == null || name.isBlank()) ? "world" : name;
        return MessageDto.of("Hello, " + who + "! Greetings from Spring Boot.");
    }

    @GetMapping("/health")
    public MessageDto health() {
        return MessageDto.of("ok");
    }
}
