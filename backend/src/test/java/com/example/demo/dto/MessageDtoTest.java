package com.example.demo.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.time.Duration;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Pure unit tests for {@link MessageDto} — no Spring context, fast.
 * Uses JUnit 6 + AssertJ.
 */
class MessageDtoTest {

    @Test
    @DisplayName("of(message) sets message and a recent timestamp")
    void ofPopulatesMessageAndTimestamp() {
        Instant before = Instant.now();
        MessageDto dto = MessageDto.of("hi");
        Instant after = Instant.now();

        assertNotNull(dto.timestamp(), "timestamp must not be null");
        assertThat(dto.message()).isEqualTo("hi");
        assertThat(dto.timestamp())
                .isBetween(before.minus(Duration.ofMillis(1)), after.plus(Duration.ofMillis(1)));
    }

    @ParameterizedTest(name = "of(\"{0}\") preserves the message")
    @CsvSource({
            "hello",
            "Hello, world!",
            "  spaces preserved  ",
            "🎉 unicode 🚀"
    })
    void ofPreservesArbitraryMessages(String input) {
        assertThat(MessageDto.of(input).message()).isEqualTo(input);
    }
}
