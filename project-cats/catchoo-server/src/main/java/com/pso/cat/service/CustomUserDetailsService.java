package com.pso.cat.service;

import com.pso.cat.entity.User;
import com.pso.cat.repository.UserRepository;
import com.pso.cat.security.CustomUserDetails;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public CustomUserDetails loadUserByUsername(final String username) {
        return userRepository.findOneWithAuthoritiesByEmail(username)
            .map(user -> createUser(username, user))
            .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    public User findByUserIdAndUserPassword(String userId, String password) {
        User user = userRepository.findByEmailAndPassword(userId, password);
        this.validate(user);
        return user;
    }

    private CustomUserDetails createUser(String username, User user) {
        if (!user.isActivated()) {
            throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
        }
        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getName()))
            .collect(Collectors.toList());
        CustomUserDetails customUserDetails = new CustomUserDetails(user.getEmail(), user.getPassword(), grantedAuthorities);
        customUserDetails.setId(user.getId());
        customUserDetails.setNickname(user.getNickname());
        return customUserDetails;
    }

    private void validate(User user){
        if(Objects.isNull(user) || StringUtils.isEmpty(user.getPassword())){
            throw new RuntimeException("일치하는 정보가 없습니다.");
        }
    }
}