package com.pso.cat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.pso.cat.domain.Cat;
import com.pso.cat.domain.Record;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

public class CatDto {

    @Getter
    @Builder
    static class Request {
        private String name;
        private char gender;
        private String photo;
        private Date birth;
    }

    @Getter
    @Builder
    public static class Response {
        private String name;
        private char gender;
        private String photo;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private Date birth;
        @JsonInclude(Include.NON_NULL)
        private RecordDto.Response recentRecord;

        public static Response ofEntity(Cat cat, Record recentRecord) {
            return Response.builder()
                .name(cat.getName())
                .birth(cat.getBirth())
                .gender(cat.getGender())
                .photo(cat.getPhoto())
                .recentRecord(RecordDto.Response.ofEntity(recentRecord)).build();
        }

        public static Response ofEntity(Cat cat) {
            return Response.builder()
                .name(cat.getName())
                .birth(cat.getBirth())
                .gender(cat.getGender())
                .photo(cat.getPhoto()).build();
        }
    }


}
