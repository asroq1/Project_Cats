package com.pso.cat.security;

import java.util.Collection;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;



import java.util.ArrayList;
import java.util.Collection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
@ToString
public class JwtUser implements UserDetails {

    private final Long id;
    private final String email;
    private final String password;
    private final String nickname;
    private int state;
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtUser(Long id, String id, String password, int status, int type, boolean enabled, int deviceOs){
        this.seq = seq;
        this.id = id;
        this.password = password;
        this.status = status;
        this.type = type;
        this.enabled = enabled;
        this.authorities = new ArrayList<>();
        this.deviceOs = deviceOs;
    }

    @Builder
    public JwtUser(Long seq, String id, int status, int type, boolean enabled, int deviceOs){
        this.seq = seq;
        this.id = id;
        this.status = status;
        this.type = type;
        this.enabled = enabled;
        this.authorities = new ArrayList<>();
        this.deviceOs = deviceOs;
        this.password = null;
    }


    @Override
    public String getUsername() {
        return this.id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
