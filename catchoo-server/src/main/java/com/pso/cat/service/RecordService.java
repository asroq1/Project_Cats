package com.pso.cat.service;

import com.pso.cat.entity.Record;
import com.pso.cat.dto.RecordDto;
import com.pso.cat.repository.RecordRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class RecordService {
    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public void save(RecordDto.Request request) {
        Record record = request.toEntity();
        recordRepository.save(request.toEntity());
    }

    public RecordDto.Response read(Long id) {
        return RecordDto.Response.ofEntity(recordRepository.findById(id).get());
    }

    public void remove(Long id) {
        recordRepository.deleteById(id);
    }

    public void modify(Long id, Float weight) {
        Record record = recordRepository.findById(id).orElseThrow(() -> new RuntimeException("해당 기록이 없습니다."));
        record.setWeight(weight);
        recordRepository.save(record);
    }

    public List<RecordDto.Response> listByCatId(Long catId) {
        return recordRepository.findAllByCatIdOrderByCreateDateDesc(catId)
            .stream().map(record -> RecordDto.Response.ofEntity(record)).collect(Collectors.toList());
    }
}
