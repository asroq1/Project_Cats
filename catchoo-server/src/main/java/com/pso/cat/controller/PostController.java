package com.pso.cat.controller;


import com.pso.cat.dto.PostDto;
import com.pso.cat.dto.PostDto.ListResponse;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Api(value="게시글 추가, 수정, 삭제, 조회", tags = {"게시글 API"})
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity add(PostDto.Request post, List<MultipartFile> photo) throws Exception{
        Long userId = SecurityUtil.getCurrentUserId().orElseThrow(
                () -> new RuntimeException("로그인을 해주세요.")
        );

        postService.save(userId, post, photo);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostDto.ListResponse>> list() {
        List<ListResponse> list = postService.list();
        return ResponseEntity.ok().body(list);
    }


    @GetMapping
    public ResponseEntity<List<PostDto.ListResponse>> fetchPostPagesBy(
        @RequestParam Long lastPostId, @RequestParam int size
    ) {
        List<ListResponse> list = postService.fetchPostPagesBy(lastPostId, size);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto.SingleResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok().body(postService.read(id));
    }

    @PatchMapping
    public ResponseEntity modify(Long id,
                                 PostDto.Request postRequest,
                                 List<MultipartFile> photos,
                                 List<String> deletedPhotos) {
        postService.modify(id, postRequest, photos, deletedPhotos);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(@PathVariable Long id) {
        postService.remove(id);
        return ResponseEntity.ok().build();
    }

}
