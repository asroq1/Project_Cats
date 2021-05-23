package com.pso.cat.dto;

import com.pso.cat.dto.CommentDto.Response;
import com.pso.cat.dto.UserDto.WriterResponse;
import com.pso.cat.entity.Post;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.pso.cat.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class PostDto {

    @Setter
    @Getter
    public static class Request {

        private String title;
        private String content;
        private String photo;

        public Post toEntity() {
            return Post.builder()
                .title(this.getTitle())
                .content(this.getContent())
                .photo(this.getPhoto())
                .build();
        }
    }

    @Builder
    @Getter
    public static class ListResponse {

        private final Long id;
        private final String title;
        private final int viewCount;
        private final UserDto.WriterResponse writer;
        private final Date createdDate;

        public static ListResponse ofEntity(Post post) {
            return ListResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .viewCount(post.getViewCount())
                .writer(WriterResponse.ofEntity(post.getWriter()))
                .createdDate(post.getCreatedDate()).build();
        }
    }

    @Builder
    @Getter
    @Setter
    public static class SingleResponse {

        private final Long id;
        private final String title;
        private final String content;
        private String photo;
        private final int viewCount;
        private final UserDto.WriterResponse writer;
        private final Date createdDate;
        private final Date updatedDate;
        private final List<CommentDto.Response> comments;

        public static SingleResponse ofEntity(Post post) {
            return SingleResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .photo(System.getProperty("user.dir") + post.getPhoto())
                .viewCount(post.getViewCount())
                .writer(WriterResponse.ofEntity(post.getWriter()))
                .createdDate(post.getCreatedDate())
                .updatedDate(post.getUpdatedDate())
                .comments(post.getComments().stream()
                    .map(Response::ofEntity)
                    .collect(Collectors.toList()))
                .build();

        }
    }

    @Setter
    @Getter
    public static class AddRequest {

        private String title;
        private String content;
        @ApiModelProperty(hidden = true)
        private String photo;

        public Post toEntity() {
            return Post.builder()
                    .title(title)
                    .content(content)
                    .photo(photo)
                    .build();
        }
    }

}
