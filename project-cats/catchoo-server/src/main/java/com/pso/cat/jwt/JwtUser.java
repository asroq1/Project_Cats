package com.pso.cat.jwt;

import java.util.Collection;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

@Getter
public class JwtUser extends User {

    private static final long serialVersionUID = 1L;

    private com.pso.cat.entity.User user;

    public JwtUser(String username, String password,
        Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public JwtUser(String username, String password, boolean enabled, boolean accountNonExpired,
        boolean credentialsNonExpired, boolean accountNonLocked,
        Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired,
            accountNonLocked,
            authorities);
    }

    public JwtUser(com.pso.cat.entity.User user) {
        super(user.getEmail(), user.getPassword(), user.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getName())).collect(
            Collectors.toList()));
        this.user = user;
    }

    public JwtUser(com.pso.cat.entity.User user, Collection<? extends GrantedAuthority> authorities) {
        super(user.getEmail(), user.getPassword(), authorities);
        this.user = user;
    }
}
