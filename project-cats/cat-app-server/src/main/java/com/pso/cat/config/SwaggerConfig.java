package com.pso.cat.config;

import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.pso.cat.controller"))
            .paths(PathSelectors.any())
            .build()
            .useDefaultResponseMessages(false)
            .apiInfo(apiInfo())
            .securitySchemes(Collections.singletonList(apiKey()));
            //.securityContexts(Collections.singletonList(securityContext()));
    }


    private ApiInfo apiInfo() {

        return new ApiInfoBuilder()
            .title("cat-api")
            .description("크지만 소중해!")
            .termsOfServiceUrl("")
            .contact(new Contact("hayeon17kim", "", "hayeon17kim@gmail.com"))
            .version("1.0")
            .build();
    }

    private ApiKey apiKey() {
        return new ApiKey("Bearer", "Authorization", "header");
    }


    /*
    private SecurityContext securityContext() {
        return SecurityContext.builder()
            .securityReferences();
    }

     */
}

