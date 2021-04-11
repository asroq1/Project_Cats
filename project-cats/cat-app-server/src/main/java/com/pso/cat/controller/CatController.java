package com.pso.cat.controller;


import com.pso.cat.domain.Cat;
import com.pso.cat.service.CatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value="고양이 추가, 수정, 삭제, 조회", tags = {"고양이 CRUD API"})
@RequestMapping("/api/cats")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @PostMapping
    public String add(Cat cat) {
        catService.save(cat);
        return "ok";
    }

    @GetMapping
    public List<Cat> list(Long userId) {
        List<Cat> list = catService.listByUserId(userId);
        return list;
    }

    @GetMapping("/{id}")
    public Cat get(@PathVariable Long id) {
        return catService.read(id).get();
    }

    @PatchMapping("/{id}")
    public String get(@PathVariable Long id, @RequestBody Cat cat) {
        catService.update(cat);
        return "ok";
    }

    @DeleteMapping("/{id}")
    public String delete(Long id) {
        catService.delete(id);
        return "ok";
    }

}
