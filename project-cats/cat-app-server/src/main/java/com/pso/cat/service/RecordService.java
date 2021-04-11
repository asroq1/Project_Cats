package com.pso.cat.service;

import com.pso.cat.domain.Cat;
import com.pso.cat.domain.Record;
import com.pso.cat.repository.CatRepository;
import com.pso.cat.repository.RecordRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class RecordService {
    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public Record save(Record record) {
        return recordRepository.save(record);
    }

    public Optional<Record> read(Long id) {
        return recordRepository.findById(id);
    }

    public void remove(Long id) {
        recordRepository.deleteById(id);
    }

    public void modify(Record record) {
        recordRepository.save(record);
    }

    public List<Record> listByCatId(Long catId) {
        return recordRepository.findAllByCatIdOrderByCreateDateDesc(catId);
    }
}
