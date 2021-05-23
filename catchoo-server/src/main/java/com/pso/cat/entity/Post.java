package com.pso.cat.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name = "post")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false)
    private User writer;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "photo")
    private String photo;

    @Column(name = "vw_cnt")
    private int viewCount;

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

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private List<Comment> comments;
}
