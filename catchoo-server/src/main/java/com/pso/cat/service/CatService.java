package com.pso.cat.service;

import com.pso.cat.dto.RecordDto;
import com.pso.cat.entity.Cat;
import com.pso.cat.dto.CatDto;
import com.pso.cat.error.exception.EntityNotFoundException;
import com.pso.cat.repository.CatRepository;
import com.pso.cat.repository.RecordRepository;

import java.io.File;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CatService {
    private final CatRepository catRepository;
    private final RecordRepository recordRepository;
    private final ServletContext servletContext;
    private HttpServletResponse response;

    public CatService(CatRepository catRepository, RecordRepository recordRepository, ServletContext servletContext) {
        this.catRepository = catRepository;
        this.recordRepository = recordRepository;
        this.servletContext = servletContext;
    }

    public Cat save(Long userId, CatDto.AddRequest catDto, MultipartFile photoFile) throws Exception {

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
        Cat cat = catDto.toEntity();
        cat.setUserId(userId);
        cat.setPhoto(path + "/" + new_file_name);

        // 저장된 파일로 변경하여 이를 보여주기 위함
        file = new File(absolutePath + path + "/" + new_file_name);
        photoFile.transferTo(file);

        return catRepository.save(cat);
    }

    public CatDto.Response read(Long id){
        Cat cat = catRepository.findById(id).get();
        String photoPath = System.getProperty("user.dir") + "/" + cat.getPhoto();
        cat.setPhoto(photoPath);

        return CatDto.Response.ofEntity(
            catRepository.findById(id)
                    .orElseThrow(EntityNotFoundException::new),
            recordRepository.findFirstByCatIdOrderByCreateDateDesc(id));
    }

    @Transactional
    public void modify(Long id, CatDto.Request newCat, MultipartFile multipartFile) throws Exception {
        Cat cat = catRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        // S3에 있는 기존 사진 삭제해주기
        s3Uploader.removeFromS3(cat.getPhoto());

        // 새로 업로드하기
        String photoUrl = s3Uploader.upload(multipartFile, "cat");

        catRepository.save(newCat.toEntity(cat, photoUrl));
    }
}
    /*
    @Transactional
    public void modify(Long id, CatDto.Request newCat, MultipartFile photoFile) throws Exception {

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
        Cat cat = catRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당하는 고양이가 없습니다."));

        cat.setName(newCat.getName());
        cat.setBirth(newCat.getBirth());
        cat.setGender(newCat.getGender());
        cat.setPhoto(path + "/" + new_file_name);
        cat.setGoalWeight(newCat.getGoalWeight());

        // 저장된 파일로 변경하여 이를 보여주기 위함
        file = new File(absolutePath + path + "/" + new_file_name);
        photoFile.transferTo(file);

        catRepository.save(cat);
    }

    @Transactional
    public void remove(Long id) {
        catRepository.inactive(id);
    }

    public List<CatDto.Response> listByUserId(Long userId) {
        return catRepository
            .findAllByUserIdAndStateOrderByCreatedDateDesc(userId, 1)
            .stream().map(cat
                -> CatDto.Response.ofEntity(cat,
                recordRepository.findFirstByCatIdOrderByCreateDateDesc(cat.getId()))
            ).collect(Collectors.toList());
    }
}
*/