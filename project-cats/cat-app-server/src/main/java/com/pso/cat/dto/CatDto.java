package com.pso.cat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.pso.cat.entity.Cat;
import com.pso.cat.entity.Record;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;

public class CatDto {

    @Getter
    @Builder
    public static class Request {
        private Long id;
        private String name;
        private char gender;
        private String photo;
        private Date birth;


        public Cat toEntity() {
            return Cat.builder()
                .id(this.getId())
                .name(this.getName())
                .gender(this.getGender())
                .photo(this.getPhoto())
                .birth(this.getBirth()).build();
        }
    }

    @Getter
    @Builder
    public static class Response {
        private Long id;
        private String name;
        private char gender;
        private String photo;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private Date birth;
        @JsonInclude(Include.NON_NULL)
        private RecordDto.Response recentRecord;

        public static Response ofEntity(Cat cat, Record recentRecord) {
            return Response.builder()
                .id(cat.getId())
                .name(cat.getName())
                .birth(cat.getBirth())
                .gender(cat.getGender())
                .photo(cat.getPhoto())
                .recentRecord(RecordDto.Response.ofEntity(recentRecord)).build();
        }

        public static Response ofEntity(Cat cat) {
            return Response.builder()
                .id(cat.getId())
                .name(cat.getName())
                .birth(cat.getBirth())
                .gender(cat.getGender())
                .photo(cat.getPhoto()).build();
        }

    }


}
