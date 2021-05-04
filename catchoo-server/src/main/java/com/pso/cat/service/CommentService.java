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

import com.pso.cat.util.SecurityUtil;
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
        Comment addedComment = commentRepository.save(comment);
        addedComment.getWriter().setNickname(SecurityUtil.getCurrentNickname()
                .orElseThrow(() -> new RuntimeException("토큰에서 닉네임을 꺼낼 수 없습니다.")));
        return CommentDto.Response.ofEntity(addedComment);
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
