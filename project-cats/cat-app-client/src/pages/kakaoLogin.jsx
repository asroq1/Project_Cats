import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../reducers/user';
import styles from '../styles/signUpForm.module.css';
const KakaLogin = () => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const type = 'kako';
    const onSubmit = (data) => {
        console.log('success', data);
        const body = {
            data,
            type,
        };
        dispatch(signUpRequest(body));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>닉네임</label>
            <input
                name="nickname"
                ref={register({ required: true, maxLength: 10 })}
                placeholder="&#xf2c1;"
            />
            {errors.nickname && errors.nickname.type === 'required' && (
                <p className={styles.error__message}>닉네임을 입력해주세요.</p>
            )}
            {errors.nickname && errors.nickname.type === 'maxLength' && (
                <p className={styles.error__message}>
                    닉네임은 최대 10자까지만 가능합니다.
                </p>
            )}
            <button type="submit" className={styles.submit__btn}>
                가입하기
            </button>
        </form>
    );
};

export default KakaLogin;
