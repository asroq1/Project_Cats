package com.example.demo.domain.posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

//주요 어노테이션을 클래스에 가깝게
//이렇게 하면 이후 코틀린 등의 새 언어 전환으로 롬복 필요없을때 쉽게 삭제 가능
@Getter //클래스 내 모든 필드의 Getter 메소드 자동생성
@NoArgsConstructor //기본 생성자 자동 추가, public Posts(){}와 같은 효과
//롬복의 어노테이션 > 코드 단순화시켜주지만 필수 어노테이션이 아니므로.
@Entity  
//JpA의 어노테이션
//테이블과 링크될 클래스임을 나타냄
//클래스의 카멜케이스이름 : 언더 스코어 네이밍으로 테이블 이름 매칭

public class Posts {
    //Posts 클래스는 실제 DB의 테이블과 매칭 될 클래스
    //보통 Entity 클래스라고도 함.
    //JPA 사용하면 DB 데이터에 작업할 경우 실제 쿼리보다 여기 Entity 클래스의 수정을 통해 작업함.

    //특이점: Setter 메소드가 없다. Entity 클래스에서는 절대 안만듬
    //해당 필드 값 변경이 필요하면 명확히 그 목적, 의도 나타낼 수 있는 메소드를 추가.


    @Id // 해당 테이블의 PK 필드를 나타냄
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //PK 생성 규칙 나타냄
    //스프링 부트 2.0에서는 GenerationType.IDENTITY옵션을 추가해야만 auto_increment가 됨.
    private Long id;

    @Column(length = 500, nullable = false)
    //테이블을 칼럼을 나타냄. 굳이 선언 안해도 해당 클래스의 필드는 모드 칼럼이 됨
    //사용하는 이유: 기본값 외에 추가로 변경이 필요한 옵션이 있을때
    //여기서는 문자열 경우 VARCHAR(255)가 기본값인데 사이즈를 500으로 늘릴려고
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    //테이블을 칼럼을 나타냄. 굳이 선언 안해도 해당 클래스의 필드는 모드 칼럼이 됨
    //사용하는 이유: 기본값 외에 추가로 변경이 필요한 옵션이 있을때
    //여기서는 타입을 TEXT로 변경하기 위해
    private String content;

    private String author;

    //롬복의 어노테이션
    @Builder
    //해당 클래스의 빌더 패턴 클래스 생성
    //생성자 상단에 선언시 생성자에 포함된 필드만 빌더에 포함
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }
}
