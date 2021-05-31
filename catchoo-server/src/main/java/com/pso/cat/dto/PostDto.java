package com.pso.cat.dto;

import com.pso.cat.dto.CommentDto.Response;
import com.pso.cat.dto.UserDto.WriterResponse;
import com.pso.cat.entity.Post;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.pso.cat.entity.PostPhoto;
import com.pso.cat.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class PostDto {

    @Setter
    @Getter
    public static class Request {

        private String title;
        private String content;

        public Post toEntity() {
            return Post.builder()
                .title(this.getTitle())
                .content(this.getContent())
                .build();
        }

        public Post toEntity(Post post) {
            if (title != null) post.setTitle(title);
            if (content != null) post.setContent(content);
            post.setUpdatedDate(new Date());
            return post;
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
        private final String thumbnail;

        public static ListResponse ofEntity(Post post, String url) {
            return ListResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .viewCount(post.getViewCount())
                .writer(WriterResponse.ofEntity(post.getWriter()))
                .createdDate(post.getCreatedDate())
                .thumbnail(url).build();
        }
    }

    @Builder
    @Getter
    @Setter
    public static class SingleResponse {

        private final Long id;
        private final String title;
        private final String content;
        private final int viewCount;
        private final UserDto.WriterResponse writer;
        private final Date createdDate;
        private final Date updatedDate;
        private final List<CommentDto.Response> comments;
        private final List<String> photos;

        public static SingleResponse ofEntity(Post post, List<PostPhoto> photos) {
            return SingleResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .viewCount(post.getViewCount())
                .writer(WriterResponse.ofEntity(post.getWriter()))
                .createdDate(post.getCreatedDate())
                .updatedDate(post.getUpdatedDate())
                .photos(photos.stream()
                        .map(PostPhoto::getUrl)
                        .collect(Collectors.toList()))
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
