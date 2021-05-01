import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signUpRequest } from '../reducers/user';

const SignupBackground = styled.div`
    background-color: ${({ theme }) => theme.body};
`;

const KakaoSignupContainer = styled.form`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: 100vh;
    background-color: ${({ theme }) => theme.body};
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

    @media ${({ theme }) => theme.width.mobile} {
        width: 85vw;
    }
`;

const SignUpInput = styled.input`
    margin: 0.5rem 0 0.5rem 0;
    height: 1rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.palette.borderColor};
    font-family: FontAwesome;
    padding: 1rem;

    ::placeholder {
        text-align: right;
    }
    background-color: ${({ theme }) => theme.input};
`;
const SubmitButton = styled.button`
    background: #f2cc8f;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${({ theme }) => theme.button};
`;

const ErrorMessages = styled.p`
    margin: 0.5rem 0 0.5rem 0;
    color: #db4455;
`;
const Title = styled.h2`
    margin-bottom: 2.5rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
`;

const KakaLogin = () => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const onSubmit = useCallback((data) => {
        console.log('success', data);
        dispatch(signUpRequest(data));
    }, []);
    return (
        <SignupBackground>
            <KakaoSignupContainer onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
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
                    value="kakao"
                    ref={register()}
                />
                <SubmitButton type="submit">가입하기</SubmitButton>
            </KakaoSignupContainer>
        </SignupBackground>
    );
};

export default KakaLogin;
