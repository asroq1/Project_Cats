package com.pso.cat.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name = "comment")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cmt_id", updatable = false)
    private Long id;

    @Column(name = "post_id", updatable = false)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false)
    private User writer;

    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "cdt", updatable = false)
    private Date createdDate;

    @UpdateTimestamp
    @Column(name = "udt")
    private Date updatedDate;

    @Column(name = "ddt")
    private Date deletedDate;

    @Column(insertable = false)
    private int state;

}
