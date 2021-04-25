package com.pso.cat.entity;

import com.google.common.collect.ImmutableMap;
import io.jsonwebtoken.Claims;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.CreationTimestamp;

@Entity(name = "user")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Column(name = "pwd", length = 100)
    private String password;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "login_type")
    private String loginType;

    @CreationTimestamp
    @Column(name = "cdt")
    private Date createdDate;

    private int state;

    @ManyToMany
    @JoinTable(
        name = "user_authority",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
        inverseJoinColumns = {@JoinColumn(name="name", referencedColumnName = "name")}
    )
    private Set<Authority> authorities;

    public boolean isActivated() {
        return this.state == 1;
    }

    public Map<String,Object> toClaims(){
        return ImmutableMap.<String,Object>builder()
            .put("id"    , getId())
            .put("email"     , getEmail())
            .put("nickname" , getNickname())
            .put("auth", StringUtils.join(getAuthorities(), ","))
            .build();
    }

    public static User valueOf(Claims claims) {

        return User.builder()
            .id(Long.valueOf(claims.get("id").toString()))
            .email((String) claims.get("email"))
            .nickname((String) claims.get("nickname"))
            .build();
    }
}
