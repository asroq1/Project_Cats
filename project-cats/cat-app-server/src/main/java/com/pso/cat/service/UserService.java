package com.pso.cat.service;

import com.pso.cat.entity.Authority;
import com.pso.cat.entity.User;
import com.pso.cat.dto.UserDto;
import com.pso.cat.repository.UserRepository;
import javax.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /*
    @Transactional
    public User signUp(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
            .authorityName("ROLE_USER")
            .build();

    }

     */


}
