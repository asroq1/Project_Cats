package com.pso.cat.service;

import com.pso.cat.entity.Cat;
import com.pso.cat.dto.CatDto;
import com.pso.cat.repository.CatRepository;
import com.pso.cat.repository.RecordRepository;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CatService {
    private final CatRepository catRepository;
    private final RecordRepository recordRepository;

    public CatService(CatRepository catRepository, RecordRepository recordRepository) {
        this.catRepository = catRepository;
        this.recordRepository = recordRepository;
    }

    public Cat save(Long userId, CatDto.Request catDto) {
        Cat cat = catDto.toEntity();
        cat.setUserId(userId);
        return catRepository.save(cat);
    }

    public CatDto.Response read(Long id) {
        return CatDto.Response.ofEntity(
            catRepository.findById(id).get(),
            recordRepository.findFirstByCatIdOrderByCreateDateDesc(id));
    }

    @Transactional
    public Cat modify(Long id, CatDto.Request catRequest) {
        Cat cat = catRequest.toEntity();
        cat.setId(id);
        return catRepository.save(cat);
    }

    @Transactional
    public void remove(Long id) {
        catRepository.inactive(id);
    }

    public List<CatDto.Response> listByUserId(Long userId) {
        return catRepository
            .findAllByUserIdAndStateOrderByCreatedDateDesc(userId, 1)
            .stream().map(cat -> CatDto.Response.ofEntity(cat)).collect(Collectors.toList());
    }
}
