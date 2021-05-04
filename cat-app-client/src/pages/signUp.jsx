import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SignUpForm from '../components/signUp/SignUpForm';
import palette from '../styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import KakaoSignup from '../components/socialButton/KakaoSignup';
import { useDispatch, useSelector } from 'react-redux';

const SignupBackground = styled.div`
    // background-color: #f4f1de;
`;
const SignupWrapper = styled.div`
    display: grid;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.body};
`;

const TitleWrapper = styled.div`
    display: grid;
    align-items: end;
    position: relative; //추가
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
`;
const ExitButton = styled.p`
    //position: fixed;
    position: absolute;
    right: 0;
    top: 0;
    text-align: right; //추가
    font-size: 2rem;
    padding: 0.5rem;

    a{
        color: ${({ theme }) => theme.text};
    }
    
}

`;

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { signUpError, signUpDone } = useSelector((state) => state.user);

    useEffect(() => {
        if (signUpDone) {
            history.push('/');
        }
    });
    return (
        <SignupBackground>
            <SignupWrapper>
                <TitleWrapper>
                    <ExitButton>
                        <Link to="/">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </ExitButton>
                    <Title>회원가입</Title>
                </TitleWrapper>
                <article>
                    <SignUpForm error={signUpError} />
                    <KakaoSignup />
                </article>
            </SignupWrapper>
        </SignupBackground>
    );
};

export default SignUp;
