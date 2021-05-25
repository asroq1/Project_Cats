package com.pso.cat.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity(name = "post_pht")
@DynamicUpdate
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pht_id")
    private Long id;

    @Column(name = "post_id", updatable = false)
    private Long postId;

    @Column(name = "url")
    private String url;
}
