package com.pso.cat.service;

import com.pso.cat.domain.Cat;
import com.pso.cat.repository.CatRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CatService {
    private final CatRepository catRepository;

    public CatService(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    public Cat save(Cat cat) {
        return catRepository.save(cat);
    }

    public Optional<Cat> read(Long id) {
        return catRepository.findById(id);
    }

    @Transactional
    public Cat modify(Cat cat) {
        return catRepository.save(cat);
    }

    @Transactional
    public int remove(Long id) {
        return catRepository.inactive(id);
    }

    public List<Cat> listByUserId(Long userId) {
        return catRepository.findAllByUserIdAndStateOrderByCreatedDateDesc(userId, 1);
    }
}
