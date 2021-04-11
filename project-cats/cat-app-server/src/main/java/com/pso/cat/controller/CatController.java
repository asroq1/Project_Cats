package com.pso.cat.controller;


import com.pso.cat.domain.Cat;
import com.pso.cat.service.CatService;
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
@Api(value="고양이 추가, 수정, 삭제, 조회", tags = {"고양이 API"})
@RequestMapping("/api/cats")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @PostMapping
    public ResponseEntity add(Cat cat) {
        catService.save(cat);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Cat>> list(Long userId) {
        List<Cat> list = catService.listByUserId(userId);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public Cat get(@PathVariable Long id) {
        return catService.read(id).get();
    }

    @PatchMapping("/{id}")
    public ResponseEntity modify(@PathVariable Long id, @RequestBody Cat cat) {
        catService.modify(cat);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity remove(Long id) {
        catService.remove(id);
        return ResponseEntity.ok().build();
    }

}
