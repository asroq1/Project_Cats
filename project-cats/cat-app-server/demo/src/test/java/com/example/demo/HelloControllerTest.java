package com.example.demo;

import com.example.demo.web.HelloController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class) //스프링 부트 테스트와 JUnit 사이에 연결자 역할.
@WebMvcTest(controllers = HelloController.class) //Web(Spring MVC)에 집중할수 있는 어노테이션
public class HelloControllerTest {

    @Autowired //스프링이 관리하는 bean을 주입받음
    private MockMvc mvc;
    //웹 API 테스트할때 사용. 스프링 MVC 테스트 시작점. 이 클래스를 통해서 HTTP GET, POST 등에 대한 API 테스트를 할 수 있음.

    @Test
    public void hello가_리턴된다() throws Exception {
        String hello = "hello";

        mvc.perform(get("/hello")) //
                .andExpect(status().isOk()) //
                .andExpect(content().String(hello)); //

    }

}
