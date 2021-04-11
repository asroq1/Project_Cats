package com.pso.cat.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordDTO {
    private Long id;
    private Date createdDate;
    private float weight;
}
