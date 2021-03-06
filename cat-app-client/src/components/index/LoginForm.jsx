import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import 'font-awesome/css/font-awesome.min.css';
import KakaoLogin from '../socialButton/KakaoLogin';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.form`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    button {
        margin: 0.5rem 0 0.5rem 0;
        height: 3rem;
        font-size: 1rem;
        border-radius: 4px;
    }
    // @media ${({ theme }) => theme.width.mobile} {
    //     // width: 85vw;
    //     width: 100%;
    // }
`;
const LoginInput = styled.input`
    margin: 0.5rem 0 0.5rem 0;
    height: 3rem;
    font-size: 1rem;
    border-radius: 4px;
    height: 1rem;
    padding: 1rem;
    border: 1px solid #909090;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.input};
`;
const SubmitButton = styled.button`
    background: #f2cc8f;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    cursor:pointer;
    border: none;
    background-color: ${({ theme }) => theme.button};
`;

const ErrorMessages = styled.p`
    margin: 0.5rem 0 0.5rem 0;
    color: #db4455;
`;

const SocialContainer = styled.div`
    margin: 0 auto;
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button {
        //width:49%:
        flex: 1;
    }
    // @media ${({ theme }) => theme.width.mobile} {
    //     // width: 85vw;
    //     width: 100%;
    // }
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const { logInError } = useSelector((state) => state.user);
    const onSubmit = useCallback((data) => {
        return dispatch(loginRequestAction(data));
    }, []);

    return (
        <>
            <LoginContainer onSubmit={handleSubmit(onSubmit)}>
                <LoginInput
                    name="email"
                    type="text"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="Email"
                />
                {errors.email && (
                    <ErrorMessages>
                        ????????? ????????? ????????? ??????????????????.
                    </ErrorMessages>
                )}

                <LoginInput
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 4 })}
                    placeholder="Password"
                />
                {errors.pwd && errors.pwd.type === 'required' && (
                    <ErrorMessages>??????????????? ??????????????????.</ErrorMessages>
                )}
                {errors.pwd && errors.pwd.type === 'minLength' && (
                    <ErrorMessages>
                        ??????????????? ?????? 6??? ????????? ??????????????????.
                    </ErrorMessages>
                )}
                {logInError && (
                    <ErrorMessages>
                        ?????? ?????? ??????????????? ???????????? ????????????. ????????? ?????????
                        ?????? ????????? ?????????.
                    </ErrorMessages>
                )}
                <SubmitButton type="submit">?????????</SubmitButton>
            </LoginContainer>
            <SocialContainer>
                <KakaoLogin />
                {/* <NaverLogin /> */}
            </SocialContainer>
        </>
    );
};

export default withRouter(LoginForm);
