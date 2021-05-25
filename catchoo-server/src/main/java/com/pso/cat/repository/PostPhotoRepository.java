package com.pso.cat.repository;

import com.pso.cat.entity.PostPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostPhotoRepository extends JpaRepository<PostPhoto, Long> {
    public List<PostPhoto> findAllByPostId(Long postId);
}
