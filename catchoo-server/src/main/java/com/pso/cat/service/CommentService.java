package com.pso.cat.service;

import com.pso.cat.dto.CommentDto;
import com.pso.cat.dto.CommentDto.Response;
import com.pso.cat.dto.PostDto;
import com.pso.cat.entity.Comment;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.User;
import com.pso.cat.repository.CommentRepository;
import com.pso.cat.repository.PostRepository;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public CommentDto.Response save(Long userId, CommentDto.Request commentDto) {
        Comment comment = commentDto.toEntity();
        comment.setWriter(User.builder().id(userId).build());
        return CommentDto.Response.ofEntity(commentRepository.save(comment));
    }

    public CommentDto.Response read(Long id) {
        Optional<Comment> comment = commentRepository.findById(id);
        return CommentDto.Response.ofEntity(comment.get());
    }

    @Transactional
    public void modify(Long id, String content) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("해당하는 댓글이 없습니다."));
        comment.setContent(content);
        comment.setUpdatedDate(new Date());
        commentRepository.save(comment);
    }

    @Transactional
    public void remove(Long id) {
        commentRepository.inactive(id);
    }

    public List<CommentDto.Response> list(Long postId) {
        return commentRepository
            .findAllByPostIdAndStateOrderByCreatedDateDesc(postId, 1)
            .stream().map(Response::ofEntity).collect(Collectors.toList());
    }
}
