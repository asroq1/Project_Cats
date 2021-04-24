package com.pso.cat.dto;

import com.pso.cat.dto.UserDto.WriterResponse;
import com.pso.cat.entity.Post;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class PostDto {

    @Setter
    @Getter
    public static class Request {

        private String title;
        private String content;
        private Long writerId;

        public Post toEntity() {
            return Post.builder()
                .title(this.getTitle())
                .content(this.getContent())
                .writer(User.builder().id(this.getWriterId()).build())
                .build();
        }
    }

    @Builder
    @Getter
    public static class Response {

        private final Long id;
        private final String title;
        private final String content;
        private final int viewCount;
        private final UserDto.WriterResponse writer;
        private final Date createdDate;
        private final Date updatedDate;

        public static Response ofEntity(Post post) {
            return Response.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .viewCount(post.getViewCount())
                .writer(WriterResponse.ofEntity(post.getWriter()))
                .createdDate(post.getCreatedDate())
                .updatedDate(post.getUpdatedDate()).build();
        }
    }

}
