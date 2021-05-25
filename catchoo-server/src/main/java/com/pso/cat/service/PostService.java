package com.pso.cat.service;

import com.pso.cat.dto.PostDto;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.PostPhoto;
import com.pso.cat.entity.User;
import com.pso.cat.repository.CommentRepository;
import com.pso.cat.repository.PostPhotoRepository;
import com.pso.cat.repository.PostRepository;
import com.pso.cat.util.S3Uploader;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
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
    public Post save(Long userId, PostDto.Request postDto, MultipartFile[] images) throws IOException {
        Post post = postDto.toEntity();
        post.setWriter(User.builder().id(userId).build());
        post = postRepository.save(post);

        savePhotos(post.getId(), images);

        return postRepository.save(post);
        //String fileUrl = s3Uploader.upload(multipartFile, "post");
    }

    private void savePhotos(Long postId, MultipartFile[] images) throws IOException {
        PostPhoto photo = new PostPhoto();
        photo.setPostId(postId);
        for (MultipartFile image : images) {
            String url = s3Uploader.upload(image, "post");
            photo.setUrl(url);
            postPhotoRepository.save(photo);
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

    public List<PostDto.ListResponse> fetchPostPagesBy(
        Long lastArticleId, int size
    ) {
        Page<Post> articles = fetchPages(lastArticleId, size);
        return articles.getContent()
            .stream().map(post -> PostDto.ListResponse.ofEntity(post)).collect(Collectors.toList());
    }

    private Page<Post> fetchPages(Long lastPostId, int size) {
        PageRequest pageRequest = PageRequest.of(0, size); // 페이지네이션을 위한 PageRequest, 페이지는 0으로 고정한다.
        return postRepository.findByIdLessThanAndStateOrderByIdDesc(lastPostId, 1, pageRequest); // JPA 쿼리 메소드
    }

}