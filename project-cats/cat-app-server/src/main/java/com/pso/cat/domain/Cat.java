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

@Entity(name = "cat")
@Getter
@Setter
@ToString
public class Cat {
    @Id
    @GeneratedValue
    @Column(name = "cat_id")
    private Long id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false )
    private Long userId;

    private String name;

    private char gender;

    private String photo;

    @Column(name = "cdt")
    private Date createdDate;

    @Column(name = "goal_wgt")
    private float goalWeight;

    private Date birth;

    @Column(insertable = false)
    private int state;
}
