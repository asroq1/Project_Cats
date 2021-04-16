package com.pso.cat.dto;

import com.pso.cat.domain.Cat;
import com.pso.cat.domain.Record;
import com.pso.cat.dto.CatDto.Response;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class RecordDto {

    @Builder
    @Getter
    static class Response {
        private Date createdDate;
        private float weight;

        public static Response ofEntity(Record record) {
            return Response.builder()
                .createdDate(record.getCreateDate())
                .weight(record.getWeight()).build();
        }
    }

    @Getter
    static class Request {
        private float weight;
    }
}
