package com.learnhub.common;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private HttpStatus status;
    private Object error;
    private long timestamp;

    public ErrorResponse() {}

    public ErrorResponse(HttpStatus status, Object error) {
        this.status = status;
        this.error = error;
        this.timestamp = System.currentTimeMillis();
    }

    public HttpStatus getStatus() {
        return status;
    }
    public void setStatus(HttpStatus status) {
        this.status = status;
    }
    public Object getError() {
        return error;
    }
    public void setError(Object error) {
        this.error = error;
    }
    public long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
