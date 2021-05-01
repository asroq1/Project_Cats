import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { loginRequestAction } from '../../reducers/user';
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
    height: 48px;
    // @media ${({ theme }) => theme.width.mobile} {
    //     width: 49%;
    //     font-size: 0.8rem;
    // }
`;

const KakaoLogo = styled.img`
    width: 15%;
    height: 40px;
`;
const KakaoLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { Kakao } = window;

    const onKakaoLogin = () => {
        // Kakao.Auth.login({
        //     success: function (authObj) {
        //         //여기에 백엔드 주소 넣어주기
        //         fetch(
        //             'http://ec2-3-36-163-150.ap-northeast-2.compute.amazonaws.com:8080/api/login',
        //             {
        //                 method: 'POST',
        //                 body: JSON.stringify({
        //                     access_token: authObj.access_token,
        //                 }),
        //                 type: 'kakao',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     Accept: 'application/json',
        //                 },
        //             }
        //         )
        //             .then((res) => res.json())
        //             .then((res) => {
        //                 localStorage.setItem('Kakao_token', res.token);
        //                 // 현재 백에서 토큰이 안날라오는듯
        //                 // if (res.token) {
        //                 history.push('/user/signup/kakao');
        //                 // }
        //             });
        //         console.log(authObj);
        //     },
        //     fail: function (err) {
        //         console.log('백엔드가 없어용');
        //         alert(JSON.stringify(err));
        //     },
        // });
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
                        console.log(response.kakao_account.email);
                        console.log(response.kakao_account.profile.nickname);
                        const loginType = 'kakao';
                        const email = response.kakao_account.email;
                        const nickname =
                            response.kakao_account.profile.nickname;
                        const data = { email, nickname, loginType };
                        dispatch(loginRequestAction(data));
                    },
                    fail: function (error) {
                        console.log(error);
                    },
                });
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
