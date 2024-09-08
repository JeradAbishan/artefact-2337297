package com.sm.api.studymateapi.exception;

import org.springframework.http.HttpStatus;


public class APIServiceException extends RuntimeException {

    private HttpStatus httpStatus;

    public APIServiceException() {
        super();
    }

    public APIServiceException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public APIServiceException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause);
        this.httpStatus = httpStatus;
    }

    public APIServiceException(Throwable cause, HttpStatus httpStatus) {
        super(cause);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    @Override
    public String toString() {
        return "APIServiceException{" +
                ", httpStatus=" + httpStatus +
                '}';
    }


}
