import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import styles from '../../styles/LoginForm.module.css';
import 'font-awesome/css/font-awesome.min.css';
import KakaoLogin from '../socialButton/KakaoLogin';
import NaverLogin from '../socialButton/NaverLogin';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

// const Input
const LoginForm = ({ history }) => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    // const onUser = useSelector((state) => {
    // return {
    // onUser: state.onUser,
    // };
    // });
    const onSubmit = (data) => {
        console.log('success', data);
        const body = {
            data,
        };
        dispatch(loginRequestAction(body));
    };
    // useEffect(() => {
    //     if (onUser) {
    //         console.log(`로그인 중 : ${onUser}`);
    //         history.push('/user/main');
    //     }
    // }, [dispatch]);
    return (
        <>
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
                    ref={register({ required: true, minLength: 4 })}
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

export default withRouter(LoginForm);
