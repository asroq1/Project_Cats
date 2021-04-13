package com.pso.cat.domain;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "record")
@Getter
@Setter
@ToString
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rc_id")
    private Long id;

    @Column(name = "cat_id", updatable = false, insertable = false)
    private Long catId;

    @Column(name = "cdt")
    private Date createDate;

    @Column(name = "wgt")
    private float weight;
}
