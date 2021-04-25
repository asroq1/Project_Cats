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
import org.springframework.format.annotation.DateTimeFormat;


@Entity(name = "cat")
@DynamicUpdate
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cat_id")
    private Long id;

    @Column(name = "user_id", updatable = false)
    private Long userId;

    private String name;

    private char gender;

    private String photo;

    @CreationTimestamp
    @Column(name = "cdt", updatable = false)
    private Date createdDate;

    @Column(name = "goal_wgt")
    private Float goalWeight;

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date birth;

    @Column(insertable = false)
    private int state;
}
