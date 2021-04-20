package com.pso.cat.service;

import com.pso.cat.dto.PostDto;
import com.pso.cat.entity.Post;
import com.pso.cat.repository.PostRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post save(PostDto.Request post) {
        return postRepository.save(post.toEntity());
    }

    public PostDto.Response read(Long id) {
        Optional<Post> post = postRepository.findById(id);
        post.ifPresent(p -> {
            postRepository.updateViewCount(p.getId());
        });
        return PostDto.Response.ofEntity(post.get());
    }

    @Transactional
    public Post modify(Long id, PostDto.Request postRequest) {
        Post post = postRequest.toEntity();
        post.setId(id);
        return postRepository.save(post);
    }

    @Transactional
    public void remove(Long id) {
        postRepository.inactive(id);
    }

    public List<PostDto.Response> list() {
        return postRepository
            .findAllByStateOrderByCreatedDateDesc(1)
            .stream().map(post -> PostDto.Response.ofEntity(post)).collect(Collectors.toList());
    }
}
