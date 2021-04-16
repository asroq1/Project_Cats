package com.pso.cat.controller;


import com.pso.cat.domain.Cat;
import com.pso.cat.service.CatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity register(User user) {
        userService.save(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<User>> list(Long userId) {
        List<User> list = userService.listByUserId(userId);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return userService.read(id).get();
    }

    @PatchMapping("/{id}")
    public ResponseEntity modify(@PathVariable Long id, @RequestBody User user) {
        userService.modify(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(Long id) {
        catService.remove(id);
        return ResponseEntity.ok().build();
    }

}
