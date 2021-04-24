package com.pso.cat.dto;

import com.pso.cat.dto.UserDto.WriterResponse;
import com.pso.cat.entity.Comment;
import com.pso.cat.entity.User;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class CommentDto {

    @Setter
    @Getter
    public static class Request {

        private Long postId;
        private String content;

        public Comment toEntity(Long userId) {
            return Comment.builder()
                .postId(postId)
                .writer(User.builder().id(userId).build())
                .content(this.getContent())
                .build();
        }
    }

    @Builder
    @Getter
    public static class Response {

        private Long id;
        private Long postId;
        private String content;
        private WriterResponse writer;
        private Date createdDate;
        private Boolean isEdited;

        public static Response ofEntity(Comment comment) {
            return Response.builder()
                .id(comment.getId())
                .postId(comment.getPostId())
                .content(comment.getContent())
                .writer(WriterResponse.ofEntity(comment.getWriter()))
                .createdDate(comment.getCreatedDate())
                .isEdited(comment.getUpdatedDate() == null).build();
        }
    }


}
