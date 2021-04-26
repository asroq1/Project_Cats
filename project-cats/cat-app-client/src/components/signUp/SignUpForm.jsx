import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../../reducers/user';
import 'font-awesome/css/font-awesome.min.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import palette from '../../styles/palette';

const SignupContainer = styled.form`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 30%;

    button {
        margin: 0.5rem 0 0.5rem 0;
        height: 3rem;
        font-size: 1rem;
        border-radius: 4px;
        border-color: #484848;
    }

    button {
        border: none;
    }

    @media ${(props) => props.theme.mobile} {
        width: 85vw;
    }
`;
const SignUpInput = styled.input`
    margin: 0.5rem 0 0.5rem 0;
    height: 1rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid ${palette.borderColor};
    font-family: FontAwesome;
    padding: 1rem;
    ::placeholder {
        text-align: right;
    }
    background-color: ${palette.inputColor};
`;
const SubmitButton = styled.button`
    background: #f2cc8f;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${palette.navy};
`;

const ErrorMessages = styled.p`
    margin: 0.5rem 0 0.5rem 0;
    color: #db4455;
`;

const SignUpForm = () => {
    const dispatch = useDispatch();
    const { register, watch, errors, handleSubmit } = useForm();
    const password = useRef();
    const history = useHistory();
    const { signUpDone } = useSelector((state) => state.user);
    password.current = watch('password');
    const onSubmit = useCallback((data) => {
        delete data.pwdConfirm;
        dispatch(signUpRequest(data));
    }, []);
    useEffect(() => {
        if (signUpDone) {
            history.push('/');
        }
    }, [signUpDone]);
    return (
        <>
            <SignupContainer onSubmit={handleSubmit(onSubmit)}>
                <label>이메일</label>
                <SignUpInput
                    name="email"
                    type="text"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="&#xf0e0;"
                />
                {errors.email && (
                    <ErrorMessages>
                        올바른 이메일 양식을 입력해주세요.
                    </ErrorMessages>
                )}

                <label>비밀번호</label>
                <SignUpInput
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                    placeholder="&#xf09c;"
                />
                {errors.password && errors.password.type === 'required' && (
                    <ErrorMessages>비밀번호를 입력해주세요.</ErrorMessages>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                    <ErrorMessages>
                        비밀번호는 최소 6자 이상을 입력해주세요.
                    </ErrorMessages>
                )}

                <label>비밀번호 확인 </label>
                <SignUpInput
                    type="password"
                    name="pwdConfirm"
                    ref={register({
                        required: true,
                        validate: (value) => value === password.current,
                    })}
                    placeholder="&#xf09c;"
                />
                {errors.pwdConfirm && errors.pwdConfirm.type === 'required' && (
                    <ErrorMessages>비밀번호 확인을 입력해주세요.</ErrorMessages>
                )}
                {errors.pwdConfirm && errors.pwdConfirm.type === 'validate' && (
                    <ErrorMessages>비밀번호가 일치하지 않습니다.</ErrorMessages>
                )}
                <label>닉네임</label>
                <SignUpInput
                    name="nickname"
                    ref={register({ required: true, maxLength: 10 })}
                    placeholder="&#xf2c1;"
                />
                {errors.nickname && errors.nickname.type === 'required' && (
                    <ErrorMessages>닉네임을 입력해주세요.</ErrorMessages>
                )}
                {errors.nickname && errors.nickname.type === 'maxLength' && (
                    <ErrorMessages>
                        닉네임은 최대 10자까지만 가능합니다.
                    </ErrorMessages>
                )}
                <SignUpInput
                    type="hidden"
                    name="loginType"
                    value="normal"
                    ref={register()}
                    // ref={register({ required: true })}
                />
                <SubmitButton type="submit">회원가입</SubmitButton>
            </SignupContainer>
        </>
    );
};

export default SignUpForm;
