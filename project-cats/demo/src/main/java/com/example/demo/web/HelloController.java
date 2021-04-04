package com.example.demo.web;

import com.example.demo.web.dto.HelloResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController //컨트롤러를 JSON 반환하는 컨트롤러로 만들어줌. 
public class HelloController {

    @GetMapping("/hello") // HTTP Method 인 Get의 요청을 받을수 있는 API를 만들어줌
    public String hello(){
        return "hello";
    }

    @GetMapping("hello/dto")
    public HelloResponseDto helloDto(@RequestParam("name") String //외부API로 넘긴 파라미터를 가져오는 어노테이션
                                                    name,         //여기서 외부에서 name이란 이름으로 넘긴 파라미터를 메소드 파라미터 name(String name)에 저장함.

                                     @RequestParam("amount")int
                                                    amount) {
        return new HelloResponseDto(name, amount);
    }
}

