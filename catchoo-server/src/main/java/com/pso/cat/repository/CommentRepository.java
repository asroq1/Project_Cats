package com.pso.cat.repository;

import com.pso.cat.entity.Comment;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Modifying
    @Query("UPDATE comment p SET p.state = 0 where p.id = :id")
    int inactive(@Param("id") Long id);

    List<Comment> findAllByPostIdAndStateOrderByCreatedDateDesc(
        @Param("postId") Long postId, @Param("state") int state
    );
}
