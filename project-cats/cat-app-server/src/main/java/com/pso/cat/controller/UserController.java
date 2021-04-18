package com.pso.cat.controller;

import com.pso.cat.dto.UserDto;
import com.pso.cat.dto.UserDto.Response;
import com.pso.cat.service.UserService;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value="집사 추가, 수정, 삭제, 조회", tags = {"집사 API"})
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody UserDto.Request user) {
        userService.signup(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserDto.Response> getMyUserInfo() {
        return ResponseEntity.ok(UserDto.Response.ofEntity(userService.getMyUserWithAuthorities().get()));
    }

    @GetMapping("/user/{email}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto.Response> getUserInfo(@PathVariable String email) {
        return ResponseEntity.ok(UserDto.Response.ofEntity(userService.getUserWithAuthorities(email).get()));
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto.Response> get(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.read(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity modify(@PathVariable Long id, UserDto.Request request) {
        userService.modify(id, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(Long id) {
        userService.remove(id);
        return ResponseEntity.ok().build();
    }
}
