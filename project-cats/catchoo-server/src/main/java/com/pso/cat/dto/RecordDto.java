package com.pso.cat.dto;

import com.pso.cat.entity.Record;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class RecordDto {

    @Builder
    @Getter
    public static class Response {
        private Long id;
        private Date createdDate;
        private float weight;

        public static Response ofEntity(Record record) {
            return Response.builder()
                .id(record.getId())
                .createdDate(record.getCreateDate())
                .weight(record.getWeight()).build();
        }
    }

    @Setter
    @Getter
    public static class Request {
        private float weight;

        public Record toEntity() {
            return Record.builder().weight(this.getWeight()).build();
        }
    }
}