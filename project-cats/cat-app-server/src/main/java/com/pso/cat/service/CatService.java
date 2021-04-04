package com.pso.cat.service;

import com.pso.cat.repository.CatRepository;
import org.springframework.stereotype.Service;

@Service
public class CatService {
    private final CatRepository catRepository;

    public CatService(CatRepository catRepository) {
        this.catRepository = catRepository;
    }
}
