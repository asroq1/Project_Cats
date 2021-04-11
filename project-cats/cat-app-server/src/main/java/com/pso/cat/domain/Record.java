package com.pso.cat.domain;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "record")
@Getter
@Setter
@ToString
public class Record {
    @Id
    @GeneratedValue
    @Column(name = "rc_id")
    private Long id;

    @ManyToOne(targetEntity = Cat.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "cat_id", updatable = false)
    private Long catId;

    @Column(name = "cdt")
    private Date createDate;

    @Column(name = "wgt")
    private float weight;
}
