package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
/*스프링 부트의 자동 설정 스프링 bean 읽기,생성 모두 자동 설정됨.
* 이 어노테이션이 있는 위치부터 설정을 읽어가기 때문에 이 클래스는 항상 프로젝트의 최상단에 위치해야함*/
public class Application {
    public static void main(String[] args){
        SpringApplication.run(Application.class, args);//내장 WAS 실행
    }
}
