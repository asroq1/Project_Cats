INSERT INTO user(user_id, email, pwd, nickname, login_type) VALUES(1, 'suethebae@gmail.com', '$2a$10$h7wCPLX2ipoqCDD2oHqu2uBSdZ.KxEauQQ3HvbRJEQraacX32bZ/C', '수돌이', 'normal');
INSERT INTO user(user_id, email, pwd, nickname, login_type) VALUES(2, 'hayeon17kim@gmail.com', '$2a$10$WoBFQSjTNNFnAR1kuUQh6eGhvXKa2CvXrglgMklZwwUedaOj8X7om', '하연님', 'kakao');

-- login-type: kakao, naver, normal
INSERT INTO cat(cat_id, user_id, name, gender, birth, goal_wgt ) VALUES (1, 1, '후추', 'M', '2019-01-19', 6.0);
INSERT INTO cat(cat_id, user_id, name, gender, birth, goal_wgt ) VALUES (2, 1, '겨자', 'F', '2019-01-19', 4.8);
--<후추>
INSERT INTO record(cat_id, cdt, wgt) VALUES(1, '2020-10-06', 5.8);
INSERT INTO record(cat_id, cdt, wgt) VALUES(1, '2020-10-26', 5.9);
INSERT INTO record(cat_id, cdt, wgt) VALUES(1, '2020-11-21', 6.4);
INSERT INTO record(cat_id, cdt, wgt) VALUES(1, '2020-12-20', 6.2);
INSERT INTO record(cat_id, cdt, wgt) VALUES(1, '2021-01-12', 6.2);
--<겨자>
INSERT INTO record(cat_id, cdt, wgt) VALUES(2, '2020-10-06', 4.8);
INSERT INTO record(cat_id, cdt, wgt) VALUES(2, '2020-10-26', 4.7);
INSERT INTO record(cat_id, cdt, wgt) VALUES(2, '2020-11-21', 5.1);
INSERT INTO record(cat_id, cdt, wgt) VALUES(2, '2020-12-20', 5.4);

INSERT INTO AUTHORITY(name) VALUES("ROLE_ADMIN");
INSERT INTO AUTHORITY(name) VALUES("ROLE_USER");

INSERT INTO USER_AUTHORITY(user_id, name) VALUES(1, "ROLE_USER");
INSERT INTO USER_AUTHORITY(user_id, name) VALUES(1, "ROLE_ADMIN");
INSERT INTO USER_AUTHORITY(user_id, name) VALUES(2, "ROLE_USER");
INSERT INTO USER_AUTHORITY(user_id, name) VALUES(2, "ROLE_ADMIN");