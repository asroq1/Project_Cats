package com.example.demo;

import com.example.demo.web.HelloController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(SpringExtension.class) //스프링 부트 테스트와 JUnit 사이에 연결자 역할.
@WebMvcTest(controllers = HelloController.class) //Web(Spring MVC)에 집중할수 있는 어노테이션
public class HelloControllerTest {

    @Autowired //스프링이 관리하는 bean을 주입받음
    private MockMvc mvc;
    //웹 API 테스트할때 사용. 스프링 MVC 테스트 시작점. 이 클래스를 통해서 HTTP GET, POST 등에 대한 API 테스트를 할 수 있음.

    @Test
    public void hello가_리턴된다() throws Exception {
        String hello = "hello";

            //체이닝이 지원되어 아래와 같이 여러 검증 기능을 이어서 선언 가능.
            mvc.perform(get("/hello")) //MockMvc를 통해 /hello 주소로 HTTP GET 요청 함
                    .andExpect(status().isOk())
                    //mvc.perform의 결과와 HTTP header의 Status 검증. 200 인지 아닌지 검증.
                    .andExpect(content().string(hello));
    }               //mvc.perform의 결과와 응답 본문의 내용을 검증. Controller에서 "hello"를 리턴하기 때문에 이 값이 맞는지 검증

    @Test
    public void helloDto가_리턴된다() throws  Exception {
        String name = "hello";
        int amount = 1000;

        mvc.perform(
                    get("/hello/dto")
                                    .param("name", name)
                                    .param("amount", String.valueOf(amount)))
                                    //API 테스트 할때 사용될 요청 파라미터를 설정. 값은 String만 허용
                                    //숫자,날짜 등의 데이터도 등록할 때는 문자열로 변경해야만 가능
                                                                                .andExpect(status().isOk())
                                                                                .andExpect(jsonPath("$.name", is(name)))
                                                                                .andExpect(jsonPath("$.amount", is(amount)));
                                                                                //jsonPath > JSON 응답값을 필드별로 검증할 수 있는 메소드
                                                                                //$를 기준으로 필드명 명시.
    }
}
