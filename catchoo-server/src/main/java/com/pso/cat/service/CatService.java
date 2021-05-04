package com.pso.cat.service;

import com.pso.cat.entity.Cat;
import com.pso.cat.dto.CatDto;
import com.pso.cat.entity.Post;
import com.pso.cat.repository.CatRepository;
import com.pso.cat.repository.RecordRepository;
import java.util.Date;
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
    public void modify(Long id, CatDto.Request newCat) {
        Cat cat = catRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("해당하는 고양이가 없습니다."));
        cat.setName(newCat.getName());
        cat.setBirth(newCat.getBirth());
        cat.setGender(newCat.getGender());
        cat.setPhoto(newCat.getPhoto());
        cat.setGoalWeight(newCat.getGoalWeight());
        catRepository.save(cat);
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
