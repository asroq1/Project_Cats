package com.pso.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "user")
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;
}
