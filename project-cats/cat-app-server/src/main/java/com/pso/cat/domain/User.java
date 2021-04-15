package com.pso.cat.domain;

import java.util.Map;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
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

    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Column(name = "pwd", length = 100)
    private String password;

    @Column(name = "nickname", length = 50)
    private String nickname;

    public User(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public User() {

    }

}
