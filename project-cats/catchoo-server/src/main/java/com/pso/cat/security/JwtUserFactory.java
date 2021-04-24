package com.pso.cat.security;

import com.pso.cat.entity.User;

public class JwtUserFactory {
    private JwtUserFactory() {}

    public static JwtUser create(User user) {
        return new JwtUser(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getNickname(),
            user.getState()
        );
    }

}
