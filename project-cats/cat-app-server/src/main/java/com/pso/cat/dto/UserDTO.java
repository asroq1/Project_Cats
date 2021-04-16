package com.pso.cat.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Long id;
    private String name;

    private String email;
    private String pwd;
    private String nickname;
    private String loginType;
    private date createdDate;
}
