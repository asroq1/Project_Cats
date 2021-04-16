package com.pso.cat.service;

import com.pso.cat.domain.Cat;
import java.util.Date;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
class CatServiceTest {

    @Autowired
    CatService catService;

    @Test
    void save() {
        /*
        Cat cat = new Cat();
        cat.setName("테스트");
        cat.setBirth(new Date(2015, 10, 1));
        cat.setGender('F');
        cat.setGoalWeight(4.4F);
        cat.setUserId(2L);

        catService.save(cat);

        Cat findCat = catService.read(3L);
        Assertions.assertThat(cat.getName()).isEqualTo(findCat.getName());

         */
    }

    @Test
    void read() {
        /*
        Cat cat = new Cat();
        cat.setName("테스트");
        cat.setBirth(new Date(2015, 10, 1));
        cat.setGender('F');
        cat.setGoalWeight(4.4F);
        cat.setUserId(1L);

        catService.save(cat);

        Cat findCat = catService.read(1L);
        Assertions.assertThat(cat.getName()).isEqualTo(findCat.getName());

         */
    }

    @Test
    void update() {
        /*
        Cat cat = new Cat();
        cat.setName("테스트");
        cat.setBirth(new Date(2015, 10, 1));
        cat.setGender('F');
        cat.setGoalWeight(4.4F);
        cat.setUserId(1L);
        catService.save(cat);

        Cat updateCat = new Cat();
        updateCat.setId(1L);
        updateCat.setName("테스트2");

        catService.update(updateCat);
        Cat findCat = catService.read(1L).get();

        Assertions.assertThat(updateCat.getName()).isNotEqualTo(cat.getName());
        Assertions.assertThat(updateCat.getGender()).isNotNull();

         */
    }

    @Test
    void delete() {
    }

    @Test
    void listByUserId() {
    }
}