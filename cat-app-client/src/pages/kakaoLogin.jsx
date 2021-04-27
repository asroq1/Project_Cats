import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signUpRequest } from '../reducers/user';

const SignupBackground = styled.div`
    background-color: ${({theme}) => theme.palette.beige};
`;

const KakaoSignupContainer = styled.form`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.palette.beige};
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

    @media ${({theme}) => theme.width.mobile} {
        width: 85vw;
    }
`;

const SignUpInput = styled.input`
    margin: 0.5rem 0 0.5rem 0;
    height: 1rem;
    font-size: 1rem;
    border-radius: 4px;
    border-color: ${({theme}) => theme.palette.borderColor};
    font-family: FontAwesome;
    padding: 1rem;
    input::placeholder {
        text-align: right;
    }
    background-color: ${({theme}) => theme.palette.inputColor};
`;
const SubmitButton = styled.button`
    background: #f2cc8f;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${({theme}) => theme.palette.navy};
`;

const ErrorMessages = styled.p`
    margin: 0.5rem 0 0.5rem 0;
    color: #db4455;
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