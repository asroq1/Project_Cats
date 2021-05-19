package com.pso.cat.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class LoginDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BasicReq {
        @NotNull
        @Size(min = 3, max = 50)
        private String email;

        @NotNull
        @Size(min = 3, max = 100)
        private String password;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SocialReq {
        @NotNull
        @Size(min = 3, max = 50)
        private String email;
    }
}
