package com.pso.cat.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatDTO {
    private Long id;
    private String name;
    private String gender;
    private String photo;
    private Date birth;
    private float recentWeight;
    private Date recentRecordedDate;
}
