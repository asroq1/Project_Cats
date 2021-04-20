import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../reducers/user';
import styles from '../../styles/signUpForm.module.css';
import 'font-awesome/css/font-awesome.min.css';
import { useForm } from 'react-hook-form';
const SignUpForm = () => {
    const dispatch = useDispatch();
    const { register, watch, errors, handleSubmit } = useForm();
    const password = useRef();
    password.current = watch('password');

    const onSubmit = (data) => {
        const body = {
            data,
        };
        dispatch(signUpRequest(body));
    };
    useEffect(() => {});
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.signup__form}
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
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                    placeholder="&#xf09c;"
                />
                {errors.password && errors.password.type === 'required' && (
                    <p className={styles.error__message}>
                        비밀번호를 입력해주세요.
                    </p>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                    <p className={styles.error__message}>
                        비밀번호는 최소 6자 이상을 입력해주세요.
                    </p>
                )}

                <label>비밀번호 확인 </label>
                <input
                    type="password"
                    name="pwdConfirm"
                    ref={register({
                        required: true,
                        validate: (value) => value === password.current,
                    })}
                    placeholder="&#xf09c;"
                />
                {errors.pwdConfirm && errors.pwdConfirm.type === 'required' && (
                    <p className={styles.error__message}>
                        비밀번호 확인을 입력해주세요.
                    </p>
                )}
                {errors.pwdConfirm && errors.pwdConfirm.type === 'validate' && (
                    <p className={styles.error__message}>
                        비밀번호가 일치하지 않습니다.
                    </p>
                )}
                <label>닉네임</label>
                <input
                    name="nickname"
                    ref={register({ required: true, maxLength: 10 })}
                    placeholder="&#xf2c1;"
                />
                {errors.nickname && errors.nickname.type === 'required' && (
                    <p className={styles.error__message}>
                        닉네임을 입력해주세요.
                    </p>
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
        </>
    );
};

export default SignUpForm;
