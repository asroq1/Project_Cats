package com.pso.cat.controller;


import com.pso.cat.dto.CommentDto;
import com.pso.cat.dto.CommentDto.Response;
import com.pso.cat.entity.Comment;
import com.pso.cat.service.CommentService;
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
@Api(value="댓글 추가, 수정, 삭제, 조회", tags = {"댓글 API"})
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentDto.Response> add(@RequestBody CommentDto.Request comment) {
        Long userId = SecurityUtil.getCurrentUserId().orElseThrow(
            () -> new RuntimeException("로그인을 해주세요.")
        );
        return ResponseEntity.ok().body(commentService.save(userId, comment));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Response>> list(@PathVariable Long postId) {
        List<Response> list = commentService.list(postId);
        return ResponseEntity.ok().body(list);
    }

    @PatchMapping
    public ResponseEntity modify(Long id, String content) {
        commentService.modify(id, content);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(@PathVariable Long id) {
        commentService.remove(id);
        return ResponseEntity.ok().build();
    }

}
