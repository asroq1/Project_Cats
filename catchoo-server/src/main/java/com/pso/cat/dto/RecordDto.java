package com.pso.cat.dto;

import com.pso.cat.entity.Record;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class RecordDto {

    @Setter
    @Getter
    public static class Request {
        private Long catId;
        private float weight;

        public Record toEntity() {
            return Record.builder()
                    .catId(this.getCatId())
                    .weight(this.getWeight())
                    .build();
        }
    }


    @Builder
    @Getter
    public static class Response {
        private final Long catId;
        private final Date createdDate;
        private final float weight;

        public static Response ofEntity(Record record) {
            return Response.builder()
                .catId(record.getCatId())
                .createdDate(record.getCreateDate())
                .weight(record.getWeight()).build();
        }
    }
}
