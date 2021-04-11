package com.pso.cat.controller;


import com.pso.cat.domain.Cat;
import com.pso.cat.domain.Record;
import com.pso.cat.service.CatService;
import com.pso.cat.service.RecordService;
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
@Api(value="기록 추가, 수정, 삭제, 조회", tags = {"기록 CRUD API"})
@RequestMapping("/api/cats")
public class RecordController {
    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping
    public ResponseEntity add(Record cat) {
        recordService.save(cat);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Record>> list(Long catId) {
        List<Record> list = recordService.listByCatId(catId);
        return ResponseEntity.ok().body(list);
    }

    @PatchMapping("/{id}")
    public ResponseEntity get(@PathVariable Long id, @RequestBody Record record) {
        recordService.update(record);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(Long  id) {
        recordService.delete(id);
        return ResponseEntity.ok().build();
    }

}
