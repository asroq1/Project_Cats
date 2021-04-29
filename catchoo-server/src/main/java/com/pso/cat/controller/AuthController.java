package com.pso.cat.controller;

import com.pso.cat.dto.LoginDto;
import com.pso.cat.dto.TokenDto;
import com.pso.cat.entity.User;
import com.pso.cat.jwt.JwtFilter;
import com.pso.cat.jwt.TokenProvider;
import com.pso.cat.service.CustomUserDetailsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final CustomUserDetailsService customUserDetailsService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthController(CustomUserDetailsService customUserDetailsService,
        TokenProvider tokenProvider,
        AuthenticationManager authenticationManager) {
        this.customUserDetailsService = customUserDetailsService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        String email = loginDto.getEmail();
        String password = loginDto.getPassword();

        final User user = customUserDetailsService.findByEmailAndPassword(email, password);

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password));

        String jwt = tokenProvider.createToken(user);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

    @ApiOperation("불완전한 기능. 아직 구현중.")
    @PostMapping("/login/social")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody String email) {

        User user = customUserDetailsService.findByEmail(email);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, ""));

        String jwt = tokenProvider.createToken(user);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

}