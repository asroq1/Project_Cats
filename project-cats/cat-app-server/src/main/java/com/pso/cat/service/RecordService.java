package com.pso.cat.service;

import com.pso.cat.domain.Cat;
import com.pso.cat.domain.Record;
import com.pso.cat.repository.CatRepository;
import com.pso.cat.repository.RecordRepository;
import java.util.Optional;

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

    public void delete(Long id) {
        recordRepository.deleteById(id);
    }

}
