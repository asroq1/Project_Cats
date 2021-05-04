package com.pso.cat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.pso.cat.entity.Cat;
import com.pso.cat.entity.Record;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

public class CatDto {

    @Getter
    @Setter
    public static class Request {

        private String name;
        private char gender;
        private String photo;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private Date birth;
        private Float goalWeight;

        public Cat toEntity() {
            return Cat.builder()
                .name(name)
                .gender(gender)
                .photo(photo)
                .birth(birth)
                .goalWeight(goalWeight).build();
        }

    }

    @Getter
    @Builder
    public static class Response {
        private final Long id;
        private final String name;
        private final char gender;
        private final String photo;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private final Date birth;
        private final Float goalWeight;
        @JsonInclude(Include.NON_NULL)
        private final RecordDto.Response recentRecord;

        public static Response ofEntity(Cat cat, Record recentRecord) {
            return Response.builder()
                .id(cat.getId())
                .name(cat.getName())
                .birth(cat.getBirth())
                .gender(cat.getGender())
                .photo(cat.getPhoto())
                .goalWeight(cat.getGoalWeight())
                .recentRecord(RecordDto.Response.ofEntity(recentRecord)).build();
        }

        public static Response ofEntity(Cat cat) {
            return Response.builder()
                .id(cat.getId())
                .name(cat.getName())
                .birth(cat.getBirth())
                .gender(cat.getGender())
                .photo(cat.getPhoto())
                .goalWeight(cat.getGoalWeight()).build();
        }

    }


}
