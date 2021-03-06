-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

DROP TABLE user_authority;
DROP TABLE authority;
DROP TABLE user;
DROP TABLE cat;
DROP TABLE record;
DROP TABLE post;
DROP TABLE comment;
DROP TABLE heart;
DROP TABLE pht_post;


-- user Table Create SQL
CREATE TABLE user
(
    `user_id`     INT             NOT NULL    AUTO_INCREMENT,
    `email`       VARCHAR(255)    NOT NULL,
    `pwd`         VARCHAR(255)    NULL,
    `nickname`    VARCHAR(45)     NOT NULL,
    `login_type`  VARCHAR(45)     NOT NULL,
    `cdt`         DATETIME        NOT NULL    DEFAULT now(),
    `state`       INT             NOT NULL    DEFAULT 1,
    CONSTRAINT PRIMARY KEY (user_id)
);


-- user Table Create SQL
CREATE TABLE post
(
    `post_id`  INT             NOT NULL    AUTO_INCREMENT,
    `user_id`  INT             NOT NULL,
    `title`    VARCHAR(144)    NOT NULL,
    `content`  TEXT            NOT NULL,
    `cdt`      DATETIME        NOT NULL,
    `udt`      DATETIME        NULL,
    `ddt`      DATETIME        NULL,
    `vw_cnt`   INT             NOT NULL    DEFAULT 0,
    `state`    INT             NOT NULL    DEFAULT 1,
    CONSTRAINT PRIMARY KEY (post_id)
);

ALTER TABLE post
    ADD CONSTRAINT FK_post_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE cat
(
    `cat_id`    INT            NOT NULL    AUTO_INCREMENT COMMENT 'id',
    `user_id`   INT            NOT NULL    COMMENT '집사id',
    `name`      VARCHAR(45)    NOT NULL    COMMENT '이름',
    `gender`    CHAR(1)        NULL        COMMENT '성별',
    `photo`     VARCHAR(45)    NULL        COMMENT '사진',
    `birth`     DATE           NULL        COMMENT '나이',
    `state`     INT            NOT NULL    DEFAULT 1 COMMENT '활성상태',
    `cdt`       DATETIME       NOT NULL    DEFAULT now() COMMENT '등록일',
    `goal_wgt`  FLOAT          NULL        COMMENT '목표체중',
    CONSTRAINT PRIMARY KEY (cat_id)
);

ALTER TABLE cat
    ADD CONSTRAINT FK_cat_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE authority
(
    `name`  VARCHAR(45)    NOT NULL,
    CONSTRAINT PRIMARY KEY (name)
);


-- user Table Create SQL
CREATE TABLE user_authority
(
    `user_id`  INT            NOT NULL    AUTO_INCREMENT,
    `name`     VARCHAR(45)    NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id, name)
);

ALTER TABLE user_authority
    ADD CONSTRAINT FK_user_authority_name_authority_name FOREIGN KEY (name)
        REFERENCES authority (name) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE user_authority
    ADD CONSTRAINT FK_user_authority_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE record
(
    `rc_id`   INT         NOT NULL    AUTO_INCREMENT COMMENT 'id',
    `cat_id`  INT         NOT NULL    COMMENT '고양이 id',
    `cdt`     DATETIME    NOT NULL    DEFAULT now() COMMENT '등록일',
    `wgt`     FLOAT       NOT NULL    COMMENT '체중',
    CONSTRAINT PRIMARY KEY (rc_id)
);

ALTER TABLE record
    ADD CONSTRAINT FK_record_cat_id_cat_cat_id FOREIGN KEY (cat_id)
        REFERENCES cat (cat_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE comment
(
    `cmt_id`    INT         NOT NULL    AUTO_INCREMENT,
    `post_id`   INT         NOT NULL,
    `content`   TEXT        NOT NULL,
    `step`      INT         NULL        DEFAULT 1,
    `h_cmt_id`  INT         NULL,
    `cdt`       DATETIME    NOT NULL    DEFAULT now(),
    `udt`       DATETIME    NULL,
    `ddt`       DATETIME    NULL,
    `state`     INT         NULL        DEFAULT 1,
    `user_id`   INT         NOT NULL,
    CONSTRAINT PRIMARY KEY (cmt_id)
);

ALTER TABLE comment COMMENT 'FK_comment_user_id_user_user_id';

ALTER TABLE comment
    ADD CONSTRAINT FK_comment_post_id_post_post_id FOREIGN KEY (post_id)
        REFERENCES post (post_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE comment
    ADD CONSTRAINT FK_comment_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE heart
(
    `post_id`  INT         NOT NULL,
    `user_id`  INT         NOT NULL,
    `cdt`      DATETIME    NOT NULL    DEFAULT now(),
    CONSTRAINT PRIMARY KEY (post_id)
);

ALTER TABLE heart
    ADD CONSTRAINT FK_heart_post_id_post_post_id FOREIGN KEY (post_id)
        REFERENCES post (post_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE heart
    ADD CONSTRAINT FK_heart_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
drop table post_pht;

CREATE TABLE post_pht
(
    `pht_id`   INT            NOT NULL    AUTO_INCREMENT,
    `post_id`  INT            NOT NULL,
    `url`     VARCHAR(200)    NOT NULL,
    CONSTRAINT PRIMARY KEY (pht_id)
);

ALTER TABLE post_pht
    ADD CONSTRAINT FK_pht_post_post_id_post_post_id FOREIGN KEY (post_id)
        REFERENCES post (post_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

