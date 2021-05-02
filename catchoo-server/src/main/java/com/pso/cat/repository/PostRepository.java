package com.pso.cat.repository;

import com.pso.cat.entity.Cat;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.User;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Modifying
    @Query("UPDATE post p SET p.state = 0 where p.id = :id")
    int inactive(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE post p SET p.viewCount = p.viewCount + 1 where p.id = :id")
    void updateViewCount(Long id);

    List<Post> findAllByStateOrderByCreatedDateDesc(@Param("state") int state);

    Page<Post> findByIdLessThanAndStateOrderByIdDesc(
        @Param("id") Long lastPostId,
        @Param("state") int state,
        Pageable pageRequest);
}
