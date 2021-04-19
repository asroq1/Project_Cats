package com.pso.cat.dto;

import com.pso.cat.dto.UserDto.WriterResponse;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.User;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class PostDto {

    @Builder
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

        private Long id;
        private String title;
        private String content;
        private int viewCount;
        private UserDto.WriterResponse writer;
        private Date createdDate;
        private Date updatedDate;

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
