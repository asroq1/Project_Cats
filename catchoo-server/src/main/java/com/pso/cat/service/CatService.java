package com.pso.cat.service;

import com.pso.cat.dto.RecordDto;
import com.pso.cat.entity.Cat;
import com.pso.cat.dto.CatDto;
import com.pso.cat.error.exception.EntityNotFoundException;
import com.pso.cat.repository.CatRepository;
import com.pso.cat.repository.RecordRepository;

import javax.transaction.Transactional;

import com.pso.cat.util.S3Uploader;
import com.pso.cat.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class CatService {
    private final CatRepository catRepository;
    private final RecordRepository recordRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public Cat save(CatDto.AddRequest catDto, MultipartFile multipartFile) {
        Cat cat = catDto.toEntity();
        cat.setUserId(SecurityUtil.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("로그인이 필요합니다.")));
        if (multipartFile != null) {
            try {
                String fileUrl = s3Uploader.upload(multipartFile, "cat");
                cat.setPhoto(fileUrl);
            } catch (Exception e) {
                log.info(e.getMessage());
                throw new RuntimeException("사진이 정상적으로 저장되지 않았습니다.");
            }
        }
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
    public void modify(Long id, CatDto.Request newCat, MultipartFile multipartFile) {
        Cat cat = catRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        String photoUrl = null;

        try {
            if (multipartFile != null) {
                // S3에 있는 기존 사진 삭제해주기
                if (cat.getPhoto() != null) {
                    s3Uploader.removeFromS3(cat.getPhoto());
                }

                // 새로 업로드하기
                photoUrl = s3Uploader.upload(multipartFile, "cat");
            }
        } catch (Exception e) {
            throw new RuntimeException("사진을 업로드하는 도중 오류가 발생했습니다.");
        }


        catRepository.save(newCat.toEntity(cat, photoUrl));
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