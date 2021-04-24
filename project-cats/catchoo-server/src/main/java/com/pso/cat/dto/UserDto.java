package com.pso.cat.dto;

import com.pso.cat.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    public static class Request {
        private String email;
        private String password;
        private String nickname;
        private String loginType;

        public User toEntity() {
            return User.builder()
                .email(this.getEmail())
                .password(this.getPassword())
                .nickname(this.getNickname())
                .loginType(this.getLoginType()).build();
        }
    }

    @Builder
    @Getter
    public static class Response {
        private final Long id;
        private final String email;
        private final String nickname;

        public static Response ofEntity(User user) {
            return Response.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname()).build();
        }
    }

    @Builder
    @Getter
    public static class WriterResponse {
        private final Long id;
        private final String nickname;
        private final String photo;

        public static WriterResponse ofEntity(User user) {
            return WriterResponse.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .build();
        }
    }
}
