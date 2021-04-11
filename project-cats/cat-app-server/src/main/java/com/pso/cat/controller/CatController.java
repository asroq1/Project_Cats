package com.pso.cat.controller;


import com.pso.cat.service.CatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value="고양이 추가, 수정, 삭제, 조회", tags = {"고양이 CRUD API"})
@RequestMapping("/api/")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @ApiOperation(value = "고양이 목록", tags ="sample")
    @GetMapping("/cats")
    public ResponseEntity sample(@RequestParam String param) {
        return ResponseEntity.ok(param);
    }
}
