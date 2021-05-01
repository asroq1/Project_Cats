package com.pso.cat.service;

import com.pso.cat.entity.Authority;
import com.pso.cat.entity.User;
import com.pso.cat.dto.UserDto;
import com.pso.cat.repository.UserRepository;
import com.pso.cat.util.SecurityUtil;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional
    public User signup(UserDto.Request request) {
        if (userRepository.findOneWithAuthoritiesByEmail(request.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
            .name("ROLE_USER")
            .build();

        User user = User.builder()
            .email(request.getEmail())
            .nickname(request.getNickname())
            .loginType(request.getLoginType())
            .authorities(Collections.singleton(authority))
            .state(1)
            .build();

        if (!StringUtils.isEmpty(request.getPassword())) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String email) {
        return userRepository.findOneWithAuthoritiesByEmail(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByEmail);
    }

    public UserDto.Response read(Long id) {
        return UserDto.Response.ofEntity(userRepository.findById(id).get());
    }

    public void modify(UserDto.Request request) {
        User user = request.toEntity();
        user.setId(SecurityUtil.getCurrentUserId().orElseThrow(() -> new RuntimeException("로그인해주세요")));
        userRepository.save(user);
    }

    public void remove() {
        userRepository.inactive(SecurityUtil.getCurrentUserId().orElseThrow(() -> new RuntimeException("로그인해주세요")));
    }

    public List<UserDto.Response> list() {
        return userRepository.findAll().stream().map(
                user -> UserDto.Response.ofEntity(user)
        ).collect(Collectors.toList());
    }

}
