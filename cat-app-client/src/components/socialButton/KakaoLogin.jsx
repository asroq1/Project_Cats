import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import {
    kakaoLoginRequestAction,
    loginRequestAction,
} from '../../reducers/user';
// import styles from '../../styles/KakaoLogin.module.css';

const KakaoButton = styled.button`
    display: flex;
    align-items: center;
    flex-direction: inherit;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    border-radius: 4px;
    background-color: #f7e600;
    color: #3a1d1d;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border: none;
    height: 48px;

    img {
        margin-right: 1rem;
    }
`;

const KakaoLogo = styled.img`
    width: 12%;
    height: 70%;
`;
const KakaoLogin = () => {
    const dispatch = useDispatch();
    const { Kakao } = window;

    const onKakaoLogin = () => {
        Kakao.Auth.login({
            scope: 'profile, account_email',
            success: function (authObj) {
                console.log(`계정 정보:${authObj}`);
                Kakao.API.request({
                    url: '/v2/user/me',
                    data: {
                        property_keys: [
                            'kakao_account.email',
                            'kakao_account.profile',
                        ],
                    },
                    success: function (response) {
                        const email = response.kakao_account.email;
                        const data = { email };
                        dispatch(kakaoLoginRequestAction(data));
                    },
                    fail: function (error) {
                        console.log(error);
                        alert('로그인에 실패하였습니다.');
                    },
                });
            },
        });
    };

    return (
        <>
            <KakaoButton href="#" onClick={onKakaoLogin}>
                <KakaoLogo src="./image/kakao-btn.png" alt="kakao-logo" />
                카카오로 로그인
            </KakaoButton>
        </>
    );
};

export default KakaoLogin;
