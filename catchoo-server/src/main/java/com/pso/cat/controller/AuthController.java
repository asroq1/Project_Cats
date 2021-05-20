package com.pso.cat.controller;

import com.pso.cat.dto.LoginDto;
import com.pso.cat.dto.TokenDto;
import com.pso.cat.entity.Authority;
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
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.stream.Collectors;

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
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto.BasicReq basicReq) {

        String email = basicReq.getEmail();
        String password = basicReq.getPassword();

        final User user = customUserDetailsService.findByEmailAndPassword(email, password);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        String jwt = tokenProvider.createToken(user);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);

    }

    @ApiOperation("불완전한 기능. 아직 구현중.")
    @PostMapping("/socialLogin")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto.SocialReq socialReq) {

        String email = socialReq.getEmail();
        System.out.println("email = " + email);

        User user = customUserDetailsService.findByEmail(email);
        System.out.println("user = " + user);

        System.out.println("AuthController.authorize: found by email");

        for (Authority authority : user.getAuthorities()) {
            System.out.println("authority.getName() = " + authority.getName());
        }

        try {
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(email, null,
                            user.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getName())).collect(
                                    Collectors.toList())));

            System.out.println("AuthController.authorize: authenticated");

            String jwt = tokenProvider.createToken(user);

            System.out.println("AuthController.authorize: created token");

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
            return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCause());
            e.printStackTrace();
            throw new RuntimeException("dpfjqkft");
        }
    }
}