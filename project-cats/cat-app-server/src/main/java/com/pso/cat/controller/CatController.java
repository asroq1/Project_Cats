package com.pso.cat.controller;


import com.pso.cat.service.CatService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cat")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }
}
