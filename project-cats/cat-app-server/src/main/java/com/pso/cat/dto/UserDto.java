package com.pso.cat.dto;

import com.pso.cat.entity.Cat;
import com.pso.cat.entity.User;
import java.util.Collections;
import java.util.Date;
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
        private Long id;
        private String email;
        private String nickname;

        public static Response ofEntity(User user) {
            return Response.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname()).build();
        }
    }
}
