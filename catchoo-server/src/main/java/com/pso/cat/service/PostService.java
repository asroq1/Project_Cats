package com.pso.cat.service;

import com.pso.cat.dto.PostDto;
import com.pso.cat.entity.Comment;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.User;
import com.pso.cat.repository.CommentRepository;
import com.pso.cat.repository.PostRepository;
import com.pso.cat.util.SecurityUtil;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public Post save(Long userId, PostDto.Request postDto) {
        Post post = postDto.toEntity();
        post.setWriter(User.builder().id(userId).build());
        return postRepository.save(post);
    }

    public PostDto.SingleResponse read (Long id){
        Optional<Post> post = postRepository.findById(id);
        post.ifPresent(p -> {
            postRepository.updateViewCount(p.getId());
            p.setComments(commentRepository.findAllByPostIdAndStateOrderByCreatedDateDesc(id, 1));
        });
        PostDto.SingleResponse.ofEntity(post.get());
        return PostDto.SingleResponse.ofEntity(post.get());
    }

    @Transactional
    public void modify (Long id, PostDto.Request newPost){
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("해당하는 게시글이 없습니다."));
        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());
        post.setUpdatedDate(new Date());
        postRepository.save(post);
    }

    @Transactional
    public void remove (Long id){
        postRepository.inactive(id);
    }

    public List<PostDto.ListResponse> list () {
        return postRepository
                .findAllByStateOrderByCreatedDateDesc(1)
                .stream().map(post -> PostDto.ListResponse.ofEntity(post)).collect(Collectors.toList());
    }
}
