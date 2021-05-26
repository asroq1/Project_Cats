import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/index/LoginForm';

const IndexContainer = styled.div`
    display: grid;
    max-width: 1200px;
    // width: 100vw;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.body};
`;

const LogoWrapper = styled.div`
    width: 45%;
    margin: 0 auto;
    display: grid;
    align-items: end;
    position: relative;
`;

const SignupButton = styled.div`
    // width: 30%;
    width: 80%;
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: ${({ theme }) => theme.button};
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;

    a {
        color: ${({ theme }) => theme.palette.white};
        text-decoration: none;
    }
    @media ${({ theme }) => theme.width.mobile} {
        // width: 85vw;
        width: 100vw;
    }
`;

const DivdeContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 85%;
    margin: 0 auto;
    margin-top: 1rem;
`;

const DivdeLine = styled.div`
    width: 40%;
    border-color: ${({ theme }) => theme.palette.borderColor};
`;

const DivdeText = styled.div`
    width: 15%;
    text-align: center;
    color: ${({ theme }) => theme.text};
`;

const Logo = styled.img`
    width: 100%;
    position: absolute;
    top: 3rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    // width: 30%;
    height: 25vh;
    @media ${({ theme }) => theme.width.mobile} {
        //width: 85vw;
        width: 100vw;
    }
`;
const LogoFoot = styled.img`
    width: 70%;
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 20vh;
`;

const Title = styled.h1`
    margin: 0 0 2rem 0;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
`;
const Index = () => {
    const { logInDone, logOutDone, kakaoLogInDone } = useSelector(
        (state) => state.user
    );
    const history = useHistory();
    useEffect(() => {
        if (localStorage.token) {
            history.push('/user/main');
        }
    }, [kakaoLogInDone, logInDone, logOutDone]);
    return (
        <div>
            <IndexContainer>
                <LogoWrapper>
                    <Link to="/">
                        <Logo src="/image/icon/weight-scale.svg" alt="logo" />
                        <LogoFoot src="/image/icon/pawprint.svg" alt="logo" />
                    </Link>
                </LogoWrapper>
                <article style={{ zIndex: '1' }}>
                    <Title>Catchoo </Title>
                    <LoginForm />
                    <DivdeContainer>
                        <DivdeLine>
                            <hr />
                        </DivdeLine>
                        <DivdeText>또는</DivdeText>
                        <DivdeLine>
                            <hr />
                        </DivdeLine>
                    </DivdeContainer>
                    <SignupButton>
                        <Link to="/user/signup">회원가입</Link>
                    </SignupButton>
                </article>
            </IndexContainer>
        </div>
    );
};

export default Index;
