package com.pso.cat.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

@Entity(name = "record")
@Getter
@DynamicUpdate
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rc_id")
    private Long id;

    @Column(name = "cat_id", updatable = false)
    private Long catId;

    @CreationTimestamp
    @Column(name = "cdt", updatable = false)
    private Date createDate;

    @Column(name = "wgt")
    private float weight;
}
