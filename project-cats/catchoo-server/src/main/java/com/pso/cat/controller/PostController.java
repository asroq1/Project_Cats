package com.pso.cat.controller;


import com.pso.cat.dto.PostDto;
import com.pso.cat.dto.PostDto.Response;
import com.pso.cat.entity.Post;
import com.pso.cat.service.PostService;
import com.pso.cat.util.SecurityUtil;
import io.swagger.annotations.Api;
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
@Api(value="게시글 추가, 수정, 삭제, 조회", tags = {"게시글 API"})
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity add(PostDto.Request post) {
        Long userId = SecurityUtil.getCurrentUserId().orElseThrow(
            () -> new RuntimeException("로그인을 해주세요.")
        );
        postService.save(userId, post);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Response>> list() {
        List<PostDto.Response> list = postService.list();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto.Response> get(@PathVariable Long id) {
        return ResponseEntity.ok().body(postService.read(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity modify(@PathVariable Long id, @RequestBody PostDto.Request postRequest) {
        postService.modify(id, postRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(Long id) {
        postService.remove(id);
        return ResponseEntity.ok().build();
    }

}
