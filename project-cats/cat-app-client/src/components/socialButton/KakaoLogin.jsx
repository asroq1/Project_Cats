import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
// import styles from '../../styles/KakaoLogin.module.css';

const KakaoButton = styled.button`
    display: flex;
    align-items: center;
    flex-direction: inherit;
    justify-content: space-evenly;
    background-color: #f7e600;
    color: #3a1d1d;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    @media ${(props) => props.theme.mobile} {
        width: 49%;
        height: 48px;
        font-size: 0.8rem;
    }
`;

const KakaoLogo = styled.img`
    width: 15%;
`;
const KakaoLogin = () => {
    const history = useHistory();
    const { Kakao } = window;

    const onKakaoLogin = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                //여기에 백엔드 주소 넣어주기
                fetch('http://localhost:8080/api/authenticate', {
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
                        localStorage.setItem('Kakao_token', res.token);
                        // 현재 백에서 토큰이 안날라오는듯
                        // if (res.token) {
                        history.push('/user/signup/kakao');
                        // }
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
            <KakaoButton href="#" onClick={onKakaoLogin}>
                <KakaoLogo src="./image/kakao-btn.png" alt="kakao-logo" />
                카카오 로그인
            </KakaoButton>
        </>
    );
};

export default KakaoLogin;
