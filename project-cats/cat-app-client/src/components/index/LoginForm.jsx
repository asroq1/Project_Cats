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
    width: 30%;

    button {
        margin: 0.5rem 0 0.5rem 0;
        height: 3rem;
        font-size: 1rem;
        border-radius: 4px;
    }

    @media ${(props) => props.theme.mobile} {
        width: 85vw;
    }
`;
const LoginInput = styled.input`
    margin: 0.5rem 0 0.5rem 0;
    height: 3rem;
    font-size: 1rem;
    border-radius: 4px;
    height: 1rem;
    padding: 1rem;
    border: 1px solid #909090;
    background-color: ${palette.inputColor};
    ::placeholder {
        text-align: right;
    }
`;
const SubmitButton = styled.button`
    background: #f2cc8f;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    background-color: ${palette.navy};
`;

const ErrorMessages = styled.p`
    margin: 0.5rem 0 0.5rem 0;
    color: #db4455;
`;

const SocialContainer = styled.div`
    margin: 0 auto;
    display: flex;
    width: 30%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button{
        width:49%:
    }
    @media ${(props) => props.theme.mobile} {
        width: 85vw;
    }
`;

const LoginForm = ({ history }) => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const { logInDone } = useSelector((state) => state.user);

    const onSubmit = useCallback((data) => {
        console.log('success', data);
        dispatch(loginRequestAction(data));
        console.log(logInDone);
    }, []);
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
                <label>이메일</label>
                <LoginInput
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
                <LoginInput
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 4 })}
                    placeholder="&#xf09c;"
                />
                {errors.pwd && errors.pwd.type === 'required' && (
                    <ErrorMessages>비밀번호를 입력해주세요.</ErrorMessages>
                )}
                {errors.pwd && errors.pwd.type === 'minLength' && (
                    <ErrorMessages>
                        비밀번호는 최소 6자 이상을 입력해주세요.
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
