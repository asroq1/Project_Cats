package com.pso.cat.controller;

import com.pso.cat.dto.UserDto;
import com.pso.cat.dto.UserDto.Response;
import com.pso.cat.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.Map;
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

import java.util.List;

@RestController
@Api(value="회원 추가, 수정, 삭제, 조회", tags = {"회원 API"})
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

    @ApiOperation("개인 정보 확인")
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserDto.Response> getMyUserInfo() {
        return ResponseEntity.ok(UserDto.Response.ofEntity(userService.getMyUserWithAuthorities().get()));
    }

    @ApiOperation("테스트를 위한 전체 회원 정보 확인 기능: 로그인 필요 없음")
    @GetMapping("/users/")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Response>> list() {
        return ResponseEntity.ok(userService.list());
    }


    @GetMapping("/users/checkEmail")
    @ApiOperation("이메일 중복 확인")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateEmail(String email) {
        Map<String, Boolean> param = new HashMap<>();
        param.put("duplicateValue", userService.checkDuplicateEmail(email));
        return ResponseEntity.ok(param);
    }

    @GetMapping("/users/checkNickname")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateNickname(String nickname) {
        Map<String, Boolean> param = new HashMap<>();
        param.put("duplicateValue", userService.checkDuplicateNickname(nickname));
        return ResponseEntity.ok(param);
    }

    /*
    @GetMapping("/user/{email}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto.Response> getUserInfo(@PathVariable String email) {
        return ResponseEntity.ok(UserDto.Response.ofEntity(userService.getUserWithAuthorities(email).get()));
    }
     */

    @PatchMapping("/user")
    public ResponseEntity modify(UserDto.Request request) {
        userService.modify(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user")
    public ResponseEntity remove() {
        userService.remove();
        return ResponseEntity.ok().build();
    }
}
