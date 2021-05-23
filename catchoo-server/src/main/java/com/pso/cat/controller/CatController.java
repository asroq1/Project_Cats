package com.pso.cat.controller;


import com.pso.cat.entity.Cat;
import com.pso.cat.dto.CatDto;
import com.pso.cat.service.CatService;
import com.pso.cat.util.S3Uploader;
import com.pso.cat.util.SecurityUtil;
import io.swagger.annotations.Api;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Api(value="고양이 추가, 수정, 삭제, 조회", tags = {"고양이 API"})
@RequestMapping("/api/cats")
@RequiredArgsConstructor
public class CatController {

    private final CatService catService;

    @PostMapping
    public ResponseEntity add(CatDto.AddRequest cat, MultipartFile multipartFile) throws Exception{
        catService.save(cat, multipartFile);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CatDto.Response>> list() {
        Long userId = SecurityUtil.getCurrentUserId().orElseThrow(
            () -> new RuntimeException("로그인을 해주세요.")
        );
        List<CatDto.Response> list = catService.listByUserId(userId);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CatDto.Response> get(@PathVariable Long id) {
        return ResponseEntity.ok().body(catService.read(id));
    }

    @PatchMapping
    public ResponseEntity modify(Long id, CatDto.Request cat, MultipartFile photoFile) throws Exception {
        catService.modify(id, cat, photoFile);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(@PathVariable Long id) {
        catService.remove(id);
        return ResponseEntity.ok().build();
    }

}
