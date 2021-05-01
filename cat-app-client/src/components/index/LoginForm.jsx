import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import 'font-awesome/css/font-awesome.min.css';
import KakaoLogin from '../socialButton/KakaoLogin';
import NaverLogin from '../socialButton/NaverLogin';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../styles/palette';

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
    background-color: ${({ theme }) => theme.input};
`;
const SubmitButton = styled.button`
    background: #f2cc8f;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
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

const LoginForm = ({ history }) => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const { logInDone, logInError } = useSelector((state) => state.user);
    const onSubmit = useCallback((data) => {
        console.log('LoginForm', data);
        return dispatch(loginRequestAction(data));
    }, []);

    // const onSubmit = (data) => {
    //     dispatch(loginRequestAction(data));
    // };

    useEffect(() => {
        if (logInDone) {
            history.push('/user/main');
        }
    }, [logInDone]);
    useEffect(() => {
        if (!logInDone) {
            history.push('/');
        }
    }, [logInDone]);
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
                        올바른 이메일 양식을 입력해주세요.
                    </ErrorMessages>
                )}

                <LoginInput
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 4 })}
                    placeholder="Password"
                />
                {errors.pwd && errors.pwd.type === 'required' && (
                    <ErrorMessages>비밀번호를 입력해주세요.</ErrorMessages>
                )}
                {errors.pwd && errors.pwd.type === 'minLength' && (
                    <ErrorMessages>
                        비밀번호는 최소 6자 이상을 입력해주세요.
                    </ErrorMessages>
                )}
                {logInError && (
                    <ErrorMessages>
                        계정 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을
                        다시 확인해 주세요.
                    </ErrorMessages>
                )}
                <SubmitButton type="submit">로그인</SubmitButton>
            </LoginContainer>
            <SocialContainer>
                <KakaoLogin />
                <NaverLogin />
            </SocialContainer>
        </>
    );
};

export default withRouter(LoginForm);
