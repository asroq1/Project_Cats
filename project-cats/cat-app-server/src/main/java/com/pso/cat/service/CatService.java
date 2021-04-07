package com.pso.cat.service;

import com.pso.cat.domain.Cat;
import com.pso.cat.repository.CatRepository;
import java.util.Optional;
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

    public int delete(Long id) {
        return catRepository.inactive(id);
    }

}
