import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import styles from '../../styles/KakaoLogin.module.css';
const KakaoLogin = () => {
    const history = useHistory();
    const { Kakao } = window;

    const onKakaoLogin = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                //여기에 백엔드 주소 넣어주기
                fetch('http://localhost:3000/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: authObj.access_token,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        localStorage.setItem('Kakao_token', res.access_token);
                        if (res.access_token) {
                            alert('로그인 성공');
                            history.push('/main');
                        }
                    });
                console.log(authObj);
            },
            fail: function (err) {
                console.log('백엔드가 없어용');
                alert(JSON.stringify(err));
            },
        });
    };

    return (
        <>
            <button
                href="#"
                onClick={onKakaoLogin}
                className={styles.kakao__btn}
            >
                <img
                    src="./image/kakao-btn.png"
                    alt="kakao-logo"
                    className={styles.kakao__logo}
                />
                카카오 로그인
            </button>
            {/* <button onClick={onKakaoLogin}>kakaoLogin</button> */}
            {/* <button onClick={kakaoLogout}>kakaoLogout</button>
			<input id="userinfo" value="" /> */}
        </>
    );
};

export default KakaoLogin;
