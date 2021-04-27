import React from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/signUp/SignUpForm';


const SignupBackground = styled.div`
    background-color: #f4f1de;
`;
const SignupWrapper = styled.div`
    display: grid;
    // max-width: 1200px;
    // width: 100vw;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color:  background-color: ${({theme}) => theme.palette.orange};
`;

const TitleWrapper = styled.div`
    display: grid;
    align-items: end;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: ${({theme}) => theme.palette.navy};
`;

const DivideLine = styled.div`
    width: 30%;
    margin: 0 auto;
    text-align: center;
    padding: 0.5rem 0 0.5rem 0;
    border-top: 1px solid #909090;
    border-bottom: 1px solid #909090;
    color: #909090;
    font-size: 1.2rem;

    @media ${({theme}) => theme.width.mobile} {
        // width: 85vw;
        width: 100%;
        font-size: 1rem;
    } ;
`;
const signUp = () => {
    return (
        <SignupBackground>
            <SignupWrapper>
                <TitleWrapper>
                    <Title>회원가입</Title>
                </TitleWrapper>
                <article>
                    <SignUpForm />
                </article>
            </SignupWrapper>
        </SignupBackground>
    );
};

export default signUp;
