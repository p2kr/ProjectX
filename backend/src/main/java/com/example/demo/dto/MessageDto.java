package com.example.demo.dto;

import java.time.Instant;

/**
 * Response shape returned by HelloController.
 * Matches MessageDto on the frontend (src/features/api/messageSlice.ts).
 */
public record MessageDto(String message, Instant timestamp) {
    public static MessageDto of(String message) {
        return new MessageDto(message, Instant.now());
    }
}
