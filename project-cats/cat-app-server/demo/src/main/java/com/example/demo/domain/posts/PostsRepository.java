package com.example.demo.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;

//보통 MyBatis 등에서 Dao라고 불리는 DB Layer 접근자 다.
//JPA에선 Repository 라고 부르며 인터페이스로 생성함.
//JpaRepository<Entity 클래스, PK 타입>을 상속gkaus CRUD 메소드가 자동으로 생성됨.
//주의:Entity 클래스와 기본 Entity Repository는 함께 위치해야 함.
//Entity 클래스는 기본 Repository없이는 제대로 역할 못함.
//따라서 도메인 패키지에서 함께 관리함.
public interface PostsRepository extends JpaRepository<Posts,Long> {
}
