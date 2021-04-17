package com.pso.cat.repository;

import com.pso.cat.entity.Cat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CatRepository extends JpaRepository<Cat, Long> {
    @Modifying
    @Query("UPDATE cat c SET c.state = 0 where c.id = :id")
    int inactive(@Param("id") Long id);

    List<Cat> findAllByUserIdAndStateOrderByCreatedDateDesc(@Param("userId") Long userId, @Param("state") int state);
}
