package com.pso.cat.service;

import com.pso.cat.dto.PostDto;
import com.pso.cat.entity.Cat;
import com.pso.cat.entity.Comment;
import com.pso.cat.entity.Post;
import com.pso.cat.entity.User;
import com.pso.cat.repository.CommentRepository;
import com.pso.cat.repository.PostRepository;

import java.io.File;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import com.pso.cat.util.SecurityUtil;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
	private HttpServletResponse response;

    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public Post save(Long userId, PostDto.AddRequest postDto, MultipartFile photoFile) throws Exception {

        // 파일 이름을 업로드 한 날짜로 바꾸어서 저장할 것이다
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String current_date = simpleDateFormat.format(new Date());

        // 프로젝트 폴더에 저장하기 위해 절대경로를 설정 (Window 의 Tomcat 은 Temp 파일을 이용한다)
        String absolutePath = new File("").getAbsolutePath() + "\\";

        // 경로를 지정하고 그곳에다가 저장할 심산이다
        String path = "upload/post/" + current_date;
        File file = new File(path);
        // 저장할 위치의 디렉토리가 존지하지 않을 경우
        if (!file.exists()) {
            // mkdir() 함수와 다른 점은 상위 디렉토리가 존재하지 않을 때 그것까지 생성
            file.mkdirs();
        }

        String originalFileExtension = "";

        // 파일들을 이제 만져볼 것이다
        if (!photoFile.isEmpty()) {
            // jpeg, png, gif 파일들만 받아서 처리할 예정
            String contentType = photoFile.getContentType();
            // 확장자 명이 없으면 이 파일은 잘 못 된 것이다
            if (ObjectUtils.isEmpty(contentType)) {
                return null;
            } else {
                if (contentType.contains("image/jpeg")) {
                    originalFileExtension = ".jpg";
                } else if (contentType.contains("image/png")) {
                    originalFileExtension = ".png";
                } else if (contentType.contains("image/gif")) {
                    originalFileExtension = ".gif";
                }
                // 다른 파일 명이면 아무 일 하지 않는다
                else {
                    throw new RuntimeException("사용할 수 없는 파일명입니다.");
                }
            }
        }

        // 각 이름은 겹치면 안되므로 나노 초까지 동원하여 지정
        String new_file_name = Long.toString(System.nanoTime()) + originalFileExtension;
        // 생성 후 리스트에 추가
        Post post = postDto.toEntity();
        post.setWriter(User.builder().id(userId).build());
        post.setPhoto(path + "/" + new_file_name);

        // 저장된 파일로 변경하여 이를 보여주기 위함
        file = new File(absolutePath + path + "/" + new_file_name);
        photoFile.transferTo(file);

        return postRepository.save(post);

    }

    public PostDto.SingleResponse read (Long id){
        Optional<Post> post = postRepository.findById(id);
        post.ifPresent(p -> {
            postRepository.updateViewCount(p.getId());
            p.setComments(commentRepository.findAllByPostIdAndStateOrderByCreatedDateDesc(id, 1));
        });
        PostDto.SingleResponse.ofEntity(post.get());
        return PostDto.SingleResponse.ofEntity(post.get());
    }

    @Transactional
    public void modify (Long id, PostDto.Request newPost, MultipartFile photoFile) throws Exception{
        // 파일 이름을 업로드 한 날짜로 바꾸어서 저장할 것이다
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String current_date = simpleDateFormat.format(new Date());

        // 프로젝트 폴더에 저장하기 위해 절대경로를 설정 (Window 의 Tomcat 은 Temp 파일을 이용한다)
        String absolutePath = new File("").getAbsolutePath() + "/";

        // 경로를 지정하고 그곳에다가 저장할 심산이다
        String path = "upload/cat/" + current_date;
        File file = new File(path);
        // 저장할 위치의 디렉토리가 존지하지 않을 경우
        if (!file.exists()) {
            // mkdir() 함수와 다른 점은 상위 디렉토리가 존재하지 않을 때 그것까지 생성
            file.mkdirs();
        }

        String originalFileExtension = "";

        // 파일들을 이제 만져볼 것이다
        if (!photoFile.isEmpty()) {
            // jpeg, png, gif 파일들만 받아서 처리할 예정
            String contentType = photoFile.getContentType();
            // 확장자 명이 없으면 이 파일은 잘 못 된 것이다
            if (ObjectUtils.isEmpty(contentType)) {
                throw new RuntimeException("확장자명이 잘못되었습니다.");
            } else {
                if (contentType.contains("image/jpeg")) {
                    originalFileExtension = ".jpg";
                } else if (contentType.contains("image/png")) {
                    originalFileExtension = ".png";
                } else if (contentType.contains("image/gif")) {
                    originalFileExtension = ".gif";
                }
                // 다른 파일 명이면 아무 일 하지 않는다
                else {
                    throw new RuntimeException("사용할 수 없는 파일명입니다.");
                }
            }
        }
        // 각 이름은 겹치면 안되므로 나노 초까지 동원하여 지정
        String new_file_name = Long.toString(System.nanoTime()) + originalFileExtension;
        // 생성 후 리스트에 추가
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당하는 게시글이 없습니다."));

        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());
        post.setUpdatedDate(new Date());
        post.setPhoto(path + "/" + new_file_name);

        // 저장된 파일로 변경하여 이를 보여주기 위함
        file = new File(absolutePath + path + "/" + new_file_name);
        photoFile.transferTo(file);

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