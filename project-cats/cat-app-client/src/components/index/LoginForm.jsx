import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import { regExpEmail, regExpPassword } from '../../common/regExp';
import styles from '../../styles/LoginForm.module.css';
import 'font-awesome/css/font-awesome.min.css';
import KakaoLogin from '../socialButton/KakaoLogin';
import NaverLogin from '../socialButton/NaverLogin';

// const Input
const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [emailError, setEmailError] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onChangePwd = (e) => {
        setPwd(e.currentTarget.value);
        const mail = regExpEmail(email);
        if (!mail) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };
    const onSubmit = (e) => {
        {
            !emailError && e.preventDefault();
            const body = {
                email,
                pwd,
            };
            dispatch(loginRequestAction(body));
        }
    };
    return (
        <>
            <form onSubmit={onSubmit} className={styles.login__form}>
                <label className={styles.form__label} htmlFor="email">
                    이메일
                </label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="&#xf0e0; "
                    maxLength="50"
                    required
                />
                {emailError && (
                    <h2 className={styles.email__message}>
                        부적합한 이메일 양식입니다.
                    </h2>
                )}
                <label className={styles.form__label} htmlFor="pwd">
                    비밀번호
                </label>
                <input
                    type="password"
                    name="pwd"
                    value={pwd}
                    onChange={onChangePwd}
                    placeholder="&#xf09c;"
                    maxLength="20"
                    required
                />
                <button className={styles.submit__btn}>로그인</button>
            </form>
            <div className={styles.social__form}>
                <KakaoLogin />
                <NaverLogin />
                {/* <button className={styles.naver_btn}>네이버로 로그인하기</button> */}
            </div>
        </>
    );
};

export default LoginForm;
