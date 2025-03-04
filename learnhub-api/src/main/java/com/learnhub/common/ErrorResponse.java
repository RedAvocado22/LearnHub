package com.learnhub.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Data
public class ErrorResponse {
    private HttpStatus status;
    private Object error;
    private long timestamp;

    public ErrorResponse(HttpStatus status, Object error) {
        this.status = status;
        this.error = error;
        this.timestamp = System.currentTimeMillis();
    }


}
