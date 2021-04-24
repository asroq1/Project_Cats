package com.pso.cat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
public class CatApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatApplication.class, args);
		System.out.println();
	}

}
