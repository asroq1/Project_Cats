import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import styles from '../../styles/LoginForm.module.css';
import 'font-awesome/css/font-awesome.min.css';
import KakaoLogin from '../socialButton/KakaoLogin';
import NaverLogin from '../socialButton/NaverLogin';
import { useForm } from 'react-hook-form';

// const Input
const LoginForm = () => {
    const dispatch = useDispatch();
    // const [email, setEmail] = useState('');
    // const [pwd, setPwd] = useState('');
    // const [emailError, setEmailError] = useState(false);

    // const onChangeEmail = (e) => {
    //     setEmail(e.currentTarget.value);
    // };
    // const onChangePwd = (e) => {
    //     setPwd(e.currentTarget.value);
    // };
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     const body = {
    //         email,
    //         pwd,
    //     };
    //     dispatch(loginRequestAction(body));
    // };
    const { register, watch, errors, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log('success', data);
        const body = {
            data,
        };
        dispatch(loginRequestAction(body));
    };
    return (
        <>
            {/* <form onSubmit={onSubmit} className={styles.login__form}>
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
            </form> */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.login__form}
            >
                <label>이메일</label>
                <input
                    name="email"
                    type="text"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="&#xf0e0;"
                />
                {errors.email && (
                    <p className={styles.error__message}>
                        올바른 이메일 양식을 입력해주세요.
                    </p>
                )}

                <label>비밀번호</label>
                <input
                    name="pwd"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                    placeholder="&#xf09c;"
                />
                {errors.pwd && errors.pwd.type === 'required' && (
                    <p className={styles.error__message}>
                        비밀번호를 입력해주세요.
                    </p>
                )}
                {errors.pwd && errors.pwd.type === 'minLength' && (
                    <p className={styles.error__message}>
                        비밀번호는 최소 6자 이상을 입력해주세요.
                    </p>
                )}
                <button type="submit" className={styles.submit__btn}>
                    로그인
                </button>
            </form>
            <div className={styles.social__form}>
                <KakaoLogin />
                <NaverLogin />
            </div>
        </>
    );
};

export default LoginForm;
