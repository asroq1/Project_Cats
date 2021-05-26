package com.pso.cat.error.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "Method Not Allowed"),
    ENTITY_NOT_FOUND(400,  "Entity Not Found"),
    INTERNAL_SERVER_ERROR(500, "Server Error"),
    INVALID_TYPE_VALUE(400, "Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "Access is Denied");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
