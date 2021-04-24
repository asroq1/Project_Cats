package com.pso.cat.util;

import com.pso.cat.security.CustomUserDetails;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Slf4j
public class SecurityUtil {

    private SecurityUtil(){}

    public static Optional<String> getCurrentUsername() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            log.info("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        String username = null;
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            username = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            username = (String) authentication.getPrincipal();
        }

        log.info(username);
        return Optional.ofNullable(username);
    }

    public static Optional<Long> getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            log.info("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        Long userId = null;
        if (authentication.getPrincipal() instanceof CustomUserDetails) {
            log.debug("CustomUserDetails의 인스턴스가 맞음.");
            CustomUserDetails springSecurityUser = (CustomUserDetails) authentication.getPrincipal();
            log.debug("springSecurityUser.getId(): " + springSecurityUser.getId());
            authen
            userId = springSecurityUser.getId();
        } else if (authentication.getPrincipal() instanceof Long) {
            userId = (Long) authentication.getPrincipal();
        } else {
            log.debug("CustomUserDetails의 인스턴스도 아니고 Long 값도 아님!");
        }

        log.info(String.valueOf(userId));
        return Optional.ofNullable(userId);
    }

}
