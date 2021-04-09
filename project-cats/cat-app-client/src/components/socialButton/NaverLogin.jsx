import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import styles from '../../styles/NaverLogin.module.css';
const NaverLogin = () => {
    const { naver } = window;
    const location = useLocation();

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: 'BAEpSASWOOk_802ChzqB', //발급받은 client ID,
            callbackUrl: 'http://localhost:3000/user/signup', //app 등록할 때 callbackurl에 추가해주었던 url,
            isPopup: false, // popup 형식으로 띄울것인지 설정
            loginButton: {
                color: 'green',
                type: 3,
                height: '48',
            },
            //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
    };

    const getNaverToken = () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        console.log('token', token);
    };
    useEffect(() => {
        initializeNaverLogin();
        getNaverToken();
    });
    return (
        <>
            <div id="naverIdLogin" className={styles.naver__logo} />
        </>
    );
};
export default NaverLogin;
