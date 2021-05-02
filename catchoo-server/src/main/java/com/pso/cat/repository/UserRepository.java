package com.pso.cat.repository;

import com.pso.cat.entity.Post;
import com.pso.cat.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query("UPDATE user u SET u.state = 0 where u.id = :id")
    int inactive(@Param("id") Long id);

    User findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(@Param("email") String email);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmail(@Param("email") String email);
}
