package com.pso.cat.dto;

import com.pso.cat.dto.UserDto.WriterResponse;
import com.pso.cat.entity.Comment;
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

        public Comment toEntity() {
            return Comment.builder()
                .postId(postId)
                .content(this.getContent())
                .build();
        }
    }

    @Builder
    @Getter
    public static class Response {

        private final Long id;
        private final Long postId;
        private final String content;
        private final WriterResponse writer;
        private final Date createdDate;
        private final Boolean isEdited;

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
