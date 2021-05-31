package com.pso.cat.service;

import com.pso.cat.dto.PostDto;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.PostPhoto;
import com.pso.cat.entity.User;
import com.pso.cat.error.exception.EntityNotFoundException;
import com.pso.cat.repository.CommentRepository;
import com.pso.cat.repository.PostPhotoRepository;
import com.pso.cat.repository.PostRepository;
import com.pso.cat.util.S3Uploader;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostPhotoRepository postPhotoRepository;
    private final CommentRepository commentRepository;

    private final S3Uploader s3Uploader;

    @Transactional
    public Post save(Long userId, PostDto.Request postDto, List<MultipartFile> photos) {
        System.out.println("photos = " + photos);
        System.out.println("photos.size() = " + photos.size());
        Post post = postDto.toEntity();
        post.setWriter(User.builder().id(userId).build());
        post = postRepository.save(post);

        savePhotos(post.getId(), photos);

        return post;
    }

    private void savePhotos(Long postId, List<MultipartFile> photos) {
        try {
            for (MultipartFile photo : photos) {
                PostPhoto photoEntity = new PostPhoto();
                photoEntity.setPostId(postId);
                String url = s3Uploader.upload(photo, "post");
                photoEntity.setUrl(url);
                postPhotoRepository.save(photoEntity);
            }
        } catch (Exception e) {

        }
    }

    private void removeOldPhotos(List<String> deletedPhotos) {
        try {
            for (String photo : deletedPhotos) {
                s3Uploader.removeFromS3(photo);
            }
        } catch (Exception e) {

        }
    }

    public PostDto.SingleResponse read (Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾지 못했습니다."));
        postRepository.updateViewCount(post.getId());
        post.setComments(commentRepository.findAllByPostIdAndStateOrderByCreatedDateDesc(id, 1));
        List<PostPhoto> photos = postPhotoRepository.findAllByPostId(id);
        return PostDto.SingleResponse.ofEntity(post, photos);
    }

    @Transactional
    public void modify (Long id,
                        PostDto.Request newPost,
                        List<MultipartFile> photos,
                        List<String> deletedPhotos){
        Post post = newPost.toEntity(postRepository.findById(id)
            .orElseThrow(EntityNotFoundException::new));
        if (deletedPhotos != null || !deletedPhotos.isEmpty()) {
            removeOldPhotos(deletedPhotos);
        }
         if (photos != null || !photos.isEmpty()) {
             savePhotos(id, photos);
         }
        postRepository.save(post);
    }

    @Transactional
    public void remove (Long id){
        postRepository.inactive(id);
    }

    public List<PostDto.ListResponse> list () {
        return toPhotoList(postRepository
                .findAllByStateOrderByCreatedDateDesc(1));
    }

    public List<PostDto.ListResponse> fetchPostPagesBy(
        Long lastArticleId, int size
    ) {
        Page<Post> articles = fetchPages(lastArticleId, size);
        return toPhotoList(articles);
    }

    private List<PostDto.ListResponse> toPhotoList(Iterable<Post> articles) {
        List<PostDto.ListResponse> list = new ArrayList<>();
        for (Post post : articles) {
            PostPhoto photo = postPhotoRepository.findFirstByPostId(post.getId());
            String thumbnail = null;
            if (photo != null) {
                thumbnail = photo.getUrl();
            }
            list.add(PostDto.ListResponse.ofEntity(post, thumbnail));
        }
        return list;
    }

    private Page<Post> fetchPages(Long lastPostId, int size) {
        PageRequest pageRequest = PageRequest.of(0, size); // 페이지네이션을 위한 PageRequest, 페이지는 0으로 고정한다.
        return postRepository.findByIdLessThanAndStateOrderByIdDesc(lastPostId, 1, pageRequest); // JPA 쿼리 메소드
    }

}